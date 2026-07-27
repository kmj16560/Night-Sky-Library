/*
파일 위치:
 /js/header.js
*/
(function () {
  "use strict";

  var HEADER_ID = "site-header";

  function getCurrentPath() {
    return window.location.pathname || "";
  }

  function isInsidePagesFolder() {
    return getCurrentPath().indexOf("/pages/") !== -1;
  }

  function getBasePath() {
    return isInsidePagesFolder() ? "../" : "./";
  }

  function buildPath(relativePath) {
    return getBasePath() + relativePath;
  }

  function createLink(text, href, className) {
    var link = document.createElement("a");
    link.textContent = text;
    link.href = buildPath(href);
    link.className = className || "";
    return link;
  }

  function createDropdown(title, items) {
    var wrapper = document.createElement("div");
    wrapper.className = "header-dropdown";

    var button = document.createElement("button");
    button.type = "button";
    button.className = "header-menu-button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-haspopup", "true");
    button.textContent = title;

    var panel = document.createElement("div");
    panel.className = "header-dropdown-panel";

    items.forEach(function (item) {
      var link = createLink(item.text, item.href, "header-dropdown-link");
      panel.appendChild(link);
    });

    button.addEventListener("click", function () {
      var isOpen = wrapper.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        wrapper.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });

    wrapper.appendChild(button);
    wrapper.appendChild(panel);
    return wrapper;
  }

  function closeAllDropdowns() {
    var dropdowns = document.querySelectorAll(".header-dropdown.open");
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove("open");
      var btn = dropdown.querySelector(".header-menu-button");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function createHeader() {
    var header = document.createElement("header");
    header.className = "site-header";

    var inner = document.createElement("div");
    inner.className = "site-header-inner";

    var brand = document.createElement("a");
    brand.className = "site-brand";
    brand.href = buildPath("index.html");
    brand.textContent = "Mystic Blue";

    var mobileToggle = document.createElement("button");
    mobileToggle.type = "button";
    mobileToggle.className = "header-mobile-toggle";
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "메뉴 열기");
    mobileToggle.textContent = "☰";

    var nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.setAttribute("aria-label", "주요 메뉴");

    var introMenu = createDropdown("소개", [
      { text: "나", href: "pages/intro-me.html" },
      { text: "홈페이지 소개", href: "pages/intro-home.html" },
      { text: "업데이트", href: "pages/intro-update.html" }
    ]);

    var gameMenu = createDropdown("게임", [
      { text: "기억력게임", href: "pages/game-memory.html" },
      { text: "보석맞추기", href: "pages/game-jewel.html" },
      { text: "숫자게임", href: "pages/game-number.html" },
      { text: "미로게임", href: "pages/game-maze.html" }
    ]);

    var etcMenu = createDropdown("기타", [
      { text: "방명록", href: "pages/etc-guestbook.html" },
      { text: "링크모음", href: "pages/etc-links.html" }
    ]);

    nav.appendChild(introMenu);
    nav.appendChild(gameMenu);
    nav.appendChild(etcMenu);

    mobileToggle.addEventListener("click", function () {
      var isOpen = header.classList.contains("nav-open");
      header.classList.toggle("nav-open", !isOpen);
      mobileToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileToggle.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
    });

    inner.appendChild(brand);
    inner.appendChild(nav);
    inner.appendChild(mobileToggle);
    header.appendChild(inner);

    document.addEventListener("click", function (event) {
      if (!header.contains(event.target)) {
        closeAllDropdowns();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAllDropdowns();
      }
    });

    return header;
  }

  function ensureHeaderMount() {
    var mount = document.getElementById(HEADER_ID);

    if (!mount) {
      mount = document.createElement("div");
      mount.id = HEADER_ID;
      document.body.insertBefore(mount, document.body.firstChild);
    }

    mount.innerHTML = "";
    mount.appendChild(createHeader());
  }

  function init() {
    ensureHeaderMount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();