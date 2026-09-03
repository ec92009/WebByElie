import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { webcrypto } from "node:crypto";

const consentSource = readFileSync(new URL("../assets/wst-consent.js", import.meta.url), "utf8");
const beaconSource = readFileSync(new URL("../assets/wst-beacon.js", import.meta.url), "utf8");

/** Minimal DOM boundary for executing the actual consent and beacon scripts. */
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.dataset = {}; this.attrs = {}; this.listeners = {}; }
  append(...children) { this.children.push(...children); }
  before(node) { this.previous = node; }
  setAttribute(name, value) { this.attrs[name] = value; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  querySelectorAll(tag) { return this.children.filter((child) => child.tag === tag); }
  closest(selector) { return selector === "[data-wst-cta]" && this.dataset.wstCta ? this : null; }
  focus() { this.focused = true; }
}

function run({ origin = "https://web-by-elie.com", saved, privacy = false, search = "", storageDenied = false } = {}) {
  const sent = [], local = new Map(saved ? [["wbe:analytics-consent:v1", saved]] : []), session = new Map();
  const storage = (items) => ({
    getItem(key) { if (storageDenied) throw Error("blocked"); return items.get(key) || null; },
    setItem(key, value) { if (storageDenied) throw Error("blocked"); items.set(key, value); },
    removeItem(key) { items.delete(key); },
  });
  const beacon = { dataset: { wstEnabled: "false", wstEndpoint: "", wstConsent: "unknown", wstSite: "webbyelie", wstEnvironment: "production" } };
  const main = new Element("main"), footer = new Element("footer"), listeners = {};
  const context = {
    Element, URL, URLSearchParams, Uint8Array, Date, Set, console,
    navigator: { globalPrivacyControl: privacy, language: "en", webdriver: false, sendBeacon(url, body) { sent.push({ url, ...JSON.parse(body) }); return true; } },
    document: { currentScript: beacon, documentElement: { lang: "en" }, referrer: "", createElement: (tag) => new Element(tag),
      querySelector: (selector) => selector === "script[data-wst-site]" ? beacon : selector === "main" ? main : footer,
      addEventListener: (name, fn) => { listeners[name] = fn; } },
    window: { location: { origin, hostname: new URL(origin).hostname, href: origin + "/" + search, pathname: "/", search }, crypto: webcrypto,
      btoa: (value) => Buffer.from(value, "binary").toString("base64"), localStorage: storage(local), sessionStorage: storage(session) },
  };
  vm.runInNewContext(consentSource, context);
  vm.runInNewContext(beaconSource, context);
  const panel = main.previous, actions = panel.children[2], result = panel.children[3];
  const choose = (value) => actions.children.find((button) => button.dataset.consent === value).listeners.click();
  const clickCta = () => { const target = new Element("a"); target.dataset.wstCta = "contact_primary"; listeners.click?.({ target }); };
  return { context, sent, session, local, panel, actions, result, footer, choose, clickCta };
}

const fresh = run();
assert.equal(fresh.sent.length, 0, "unknown consent must send nothing");
assert.equal(fresh.session.size, 0, "unknown consent must not create a session");
fresh.choose("granted");
assert.equal(fresh.result.textContent, "Analytics allowed");
assert.equal(fresh.sent.length, 1);
assert.equal(fresh.sent[0].event_name, "page_view");
fresh.choose("granted");
assert.equal(fresh.sent.length, 1, "repeat allow must not duplicate initial page view");
fresh.clickCta();
assert.equal(fresh.sent[1].properties.cta_id, "contact_primary");
fresh.choose("denied");
assert.equal(fresh.session.size, 0);
fresh.clickCta();
assert.equal(fresh.sent.length, 2, "withdrawal must stop further events");
assert.equal(fresh.result.textContent, "Analytics off");
assert.equal(run({ saved: "denied" }).sent.length, 0);
assert.equal(run({ saved: "granted" }).sent.length, 1);

for (const origin of ["http://localhost:8094", "https://ec92009.github.io", "https://web-by-elie.pages.dev", "https://web-by-elie.com.example.org"]) {
  const preview = run({ origin, saved: "granted" });
  preview.choose("granted"); preview.clickCta();
  assert.equal(preview.sent.length, 0, `${origin}: previews must never become production events`);
  assert.equal(preview.context.window.WebSignals, undefined);
}
const privacy = run({ privacy: true, saved: "granted" });
privacy.choose("granted"); privacy.clickCta();
assert.equal(privacy.sent.length, 0);
const synthetic = run({ saved: "granted", search: "?wst_test=1&private=discard" });
assert.equal(synthetic.sent[0].synthetic, true);
assert.equal(synthetic.sent[0].properties.path, "/");
assert(!JSON.stringify(synthetic.sent).includes("private"));
const deniedStorage = run({ storageDenied: true });
deniedStorage.choose("granted");
assert.equal(deniedStorage.sent.length, 1);
deniedStorage.choose("denied");
assert.equal(deniedStorage.result.textContent, "Analytics off");
console.log("WST consent runtime checks passed: opt-in, withdrawal, replay, privacy signal, preview exclusion, synthetic marking, storage failure.");
