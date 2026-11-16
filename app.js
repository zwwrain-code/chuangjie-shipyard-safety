(function () {
  var nav = document.getElementById("nav");
  var btn = document.getElementById("menuBtn");
  var panel = document.getElementById("mobilePanel");

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("solid");
    else nav.classList.remove("solid");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    panel.classList.remove("open");
    document.body.classList.remove("menu-open");
    btn.setAttribute("aria-label", "打开菜单");
    document.body.style.overflow = "";
  }
  function openMenu() {
    panel.classList.add("open");
    document.body.classList.add("menu-open");
    btn.setAttribute("aria-label", "关闭菜单");
    document.body.style.overflow = "hidden";
  }
  btn.addEventListener("click", function () {
    if (panel.classList.contains("open")) closeMenu();
    else openMenu();
  });
  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
})();
