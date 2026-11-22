/*
 * Night Signal — Core Interactions (Scroll Laser, Spotlight, Magnetic CTA,
 * Kinetic Text Decode, Reveal IO, FAQ Accordion, Mobile Nav, Video IO, 3D Tilt)
 */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* 1. Scroll-progress laser beam */
  var scrollTicking = false;
  function updateScrollProgress() {
    scrollTicking = false;
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    var ratio = Math.min(1, Math.max(0, window.scrollY / max));
    doc.style.setProperty("--scroll-progress", ratio.toFixed(4));
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollProgress);
      }
    },
    { passive: true }
  );
  updateScrollProgress();

  /* 2. Mobile drawer navigation */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileDrawer = document.querySelector("[data-mobile-drawer]");
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mobileDrawer.classList.toggle("is-open", !expanded);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        menuToggle.setAttribute("aria-expanded", "false");
        mobileDrawer.classList.remove("is-open");
        menuToggle.focus();
      }
    });
  }

  /* 3. Cursor-following radial spotlight & 3D screen-glare tilt */
  if (finePointer) {
    var spotlightEls = document.querySelectorAll(".ns-card, .ns-monitor-inner, .ns-work-card");
    for (var i = 0; i < spotlightEls.length; i += 1) {
      (function (el) {
        var isTilt = !reducedMotion && el.classList.contains("ns-work-card");
        el.addEventListener("pointermove", function (ev) {
          var rect = el.getBoundingClientRect();
          var x = ev.clientX - rect.left;
          var y = ev.clientY - rect.top;
          el.style.setProperty("--mx", x.toFixed(1) + "px");
          el.style.setProperty("--my", y.toFixed(1) + "px");
          if (isTilt && rect.width > 0 && rect.height > 0) {
            var rx = ((0.5 - y / rect.height) * 7).toFixed(2);
            var ry = ((x / rect.width - 0.5) * 7).toFixed(2);
            el.style.setProperty("--tilt-x", rx + "deg");
            el.style.setProperty("--tilt-y", ry + "deg");
          }
        });
        if (isTilt) {
          el.addEventListener("pointerleave", function () {
            el.style.setProperty("--tilt-x", "0deg");
            el.style.setProperty("--tilt-y", "0deg");
          });
        }
      })(spotlightEls[i]);
    }
  }

  /* 4. Magnetic primary CTA buttons */
  if (finePointer && !reducedMotion) {
    var magButtons = document.querySelectorAll(".ns-btn-magnetic");
    for (var m = 0; m < magButtons.length; m += 1) {
      (function (btn) {
        btn.addEventListener("pointermove", function (ev) {
          var rect = btn.getBoundingClientRect();
          var dx = (ev.clientX - (rect.left + rect.width / 2)) * 0.22;
          var dy = (ev.clientY - (rect.top + rect.height / 2)) * 0.28;
          dx = Math.max(-7, Math.min(7, dx));
          dy = Math.max(-5, Math.min(5, dy));
          btn.style.setProperty("--mag-x", dx.toFixed(1) + "px");
          btn.style.setProperty("--mag-y", dy.toFixed(1) + "px");
        });
        btn.addEventListener("pointerleave", function () {
          btn.style.setProperty("--mag-x", "0px");
          btn.style.setProperty("--mag-y", "0px");
        });
      })(magButtons[m]);
    }
  }

  /* 5. Scroll reveal observer (with fast-scroll & hash-jump fallback) */
  var revealEls = document.querySelectorAll(".ns-reveal");
  if (revealEls.length) {
    var sweepVisible = function () {
      var cutoff = window.innerHeight * 0.98;
      for (var k = 0; k < revealEls.length; k += 1) {
        if (!revealEls[k].classList.contains("is-visible")) {
          var box = revealEls[k].getBoundingClientRect();
          if (box.top < cutoff) {
            revealEls[k].classList.add("is-visible");
          }
        }
      }
    };
    if (reducedMotion || !("IntersectionObserver" in window)) {
      for (var r = 0; r < revealEls.length; r += 1) {
        revealEls[r].classList.add("is-visible");
      }
    } else {
      var revealObs = new IntersectionObserver(
        function (entries) {
          for (var e = 0; e < entries.length; e += 1) {
            if (entries[e].isIntersecting) {
              entries[e].target.classList.add("is-visible");
              revealObs.unobserve(entries[e].target);
            }
          }
        },
        { rootMargin: "0px 0px 40px 0px", threshold: 0.01 }
      );
      sweepVisible();
      for (var k = 0; k < revealEls.length; k += 1) {
        if (!revealEls[k].classList.contains("is-visible")) {
          revealObs.observe(revealEls[k]);
        }
      }
      window.addEventListener("scroll", sweepVisible, { passive: true });
    }
  }

  /* 6. Kinetic text scramble/decode reveal on section headings */
  var GLYPHS = "01/\\<>[]#_+-=";
  function runDecode(el) {
    var target = el.getAttribute("data-decode-text") || el.textContent;
    if (!target || el.getAttribute("data-decoded") === "1") return;
    el.setAttribute("data-decoded", "1");
    el.setAttribute("aria-label", target);
    var startTime = performance.now();
    var duration = 380;
    var done = false;

    function finish() {
      if (done) return;
      done = true;
      el.textContent = target;
    }

    function step(now) {
      if (done) return;
      var elapsed = Math.max(0, now - startTime);
      var progress = Math.min(1, elapsed / duration);
      if (progress >= 1) {
        finish();
        return;
      }
      var locked = Math.floor(progress * target.length);
      var tick = Math.floor(elapsed / 32);
      var out = "";
      for (var c = 0; c < target.length; c += 1) {
        var ch = target[c];
        if (ch === " " || c < locked) {
          out += ch;
        } else {
          out += GLYPHS[(c + tick * 3) % GLYPHS.length];
        }
      }
      el.textContent = out;
      window.requestAnimationFrame(step);
    }

    window.setTimeout(finish, duration + 140);
    window.requestAnimationFrame(step);
  }

  var decodeEls = document.querySelectorAll(".ns-decode");
  if (decodeEls.length && !reducedMotion && "IntersectionObserver" in window) {
    var decodeObs = new IntersectionObserver(
      function (entries) {
        for (var d = 0; d < entries.length; d += 1) {
          if (entries[d].isIntersecting) {
            runDecode(entries[d].target);
            decodeObs.unobserve(entries[d].target);
          }
        }
      },
      { threshold: 0.25 }
    );
    for (var j = 0; j < decodeEls.length; j += 1) {
      decodeEls[j].setAttribute("data-decode-text", decodeEls[j].textContent);
      decodeObs.observe(decodeEls[j]);
    }
  }

  /* 7. Accessible FAQ accordion */
  var faqItems = document.querySelectorAll(".ns-faq-item");
  for (var f = 0; f < faqItems.length; f += 1) {
    (function (item, idx) {
      var btn = item.querySelector(".ns-faq-btn");
      if (!btn) return;
      var openInitially = idx === 0;
      item.setAttribute("data-open", String(openInitially));
      btn.setAttribute("aria-expanded", String(openInitially));
      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        item.setAttribute("data-open", String(!isOpen));
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    })(faqItems[f], f);
  }

  /* 8. Viewport & hover video playback (paused off-screen via IntersectionObserver) */
  var videos = document.querySelectorAll("video[data-signal-video]");
  var motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (videos.length && "IntersectionObserver" in window) {
    var videoObs = new IntersectionObserver(
      function (entries) {
        for (var v = 0; v < entries.length; v += 1) {
          var vid = entries[v].target;
          if (entries[v].isIntersecting && !motionMq.matches) {
            var playPromise = vid.play();
            if (playPromise && typeof playPromise.catch === "function") {
              playPromise.catch(function () {});
            }
          } else {
            vid.pause();
          }
        }
      },
      { threshold: 0.25 }
    );
    for (var u = 0; u < videos.length; u += 1) {
      if (!motionMq.matches) {
        videoObs.observe(videos[u]);
      }
    }
    if (typeof motionMq.addEventListener === "function") {
      motionMq.addEventListener("change", function (ev) {
        for (var p = 0; p < videos.length; p += 1) {
          if (ev.matches) {
            videos[p].pause();
            videoObs.unobserve(videos[p]);
          } else {
            videoObs.observe(videos[p]);
          }
        }
      });
    }
  }
})();
