/**
 * Paper & Ink — Motion, editorial reveals, video playback gating,
 * horizontal-scroll pinned process chapter, parallax, counters, and mobile nav.
 */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Assign CSS custom properties for staggered word & motif stroke reveals */
  document.querySelectorAll(".hero-title, .page-title").forEach(function (heading) {
    heading.querySelectorAll(".word-inner").forEach(function (el, idx) {
      el.style.setProperty("--i", String(idx));
    });
  });

  document.querySelectorAll(".motif-svg").forEach(function (svg) {
    svg.querySelectorAll(".m-draw").forEach(function (el, idx) {
      el.style.setProperty("--md", String(idx));
    });
  });

  document
    .querySelectorAll(".season-grid, .work-grid, .related-grid, .case-steps")
    .forEach(function (grid) {
      grid.querySelectorAll("[data-reveal]").forEach(function (card, idx) {
        card.style.setProperty("--d", String(idx % 6));
      });
    });

  /* 2. Scroll-triggered editorial reveals */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px 120px 0px", threshold: 0.01 }
    );

    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80) {
        el.classList.add("is-visible");
      } else {
        revealObs.observe(el);
      }
    });
  }

  /* 3. Pause off-screen & reduced-motion videos */
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-lazy-video]"));
  if (videos.length && !reducedMotion && "IntersectionObserver" in window) {
    var videoObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            var p = v.play();
            if (p && typeof p.catch === "function") p.catch(function () {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    videos.forEach(function (v) {
      videoObs.observe(v);
      var plate = v.closest(".service-plate, .engraving-plate");
      if (plate) {
        plate.addEventListener("mouseenter", function () {
          var p = v.play();
          if (p && typeof p.catch === "function") p.catch(function () {});
        });
      }
    });
  }

  /* 4. Animated numeral counters */
  var counterEls = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (reducedMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }
    var duration = 420;
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(eased * target);
      el.textContent = prefix + val + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counterEls.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      counterEls.forEach(animateCounter);
    } else {
      var countObs = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      counterEls.forEach(function (el) {
        countObs.observe(el);
      });
    }
  }

  /* 5. Horizontal-scroll pinned process chapter + subtle image parallax */
  var hStage = document.querySelector("[data-hscroll]");
  var hTrack = hStage ? hStage.querySelector("[data-hscroll-track]") : null;
  var hFill = hStage ? hStage.querySelector("[data-hscroll-fill]") : null;
  var hLabel = hStage ? hStage.querySelector("[data-hscroll-label]") : null;
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  var rafPending = false;
  function onScrollFrame() {
    rafPending = false;
    var vh = window.innerHeight;

    if (hStage && hTrack) {
      if (!reducedMotion && window.innerWidth >= 960) {
        var rect = hStage.getBoundingClientRect();
        var scrollable = hStage.offsetHeight - vh;
        var progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        var viewport = hTrack.parentElement;
        var maxShift = Math.max(0, hTrack.scrollWidth - viewport.clientWidth);
        hTrack.style.setProperty("--tx", (-progress * maxShift).toFixed(1) + "px");
        if (hFill) {
          hFill.style.setProperty("--progress", (0.25 + progress * 0.75).toFixed(3));
        }
        if (hLabel) {
          var stepIdx = Math.min(4, Math.max(1, Math.floor(progress * 4) + 1));
          hLabel.textContent = "0" + stepIdx + " / 04";
        }
      } else {
        hTrack.style.setProperty("--tx", "0px");
        if (hFill) hFill.style.setProperty("--progress", "1");
      }
    }

    if (!reducedMotion && parallaxEls.length) {
      parallaxEls.forEach(function (img) {
        var box = img.parentElement ? img.parentElement.getBoundingClientRect() : img.getBoundingClientRect();
        if (box.bottom < -80 || box.top > vh + 80) return;
        var centerRatio = (box.top + box.height * 0.5) / vh - 0.5;
        var offset = Math.max(-18, Math.min(18, centerRatio * -28));
        img.style.setProperty("--py", offset.toFixed(1) + "px");
      });
    }
  }

  function scheduleFrame() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  if (hStage || parallaxEls.length) {
    window.addEventListener("scroll", scheduleFrame, { passive: true });
    window.addEventListener("resize", scheduleFrame, { passive: true });
    onScrollFrame();
  }

  /* 6. Accessible mobile navigation drawer */
  var toggleBtn = document.querySelector("[data-nav-toggle]");
  var drawer = document.getElementById("mobile-drawer");
  if (toggleBtn && drawer) {
    function setOpen(open) {
      toggleBtn.setAttribute("aria-expanded", String(open));
      toggleBtn.textContent = open ? "Close" : "Menu";
      drawer.hidden = !open;
      drawer.classList.toggle("is-open", open);
    }

    toggleBtn.addEventListener("click", function () {
      var expanded = toggleBtn.getAttribute("aria-expanded") === "true";
      setOpen(!expanded);
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && toggleBtn.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggleBtn.focus();
      }
    });
  }
})();
