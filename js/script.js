// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  // Menú hamburguesa (responsive)
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.querySelector(".nav-list");
  if (menuToggle && navList) {
    menuToggle.addEventListener("click", function () {
      navList.classList.toggle("active");
    });

    // Cerrar el menú cuando se hace clic en un enlace del menú
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("active");
      });
    });
  }

  // Slider automático (cambia slide cada 8 segundos)
  if (document.querySelector("#container-slider")) {
    setInterval(() => {
      fntExecuteSlide("next");
    }, 8000);
  }

  // Puntos de navegación (dots) del slider
  const listSlider = document.querySelector(".listslider");
  if (listSlider) {
    let links = listSlider.querySelectorAll("li a");
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let item = this.getAttribute("itlist");
        let arrItem = item.split("_");
        fntExecuteSlide(Number(arrItem[1]));
        return false;
      });
    });
  }

  // Footer SOLO visible en contacto en móviles
  const footer = document.querySelector("footer");
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", function () {
      if (this.getAttribute("href") === "#contacto") {
        if (window.innerWidth <= 768) footer.style.display = "block";
      } else {
        if (window.innerWidth <= 768) footer.style.display = "none";
      }
    });
  });

  // Por defecto, oculta el footer en móvil al cargar (si no está en contacto)
  if (window.innerWidth <= 768) {
    footer.style.display = "none";
  }
});

/**
 * Cambia el slide mostrado
 * @param {"prev"|"next"|number} side
 */
function fntExecuteSlide(side) {
  let parentTarget = document.getElementById("slider");
  if (!parentTarget) return;
  let elements = parentTarget.getElementsByTagName("li");
  let curElement = 0;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].style.opacity == 1 || elements[i].style.opacity === "") {
      curElement = i;
      break;
    }
  }
  let nextElement;
  if (side === "prev" || side === "next") {
    if (side === "prev") {
      nextElement = curElement === 0 ? elements.length - 1 : curElement - 1;
    } else {
      nextElement = curElement === elements.length - 1 ? 0 : curElement + 1;
    }
  } else {
    nextElement = Number(side);
    side = curElement > nextElement ? "prev" : "next";
  }

  // Resalta los puntos del slider
  const listSlider = document.querySelector(".listslider");
  if (listSlider) {
    let elementSel = listSlider.getElementsByTagName("a");
    if (elementSel[curElement])
      elementSel[curElement].classList.remove("item-select-slid");
    if (elementSel[nextElement])
      elementSel[nextElement].classList.add("item-select-slid");
  }

  // Cambia la visibilidad de los slides
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.opacity = 0;
    elements[i].style.zIndex = 0;
  }
  elements[nextElement].style.opacity = 1;
  elements[nextElement].style.zIndex = 1;
}
