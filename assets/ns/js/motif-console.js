/*
 * Night Signal — Bespoke Animated Telemetry Console per Service Motif
 * Motifs: reassemble, search, assistant, savings, care, speed, map, move, helpers, multilingual
 */
(function () {
  "use strict";

  var canvas = document.querySelector("canvas[data-motif]");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var motif = canvas.getAttribute("data-motif");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var stage = canvas.parentElement;
  var w = 640;
  var h = 400;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var rafId = 0;
  var inView = true;

  var LIME = "#c6ff3d";
  var CYAN = "#5ee7ff";
  var VIOLET = "#c4b5fd";
  var INK = "#e2e8f0";
  var MUTED = "rgba(148, 163, 184, 0.35)";
  var PANEL = "rgba(15, 23, 42, 0.85)";
  var LINE = "rgba(255, 255, 255, 0.12)";

  function resize() {
    var rect = stage.getBoundingClientRect();
    w = Math.max(300, Math.floor(rect.width));
    h = Math.max(200, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawGrid() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    var step = 32;
    for (var x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (var y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function roundRect(x, y, rw, rh, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, rw, rh, r);
  }

  function drawMono(text, x, y, color, size, align) {
    ctx.fillStyle = color || INK;
    ctx.font = "600 " + (size || 11) + "px 'JetBrains Mono', monospace";
    ctx.textAlign = align || "left";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  var renderers = {
    reassemble: function (t) {
      var p = reducedMotion ? 1 : 0.5 + 0.5 * Math.sin(t * 1.15);
      var snap = Math.min(1, Math.max(0, (p - 0.15) * 1.4));
      var pad = w * 0.12;
      var bw = w - pad * 2;
      var bh = h * 0.72;
      var top = h * 0.14;

      var blocks = [
        { x: pad, y: top, w: bw, h: bh * 0.16, ox: -28, oy: -18, label: "HEADER // PRESERVED" },
        { x: pad, y: top + bh * 0.22, w: bw * 0.58, h: bh * 0.42, ox: -36, oy: 12, label: "HERO LAYOUT // UPGRADED" },
        { x: pad + bw * 0.62, y: top + bh * 0.22, w: bw * 0.38, h: bh * 0.42, ox: 34, oy: -20, label: "DIRECTION PALETTE" },
        { x: pad, y: top + bh * 0.70, w: bw * 0.31, h: bh * 0.28, ox: -22, oy: 28, label: "CARD 01" },
        { x: pad + bw * 0.345, y: top + bh * 0.70, w: bw * 0.31, h: bh * 0.28, ox: 8, oy: 34, label: "CARD 02" },
        { x: pad + bw * 0.69, y: top + bh * 0.70, w: bw * 0.31, h: bh * 0.28, ox: 32, oy: 22, label: "MOBILE READY" },
      ];

      // Alignment guide lasers when snapped
      if (snap > 0.72) {
        ctx.strokeStyle = "rgba(198, 255, 61, " + ((snap - 0.72) * 1.6).toFixed(2) + ")";
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pad, top - 16);
        ctx.lineTo(pad, top + bh + 16);
        ctx.moveTo(pad + bw, top - 16);
        ctx.lineTo(pad + bw, top + bh + 16);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (var i = 0; i < blocks.length; i += 1) {
        var b = blocks[i];
        var cx = b.x + b.ox * (1 - snap);
        var cy = b.y + b.oy * (1 - snap);
        roundRect(cx, cy, b.w, b.h, 8);
        ctx.fillStyle = PANEL;
        ctx.fill();
        ctx.strokeStyle = snap > 0.85 ? LIME : CYAN;
        ctx.lineWidth = 1.25;
        ctx.stroke();
        drawMono(b.label, cx + 10, cy + b.h * 0.5, snap > 0.85 ? LIME : INK, 10);
      }
    },

    search: function (t) {
      var tags = [
        { tag: "<title>", detail: "Intent-matched page title", y: 0.18 },
        { tag: "<meta>", detail: "Clear search description", y: 0.34 },
        { tag: "<h1>..<h2>", detail: "Clean heading hierarchy", y: 0.50 },
        { tag: "JSON-LD", detail: "Structured business schema", y: 0.66 },
        { tag: "sitemap.xml", detail: "Canonical & indexable", y: 0.82 },
      ];
      var scanY = reducedMotion ? h * 0.72 : (((t * 0.32 + 0.52) % 1.15) - 0.05) * h;

      // Scan beam
      var g = ctx.createLinearGradient(0, scanY - 34, 0, scanY + 12);
      g.addColorStop(0, "rgba(94, 231, 255, 0)");
      g.addColorStop(0.8, "rgba(94, 231, 255, 0.22)");
      g.addColorStop(1, "rgba(198, 255, 61, 0.4)");
      ctx.fillStyle = g;
      ctx.fillRect(w * 0.07, scanY - 34, w * 0.86, 46);

      for (var i = 0; i < tags.length; i += 1) {
        var rowY = h * tags[i].y;
        var passed = reducedMotion ? true : scanY >= rowY - 12;
        roundRect(w * 0.09, rowY - 18, w * 0.82, 36, 8);
        ctx.fillStyle = passed ? "rgba(198, 255, 61, 0.08)" : PANEL;
        ctx.fill();
        ctx.strokeStyle = passed ? LIME : LINE;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        drawMono(tags[i].tag, w * 0.12, rowY, CYAN, 11);
        drawMono(tags[i].detail, w * 0.34, rowY, INK, 11);
        drawMono(passed ? "OK" : "..", w * 0.88, rowY, passed ? LIME : MUTED, 11, "right");
      }
    },

    assistant: function (t) {
      var cx = w * 0.5;
      var cy = h * 0.5;
      var facts = [
        { label: "SERVICES", angle: -2.45 },
        { label: "AREA", angle: -0.68 },
        { label: "AUDIENCE", angle: 0.68 },
        { label: "NEXT STEP", angle: 2.45 },
        { label: "llms.txt", angle: -1.57 },
        { label: "FAQ", angle: 1.57 },
      ];
      var rx = Math.min(w * 0.34, 210);
      var ry = Math.min(h * 0.34, 130);
      var pulse = reducedMotion ? 0.5 : (t * 0.65) % 1;

      for (var i = 0; i < facts.length; i += 1) {
        var nx = cx + Math.cos(facts[i].angle) * rx;
        var ny = cy + Math.sin(facts[i].angle) * ry;
        ctx.strokeStyle = "rgba(94, 231, 255, 0.28)";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Traveling signal dot
        var px = cx + (nx - cx) * ((pulse + i * 0.16) % 1);
        var py = cy + (ny - cy) * ((pulse + i * 0.16) % 1);
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = LIME;
        ctx.fill();

        roundRect(nx - 48, ny - 15, 96, 30, 8);
        ctx.fillStyle = PANEL;
        ctx.fill();
        ctx.strokeStyle = i % 2 === 0 ? CYAN : VIOLET;
        ctx.stroke();
        drawMono(facts[i].label, nx, ny, INK, 10, "center");
      }

      // Central AI parser hub
      ctx.beginPath();
      ctx.arc(cx, cy, 42, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(13, 18, 32, 0.96)";
      ctx.fill();
      ctx.strokeStyle = LIME;
      ctx.lineWidth = 2;
      ctx.stroke();
      drawMono("AI PARSE", cx, cy - 5, LIME, 11, "center");
      drawMono("VERIFIED", cx, cy + 10, CYAN, 9, "center");
    },

    savings: function (t) {
      var rows = [
        { name: "HOSTING + DOMAIN", keep: true, w: 0.42 },
        { name: "UNUSED ADD-ON #1", keep: false, w: 0.72 },
        { name: "OVERLAP TOOL #2", keep: false, w: 0.60 },
        { name: "CORE EMAIL SUITE", keep: true, w: 0.36 },
        { name: "AUTO-RENEW LEGACY", keep: false, w: 0.68 },
      ];
      var trim = reducedMotion ? 1 : Math.min(1, Math.max(0, 0.5 + 0.65 * Math.sin(t * 0.95)));
      var left = w * 0.10;
      var barW = w * 0.52;

      for (var i = 0; i < rows.length; i += 1) {
        var r = rows[i];
        var y = h * (0.18 + i * 0.16);
        drawMono(r.name, left, y, r.keep ? INK : "rgba(251, 191, 36, 0.85)", 10);
        var curW = r.keep ? barW * r.w : barW * r.w * (1 - trim * 0.82);
        roundRect(w * 0.38, y - 10, Math.max(12, curW), 20, 5);
        ctx.fillStyle = r.keep ? "rgba(198, 255, 61, 0.22)" : "rgba(251, 191, 36, 0.2)";
        ctx.fill();
        ctx.strokeStyle = r.keep ? LIME : "#fbbf24";
        ctx.stroke();
        drawMono(r.keep ? "KEEP" : trim > 0.6 ? "TRIMMED" : "FLAGGED", w * 0.92, y, r.keep ? LIME : "#fbbf24", 10, "right");
      }
    },

    care: function (t) {
      var midY = h * 0.52;
      var offset = reducedMotion ? 0 : (t * 85) % w;
      ctx.strokeStyle = CYAN;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var x = 24; x < w - 24; x += 3) {
        var phase = ((x + offset) % 160) / 160;
        var y = midY;
        if (phase > 0.42 && phase < 0.47) y -= 22;
        else if (phase >= 0.47 && phase < 0.52) y += 34;
        else if (phase >= 0.52 && phase < 0.58) y -= 58;
        else if (phase >= 0.58 && phase < 0.63) y += 18;
        if (x === 24) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      var checks = ["UPTIME // OK", "BACKUPS // OK", "TLS CERT // OK", "MONTHLY LOG"];
      for (var i = 0; i < checks.length; i += 1) {
        var bx = w * (0.08 + i * 0.22);
        roundRect(bx, h * 0.14, w * 0.20, 32, 7);
        ctx.fillStyle = PANEL;
        ctx.fill();
        ctx.strokeStyle = i === 0 ? LIME : LINE;
        ctx.stroke();
        drawMono(checks[i], bx + w * 0.1, h * 0.14 + 16, i === 0 ? LIME : INK, 9.5, "center");
      }
      drawMono("STEADY RETAINER TELEMETRY", w * 0.5, h * 0.86, CYAN, 10, "center");
    },

    speed: function (t) {
      var lanes = [
        { label: "LCP MEDIA", before: 0.84, after: 0.28 },
        { label: "RENDER WEIGHT", before: 0.76, after: 0.22 },
        { label: "FONT PAYLOAD", before: 0.64, after: 0.18 },
        { label: "WCAG FOCUS/AA", before: 0.58, after: 0.92, grow: true },
      ];
      var morph = reducedMotion ? 1 : Math.min(1, Math.max(0, 0.5 + 0.6 * Math.sin(t * 0.9)));
      for (var i = 0; i < lanes.length; i += 1) {
        var ln = lanes[i];
        var y = h * (0.20 + i * 0.19);
        var val = ln.before + (ln.after - ln.before) * morph;
        drawMono(ln.label, w * 0.08, y - 16, INK, 10);
        roundRect(w * 0.08, y - 4, w * 0.84, 18, 9);
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fill();
        roundRect(w * 0.08, y - 4, w * 0.84 * val, 18, 9);
        ctx.fillStyle = ln.grow ? "rgba(94, 231, 255, 0.34)" : "rgba(198, 255, 61, 0.30)";
        ctx.fill();
        ctx.strokeStyle = ln.grow ? CYAN : LIME;
        ctx.stroke();
      }
    },

    map: function (t) {
      var cx = w * 0.5;
      var cy = h * 0.5;
      var maxR = Math.min(w, h) * 0.38;

      for (var r = 1; r <= 3; r += 1) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR * r) / 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(94, 231, 255, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Radar sweep
      var ang = reducedMotion ? -0.6 : t * 1.1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, ang - 0.55, ang);
      ctx.closePath();
      ctx.fillStyle = "rgba(94, 231, 255, 0.12)";
      ctx.fill();

      var pins = [
        { name: "GOOGLE MAPS", x: cx - maxR * 0.72, y: cy - maxR * 0.32 },
        { name: "APPLE MAPS", x: cx + maxR * 0.68, y: cy - maxR * 0.22 },
        { name: "BING PLACES", x: cx + maxR * 0.25, y: cy + maxR * 0.66 },
      ];
      for (var i = 0; i < pins.length; i += 1) {
        ctx.strokeStyle = "rgba(198, 255, 61, 0.38)";
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(pins[i].x, pins[i].y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(pins[i].x, pins[i].y, 6, 0, Math.PI * 2);
        ctx.fillStyle = CYAN;
        ctx.fill();
        drawMono(pins[i].name, pins[i].x, pins[i].y - 16, INK, 9.5, "center");
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fillStyle = LIME;
      ctx.fill();
      drawMono("NAP ALIGNED", cx, cy + 22, LIME, 10, "center");
    },

    move: function (t) {
      var lx = w * 0.18;
      var rx = w * 0.82;
      var cy = h * 0.5;

      roundRect(lx - 58, cy - 52, 116, 104, 12);
      ctx.fillStyle = PANEL;
      ctx.fill();
      ctx.strokeStyle = MUTED;
      ctx.stroke();
      drawMono("BUILDER", lx, cy - 8, INK, 11, "center");
      drawMono("MONTHLY FEE", lx, cy + 12, MUTED, 9, "center");

      roundRect(rx - 64, cy - 52, 128, 104, 12);
      ctx.fillStyle = "rgba(198, 255, 61, 0.08)";
      ctx.fill();
      ctx.strokeStyle = LIME;
      ctx.stroke();
      drawMono("STATIC EDGE", rx, cy - 8, LIME, 11, "center");
      drawMono("YOU OWN IT", rx, cy + 12, CYAN, 9, "center");

      // Transfer arcs + moving packets
      var paths = [-46, 0, 46];
      for (var i = 0; i < paths.length; i += 1) {
        var ctrlY = cy + paths[i];
        ctx.strokeStyle = "rgba(94, 231, 255, 0.25)";
        ctx.beginPath();
        ctx.moveTo(lx + 58, cy);
        ctx.quadraticCurveTo(w * 0.5, ctrlY, rx - 64, cy);
        ctx.stroke();

        var u = reducedMotion ? 0.55 : (t * 0.45 + i * 0.33) % 1;
        var px = (1 - u) * (1 - u) * (lx + 58) + 2 * (1 - u) * u * (w * 0.5) + u * u * (rx - 64);
        var py = (1 - u) * (1 - u) * cy + 2 * (1 - u) * u * ctrlY + u * u * cy;
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = i === 1 ? LIME : CYAN;
        ctx.fill();
      }
      drawMono("301 REDIRECTS + SIGNALS INTACT", w * 0.5, h * 0.84, CYAN, 10, "center");
    },

    helpers: function (t) {
      var stages = [
        { x: w * 0.16, label: "INBOX", sub: "INPUT" },
        { x: w * 0.50, label: "HELPER", sub: "GROUNDED" },
        { x: w * 0.84, label: "DRAFT", sub: "REVIEW" },
      ];
      var cy = h * 0.45;
      ctx.strokeStyle = "rgba(94, 231, 255, 0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(stages[0].x, cy);
      ctx.lineTo(stages[2].x, cy);
      ctx.stroke();

      var p = reducedMotion ? 0.5 : (t * 0.55) % 1;
      var dotX = stages[0].x + (stages[2].x - stages[0].x) * p;
      ctx.beginPath();
      ctx.arc(dotX, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = LIME;
      ctx.fill();

      for (var i = 0; i < stages.length; i += 1) {
        roundRect(stages[i].x - 52, cy - 34, 104, 68, 12);
        ctx.fillStyle = PANEL;
        ctx.fill();
        ctx.strokeStyle = i === 1 ? LIME : CYAN;
        ctx.stroke();
        drawMono(stages[i].label, stages[i].x, cy - 6, INK, 11, "center");
        drawMono(stages[i].sub, stages[i].x, cy + 12, i === 1 ? LIME : CYAN, 9, "center");
      }

      // Guardrail & Off-switch pill
      roundRect(w * 0.28, h * 0.74, w * 0.44, 34, 17);
      ctx.fillStyle = "rgba(139, 92, 246, 0.16)";
      ctx.fill();
      ctx.strokeStyle = VIOLET;
      ctx.stroke();
      drawMono("COST CEILING + OFF SWITCH", w * 0.5, h * 0.74 + 17, VIOLET, 10, "center");
    },

    multilingual: function (t) {
      var px = w * 0.36;
      var pw = w * 0.30;
      var py = h * 0.1;
      var ph = h * 0.8;
      var langs = ["EN", "FR", "ES"];
      var routes = ["/en/", "/fr/", "/es/"];
      var rows = ["HERO COPY", "SERVICES", "METADATA", "SITEMAP"];
      var activeLang = reducedMotion ? 0 : Math.floor(t * 0.7) % langs.length;

      // hreflang route map on left
      var rx = w * 0.08;
      var ry = h * 0.24;
      roundRect(rx, ry, 94, 128, 10);
      ctx.fillStyle = PANEL;
      ctx.fill();
      ctx.strokeStyle = LIME;
      ctx.stroke();
      drawMono("HREFLANG", rx + 47, ry + 18, LIME, 9.5, "center");
      for (var r = 0; r < routes.length; r += 1) {
        var rry = ry + 36 + r * 28;
        roundRect(rx + 12, rry, 70, 20, 5);
        ctx.fillStyle = r === activeLang ? "rgba(198, 255, 61, 0.2)" : "rgba(255,255,255,0.04)";
        ctx.fill();
        ctx.strokeStyle = r === activeLang ? LIME : LINE;
        ctx.stroke();
        drawMono(routes[r], rx + 47, rry + 10, r === activeLang ? LIME : INK, 9.5, "center");
      }

      // Connector line
      ctx.strokeStyle = "rgba(198, 255, 61, 0.45)";
      ctx.beginPath();
      ctx.moveTo(rx + 94, ry + 64);
      ctx.lineTo(px, ry + 64);
      ctx.stroke();

      // Localized page frame
      roundRect(px, py, pw, ph, 14);
      ctx.fillStyle = PANEL;
      ctx.fill();
      ctx.strokeStyle = CYAN;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Language tabs
      for (var l = 0; l < langs.length; l += 1) {
        var tx = px + 14 + l * ((pw - 28) / 3);
        roundRect(tx, py + 16, (pw - 36) / 3, 22, 6);
        ctx.fillStyle = l === activeLang ? LIME : "rgba(255,255,255,0.06)";
        ctx.fill();
        drawMono(langs[l], tx + (pw - 36) / 6, py + 27, l === activeLang ? "#07090f" : INK, 9.5, "center");
      }

      // Synced page blocks
      for (var m = 0; m < rows.length; m += 1) {
        var my = py + 56 + m * ((ph - 82) / 4);
        roundRect(px + 14, my, pw - 28, 30, 6);
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.fill();
        ctx.strokeStyle = LINE;
        ctx.stroke();
        drawMono(rows[m], px + 24, my + 15, INK, 9.5);
        drawMono(langs[activeLang], px + pw - 24, my + 15, CYAN, 9, "right");
      }

      drawMono("CLEAN ROUTES", w * 0.82, h * 0.46, INK, 10, "center");
      drawMono("SYNCED EDITS", w * 0.82, h * 0.55, CYAN, 9.5, "center");
    },
  };

  var drawMotif = renderers[motif] || renderers.reassemble;

  function render(now) {
    var t = now * 0.001;
    ctx.clearRect(0, 0, w, h);
    drawGrid();
    drawMotif(t);
    if (!reducedMotion && inView) {
      rafId = window.requestAnimationFrame(render);
    }
  }

  resize();
  render(performance.now());

  window.addEventListener("resize", function () {
    resize();
    if (reducedMotion) render(0);
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    var obs = new IntersectionObserver(
      function (entries) {
        inView = entries[0].isIntersecting;
        if (inView && !rafId) {
          rafId = window.requestAnimationFrame(render);
        } else if (!inView && rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(stage);
  }
})();
