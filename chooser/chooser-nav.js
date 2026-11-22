/**
 * Chooser bar behavior.
 *
 * Keeps the visitor on the same page when switching designs: on
 * /chooser/variants/option-1/services/seo/, the "Option 2" button points to
 * /chooser/variants/option-2/services/seo/. The Original only has a subset of
 * pages, so unknown paths fall back to its home page.
 */
(function () {
  "use strict";

  var ORIGINAL_PAGES = [
    "",
    "services/refresh/",
    "services/seo/",
    "services/ai-ready/",
    "services/cost-cleanup/",
    "work/golden-years/",
  ];

  var body = document.body;
  var page = body.getAttribute("data-page") || "";
  var current = body.getAttribute("data-proposal") || "";

  var links = document.querySelectorAll(".chooser-nav .chooser-btn");
  for (var i = 0; i < links.length; i += 1) {
    var link = links[i];
    var option = link.getAttribute("data-option");
    var base = link.getAttribute("href");
    var target = page;
    if (option === "original" && ORIGINAL_PAGES.indexOf(page) === -1) {
      target = "";
    }
    link.setAttribute("href", base + target);
    if (option === current) {
      link.setAttribute("aria-current", "page");
    }
  }

  // Number keys 0-3 switch options quickly during review.
  document.addEventListener("keydown", function (event) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    var tag = (event.target && event.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    var index = "0123".indexOf(event.key);
    if (index >= 0 && links[index]) {
      window.location.href = links[index].href;
    }
  });
})();
