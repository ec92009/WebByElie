import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../assets/theme.js", import.meta.url), "utf8");

class EventTarget {
  listeners = new Map();
  addEventListener(name, listener) {
    const listeners = this.listeners.get(name) ?? [];
    listeners.push(listener);
    this.listeners.set(name, listeners);
  }
  emit(name) { this.listeners.get(name)?.forEach((listener) => listener({ type: name })); }
}

function video() {
  return Object.assign(new EventTarget(), {
    plays: 0, pauses: 0, currentTime: 0,
    classList: { add() {} },
    play() { this.plays += 1; return Promise.resolve(); },
    pause() { this.pauses += 1; },
    load() {},
  });
}

// Execute the complete production script at its DOM/media boundaries. Exercise
// lifecycle events and live preference changes, rather than matching its text.
function run({ reduced, narrow }) {
  const reduce = Object.assign(new EventTarget(), { matches: reduced });
  const mobile = Object.assign(new EventTarget(), { matches: narrow });
  const system = Object.assign(new EventTarget(), { matches: false });
  const detail = video(), preview = video();
  const panel = Object.assign(new EventTarget(), {
    querySelector: () => preview,
    matches: () => true,
  });
  const document = Object.assign(new EventTarget(), {
    hidden: false,
    documentElement: { lang: "en", dataset: {}, style: { setProperty() {} }, classList: { add() {} } },
    querySelector: () => null,
    querySelectorAll: (selector) => selector === "[data-autoplay-video]" ? [detail] : selector === "[data-service-panel]" ? [panel] : [],
  });
  const window = Object.assign(new EventTarget(), {
    location: { pathname: "/" },
    matchMedia: (query) => query.includes("reduced-motion") ? reduce : query.includes("max-width") ? mobile : system,
  });
  vm.runInNewContext(source, { window, document, localStorage: { getItem() { return null; }, setItem() {} } });
  return { window, document, reduce, panel, detail, preview };
}

for (const narrow of [false, true]) {
  const app = run({ reduced: true, narrow });
  const wake = () => {
    app.window.emit("pageshow");
    app.document.emit("visibilitychange");
    app.detail.emit("loadeddata");
    app.panel.emit("mouseenter");
  };
  wake();
  assert.equal(app.detail.plays, 0, "reduced motion must block detail playback on every lifecycle event");
  assert.equal(app.preview.plays, 0, "reduced motion must block desktop hover and narrow preview playback");

  app.reduce.matches = false;
  app.reduce.emit("change");
  wake();
  assert.ok(app.detail.plays > 0, "detail playback should work when motion is allowed");
  assert.ok(app.preview.plays > 0, "preview playback should work when motion is allowed");

  app.reduce.matches = true;
  app.reduce.emit("change");
  const plays = [app.detail.plays, app.preview.plays];
  wake();
  assert.deepEqual([app.detail.plays, app.preview.plays], plays, "enabling reduced motion must prevent subsequent playback");
  assert.ok(app.detail.pauses > 0 && app.preview.pauses > 0, "enabling reduced motion must pause both video types");
}
console.log("Video motion runtime checks passed: load, pageshow, visibility, loadeddata, hover, narrow layout, and preference changes.");
