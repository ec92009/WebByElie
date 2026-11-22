/*
 * Night Signal — Interactive Hero Canvas (Constellation -> Website Wireframe
 * + Cyan/Lime Crawler & AI Scan Beams) & Live AI Retrieval Terminal
 */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
   * 1. Full-bleed Hero Canvas: Particle Constellation + Wireframe + Scan Beams
   * --------------------------------------------------------------- */
  var canvas = document.getElementById("ns-hero-canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var heroEl = canvas.parentElement;
    var width = 0;
    var height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var inView = true;
    var rafId = 0;
    var pointer = { x: -999, y: -999, active: false };
    var nodes = [];
    var edges = [];

    function buildWireframeTargets(w, h) {
      // Position wireframe assembly mostly across center-right on wide screens
      var fx = w > 960 ? w * 0.44 : w * 0.08;
      var fw = w > 960 ? w * 0.50 : w * 0.84;
      var fy = h * 0.14;
      var fh = h * 0.72;

      var pts = [];
      var links = [];

      function addRect(x, y, rw, rh, cols, rows, kind) {
        var startIdx = pts.length;
        for (var r = 0; r <= rows; r += 1) {
          for (var c = 0; c <= cols; c += 1) {
            if (r > 0 && r < rows && c > 0 && c < cols) continue;
            pts.push({
              tx: x + (rw * c) / cols,
              ty: y + (rh * r) / rows,
              kind: kind,
            });
          }
        }
        var endIdx = pts.length;
        for (var a = startIdx; a < endIdx - 1; a += 1) {
          var dx = pts[a + 1].tx - pts[a].tx;
          var dy = pts[a + 1].ty - pts[a].ty;
          if (Math.hypot(dx, dy) < Math.max(rw, rh) * 0.65) {
            links.push([a, a + 1]);
          }
        }
        if (endIdx - startIdx > 2) {
          links.push([startIdx, endIdx - 1]);
        }
      }

      // Outer browser frame
      addRect(fx, fy, fw, fh, 6, 4, "frame");
      // Top chrome bar divider
      addRect(fx + 14, fy + fh * 0.11, fw - 28, fh * 0.01, 5, 1, "chrome");
      // Hero headline wireframe block
      addRect(fx + fw * 0.06, fy + fh * 0.21, fw * 0.52, fh * 0.22, 4, 2, "hero");
      // Structured schema sidebar block
      addRect(fx + fw * 0.64, fy + fh * 0.21, fw * 0.30, fh * 0.46, 2, 3, "schema");
      // Bottom 3 content cards
      for (var k = 0; k < 3; k += 1) {
        addRect(
          fx + fw * (0.06 + k * 0.19),
          fy + fh * 0.54,
          fw * 0.16,
          fh * 0.28,
          2,
          2,
          "card"
        );
      }

      // Ambient constellation stars around entire canvas
      var starCount = w > 780 ? 34 : 18;
      for (var s = 0; s < starCount; s += 1) {
        var angle = s * 2.39996;
        var sx = ((Math.sin(angle * 1.7) * 0.5 + 0.5) * 0.94 + 0.03) * w;
        var sy = ((Math.cos(angle * 1.3) * 0.5 + 0.5) * 0.9 + 0.05) * h;
        pts.push({ tx: sx, ty: sy, kind: "star" });
      }

      nodes = pts.map(function (p, idx) {
        var seed = idx * 1.618;
        return {
          tx: p.tx,
          ty: p.ty,
          ox: p.tx + Math.sin(seed * 7.3) * 140,
          oy: p.ty + Math.cos(seed * 5.1) * 110,
          x: p.tx,
          y: p.ty,
          kind: p.kind,
          phase: seed,
          r: p.kind === "star" ? 1.4 : p.kind === "schema" ? 2.4 : 1.9,
        };
      });
      edges = links;
    }

    function resize() {
      var rect = heroEl.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(460, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildWireframeTargets(width, height);
    }

    function drawFrame(now) {
      var t = now * 0.001;
      ctx.clearRect(0, 0, width, height);

      // Assembly cycle: smoothly assembles constellation into wireframe and breathes
      var assemble = reducedMotion ? 1 : Math.min(1, 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 0.32 - 0.5)));
      // Keep wireframe crisp most of the cycle
      var lock = reducedMotion ? 1 : Math.min(1, Math.max(0.18, Math.pow(assemble, 0.42)));

      // Dual scan beams (cyan horizontal sweep, acid-lime vertical crawler sweep)
      var scanX = reducedMotion ? width * 0.68 : ((t * 0.14) % 1.24 - 0.12) * width;
      var scanY = reducedMotion ? height * 0.42 : ((t * 0.11 + 0.45) % 1.24 - 0.12) * height;

      // Update node positions
      for (var i = 0; i < nodes.length; i += 1) {
        var n = nodes[i];
        var driftX = reducedMotion ? 0 : Math.sin(t * 0.7 + n.phase) * (n.kind === "star" ? 10 : 2.2);
        var driftY = reducedMotion ? 0 : Math.cos(t * 0.6 + n.phase) * (n.kind === "star" ? 8 : 2.2);
        var bx = n.ox + (n.tx - n.ox) * lock + driftX;
        var by = n.oy + (n.ty - n.oy) * lock + driftY;

        if (pointer.active && !reducedMotion) {
          var dx = bx - pointer.x;
          var dy = by - pointer.y;
          var dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 1) {
            var push = (1 - dist / 150) * 14;
            bx += (dx / dist) * push;
            by += (dy / dist) * push;
          }
        }
        n.x = bx;
        n.y = by;
      }

      // Draw scan beams glow ribbons
      var beamGradX = ctx.createLinearGradient(scanX - 110, 0, scanX + 26, 0);
      beamGradX.addColorStop(0, "rgba(94, 231, 255, 0)");
      beamGradX.addColorStop(0.75, "rgba(94, 231, 255, 0.13)");
      beamGradX.addColorStop(0.96, "rgba(94, 231, 255, 0.34)");
      beamGradX.addColorStop(1, "rgba(94, 231, 255, 0)");
      ctx.fillStyle = beamGradX;
      ctx.fillRect(scanX - 110, 0, 136, height);

      var beamGradY = ctx.createLinearGradient(0, scanY - 82, 0, scanY + 20);
      beamGradY.addColorStop(0, "rgba(198, 255, 61, 0)");
      beamGradY.addColorStop(0.78, "rgba(198, 255, 61, 0.09)");
      beamGradY.addColorStop(0.95, "rgba(198, 255, 61, 0.28)");
      beamGradY.addColorStop(1, "rgba(198, 255, 61, 0)");
      ctx.fillStyle = beamGradY;
      ctx.fillRect(0, scanY - 82, width, 102);

      // Draw wireframe edges
      ctx.lineWidth = 1.15;
      for (var e = 0; e < edges.length; e += 1) {
        var a = nodes[edges[e][0]];
        var b = nodes[edges[e][1]];
        var midX = (a.x + b.x) * 0.5;
        var midY = (a.y + b.y) * 0.5;
        var nearScan = Math.abs(midX - scanX) < 64 || Math.abs(midY - scanY) < 48;
        ctx.strokeStyle = nearScan
          ? "rgba(198, 255, 61, 0.62)"
          : a.kind === "schema"
          ? "rgba(196, 181, 253, 0.34)"
          : "rgba(94, 231, 255, 0.26)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw nodes + scan highlight halos
      for (var p = 0; p < nodes.length; p += 1) {
        var nd = nodes[p];
        var dScanX = Math.abs(nd.x - scanX);
        var dScanY = Math.abs(nd.y - scanY);
        var litLime = dScanY < 34;
        var litCyan = dScanX < 46;

        if (litLime || litCyan) {
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, nd.r + 4.5, 0, Math.PI * 2);
          ctx.fillStyle = litLime ? "rgba(198, 255, 61, 0.18)" : "rgba(94, 231, 255, 0.18)";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        if (litLime) {
          ctx.fillStyle = "#c6ff3d";
        } else if (litCyan) {
          ctx.fillStyle = "#5ee7ff";
        } else if (nd.kind === "schema") {
          ctx.fillStyle = "rgba(196, 181, 253, 0.72)";
        } else if (nd.kind === "star") {
          ctx.fillStyle = "rgba(148, 163, 184, 0.38)";
        } else {
          ctx.fillStyle = "rgba(94, 231, 255, 0.58)";
        }
        ctx.fill();
      }

      if (!reducedMotion && inView) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    }

    function startLoop() {
      if (reducedMotion || rafId) return;
      rafId = window.requestAnimationFrame(drawFrame);
    }

    function stopLoop() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    resize();
    drawFrame(performance.now());

    window.addEventListener("resize", function () {
      resize();
      if (reducedMotion) drawFrame(0);
    });

    heroEl.addEventListener("pointermove", function (ev) {
      var rect = heroEl.getBoundingClientRect();
      pointer.x = ev.clientX - rect.left;
      pointer.y = ev.clientY - rect.top;
      pointer.active = true;
    });
    heroEl.addEventListener("pointerleave", function () {
      pointer.active = false;
    });

    if ("IntersectionObserver" in window && !reducedMotion) {
      var heroObs = new IntersectionObserver(
        function (entries) {
          inView = entries[0].isIntersecting;
          if (inView) startLoop();
          else stopLoop();
        },
        { threshold: 0.05 }
      );
      heroObs.observe(heroEl);
    }
  }

  /* ---------------------------------------------------------------
   * 2. Live Animated 'AI Retrieval Terminal' Panel (Illustrative Generic Demo)
   * --------------------------------------------------------------- */
  var termEl = document.querySelector("[data-terminal]");
  if (termEl && !reducedMotion) {
    var lines = termEl.querySelectorAll(".ns-term-line");
    var cursorEl = termEl.querySelector("[data-term-cursor]");
    var termVisible = true;
    var stepIndex = lines.length;
    var timerId = 0;

    function tickTerminal() {
      if (!termVisible) return;
      stepIndex += 1;
      if (stepIndex > lines.length + 3) {
        stepIndex = 1;
      }
      for (var i = 0; i < lines.length; i += 1) {
        lines[i].classList.toggle("is-pending", i >= stepIndex);
      }
      if (cursorEl) {
        var activeIdx = Math.min(lines.length - 1, Math.max(0, stepIndex - 1));
        lines[activeIdx].appendChild(cursorEl);
      }
      var delay = stepIndex >= lines.length ? 2200 : 520;
      timerId = window.setTimeout(tickTerminal, delay);
    }

    if ("IntersectionObserver" in window) {
      var termObs = new IntersectionObserver(
        function (entries) {
          termVisible = entries[0].isIntersecting;
          if (termVisible && !timerId) {
            timerId = window.setTimeout(tickTerminal, 1600);
          } else if (!termVisible && timerId) {
            window.clearTimeout(timerId);
            timerId = 0;
          }
        },
        { threshold: 0.15 }
      );
      termObs.observe(termEl);
    } else {
      timerId = window.setTimeout(tickTerminal, 1600);
    }
  }
})();
