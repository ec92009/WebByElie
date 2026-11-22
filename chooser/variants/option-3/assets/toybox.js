/**
 * Web By Elie — Option 3 ("Toybox")
 * Interactive behaviors: mascot eye tracking, inchworm progress, spring reveals,
 * flickable showcase strip, retro TV video observer, confetti bursts, mobile nav.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Mobile Navigation Drawer */
  var navToggle = document.querySelector(".nav-toggle");
  var navDrawer = document.getElementById("mobile-nav-drawer");
  if (navToggle && navDrawer) {
    navToggle.addEventListener("click", function () {
      var open = navDrawer.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.textContent = open ? "✕" : "☰";
    });
  }

  /* 2. Inchworm Scroll-Progress Bar */
  var inchworm = document.querySelector(".inchworm-fill");
  function updateInchworm() {
    if (!inchworm) return;
    var doc = document.documentElement;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    var pct = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    inchworm.style.setProperty("--progress", pct.toFixed(4));
  }
  if (inchworm) {
    var scrollTick = false;
    window.addEventListener(
      "scroll",
      function () {
        if (scrollTick) return;
        scrollTick = true;
        requestAnimationFrame(function () {
          updateInchworm();
          scrollTick = false;
        });
      },
      { passive: true }
    );
    updateInchworm();
  }

  /* 3. Scroll-Triggered Spring Reveals & Coin Jar Drop */
  var revealEls = document.querySelectorAll(".reveal, .coin-jar-wrap");
  if (revealEls.length) {
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      revealEls.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var revealObs = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px 30px 0px" }
      );
      revealEls.forEach(function (el) {
        revealObs.observe(el);
      });
    }
  }

  /* 4. Pause Off-Screen Animated Regions & Videos */
  var animRegions = document.querySelectorAll("[data-pause-offscreen]");
  if (animRegions.length && typeof IntersectionObserver !== "undefined") {
    var regionObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-paused", !entry.isIntersecting);
        });
      },
      { rootMargin: "80px 0px" }
    );
    animRegions.forEach(function (el) {
      regionObs.observe(el);
    });
  }

  var videos = document.querySelectorAll(".retro-tv video");
  videos.forEach(function (video) {
    var btn = video.closest(".retro-tv") && video.closest(".retro-tv").querySelector(".tv-toggle");
    var userPaused = reduceMotion;

    if (reduceMotion) {
      video.pause();
      if (btn) btn.textContent = "Play";
    }

    if (btn) {
      btn.addEventListener("click", function () {
        if (video.paused) {
          userPaused = false;
          video.play().catch(function () {});
          btn.textContent = "Pause";
        } else {
          userPaused = true;
          video.pause();
          btn.textContent = "Play";
        }
      });
    }

    if (typeof IntersectionObserver !== "undefined") {
      var vidObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              video.pause();
            } else if (!userPaused && !reduceMotion) {
              video.play().catch(function () {});
              if (btn) btn.textContent = "Pause";
            }
          });
        },
        { threshold: 0.15 }
      );
      vidObs.observe(video);
    }
  });

  /* 5. Smooth Pointer-Tracking Mascot Pupils */
  var mascots = document.querySelectorAll(".mascot-svg");
  if (mascots.length && !reduceMotion) {
    var pointerX = 0;
    var pointerY = 0;
    var eyeRaf = null;

    function updateEyes() {
      eyeRaf = null;
      for (var i = 0; i < mascots.length; i += 1) {
        var svg = mascots[i];
        var rect = svg.getBoundingClientRect();
        if (rect.bottom < -40 || rect.top > window.innerHeight + 40) continue;
        var cx = rect.left + rect.width * 0.5;
        var cy = rect.top + rect.height * 0.5;
        var dx = pointerX - cx;
        var dy = pointerY - cy;
        var dist = Math.hypot(dx, dy) || 1;
        var maxOffset = 3.2;
        var scale = Math.min(1, dist / 240);
        var ox = (dx / dist) * maxOffset * scale;
        var oy = (dy / dist) * maxOffset * scale;
        svg.style.setProperty("--eye-x", ox.toFixed(2) + "px");
        svg.style.setProperty("--eye-y", oy.toFixed(2) + "px");
      }
    }

    window.addEventListener(
      "pointermove",
      function (ev) {
        pointerX = ev.clientX;
        pointerY = ev.clientY;
        if (!eyeRaf) {
          eyeRaf = requestAnimationFrame(updateEyes);
        }
      },
      { passive: true }
    );
  }

  /* 6. Interactive Flickable Showcase Strip */
  var strip = document.querySelector(".showcase-strip");
  if (strip) {
    var prevBtn = document.querySelector("[data-strip-prev]");
    var nextBtn = document.querySelector("[data-strip-next]");
    var step = 310;

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        strip.scrollBy({ left: -step, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        strip.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }

    var isDown = false;
    var startX = 0;
    var startScroll = 0;
    var dragged = false;

    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      isDown = true;
      dragged = false;
      startX = e.clientX;
      startScroll = strip.scrollLeft;
      strip.classList.add("is-dragging");
    });

    window.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      var delta = e.clientX - startX;
      if (Math.abs(delta) > 6) dragged = true;
      strip.scrollLeft = startScroll - delta;
    });

    window.addEventListener("pointerup", function () {
      if (!isDown) return;
      isDown = false;
      strip.classList.remove("is-dragging");
    });

    strip.addEventListener("click", function (e) {
      if (dragged) {
        e.preventDefault();
        dragged = false;
      }
    });

    strip.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        strip.scrollBy({ left: step, behavior: reduceMotion ? "auto" : "smooth" });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        strip.scrollBy({ left: -step, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }

  /* 7. Lightweight Confetti Burst (DPR capped at 2) */
  var colors = ["#ffc93c", "#ff6b5b", "#2f5bff", "#3ccf91", "#c4b5ff", "#1b1b1f"];

  function launchConfetti(originX, originY) {
    if (reduceMotion) return;
    var canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      return;
    }
    ctx.scale(dpr, dpr);

    var cx = typeof originX === "number" ? originX : w * 0.5;
    var cy = typeof originY === "number" ? originY : h * 0.45;
    var pieces = [];
    for (var i = 0; i < 48; i += 1) {
      var angle = (Math.PI * 2 * i) / 48 + (Math.random() - 0.5) * 0.4;
      var speed = 4 + Math.random() * 7.5;
      pieces.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4.5,
        size: 6 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.25,
        color: colors[i % colors.length],
        life: 1,
      });
    }

    var frame = 0;
    function tick() {
      frame += 1;
      ctx.clearRect(0, 0, w, h);
      var alive = false;
      for (var j = 0; j < pieces.length; j += 1) {
        var p = pieces[j];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.24;
        p.vx *= 0.985;
        p.rot += p.vrot;
        p.life -= 0.017;
        if (p.life <= 0) continue;
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = "#1b1b1f";
        ctx.lineWidth = 1.5;
        ctx.fillRect(-p.size * 0.5, -p.size * 0.35, p.size, p.size * 0.7);
        ctx.strokeRect(-p.size * 0.5, -p.size * 0.35, p.size, p.size * 0.7);
        ctx.restore();
      }
      if (alive && frame < 95) {
        requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(tick);
  }

  window.toyboxConfetti = launchConfetti;

  document.querySelectorAll(".js-confetti-cta").forEach(function (cta) {
    cta.addEventListener("click", function (ev) {
      var rect = cta.getBoundingClientRect();
      launchConfetti(ev.clientX || rect.left + rect.width * 0.5, ev.clientY || rect.top + rect.height * 0.5);
    });
  });
})();
