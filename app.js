(function () {
  var drawer = document.getElementById("drawer");
  var openBtn = document.getElementById("menuBtn");
  var closeBtn = document.getElementById("closeBtn");
  if (!drawer || !openBtn || !closeBtn) return;

  var locked = false;
  var y = 0;

  function lock() {
    y = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + y + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    locked = true;
  }

  function unlock(keepY) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    if (locked && !keepY) window.scrollTo(0, y);
    locked = false;
  }

  function scrollToId(id) {
    var el = document.querySelector(id);
    if (!el) return;
    var nav = document.getElementById("nav");
    var offset = nav ? nav.getBoundingClientRect().height : 0;
    var top = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - offset - 12;
    if (top < 0) top = 0;
    window.scrollTo(0, top);
    try {
      history.pushState(null, "", id);
    } catch (err) {}
  }

  function openMenu() {
    drawer.removeAttribute("hidden");
    openBtn.setAttribute("aria-expanded", "true");
    lock();
    closeBtn.focus();
  }

  function closeMenu(restoreFocus, keepY) {
    if (drawer.hasAttribute("hidden")) return;
    drawer.setAttribute("hidden", "");
    openBtn.setAttribute("aria-expanded", "false");
    unlock(keepY);
    if (restoreFocus) openBtn.focus();
  }

  openBtn.addEventListener("click", function () {
    if (drawer.hasAttribute("hidden")) openMenu();
    else closeMenu(true);
  });

  closeBtn.addEventListener("click", function () {
    closeMenu(false);
  });

  var links = drawer.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id.charAt(0) !== "#") {
        closeMenu(false);
        return;
      }
      e.preventDefault();
      closeMenu(false, true);
      scrollToId(id);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu(true);
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 960px)").matches) closeMenu(false);
  });
})();
