// PARA LOS ACORDEONES
const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // cerrar todos (modo acordeón clásico)
      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

// POP-UP mostrar el popup solo la primera vez
function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}

window.onload = function() {
  if (!localStorage.getItem("popupMostrado")) {
    document.getElementById("popup").style.display = "flex";
    localStorage.setItem("popupMostrado", "true");
  }
};

// PARA LAS TRADUCCIONES
document.addEventListener("DOMContentLoaded", () => {

  /*Cerrar haciendo click fuera del pop up*/
  const modal = document.getElementById("modal");

  if (modal) {
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }

  const inputs = document.querySelectorAll(".faq-answer input");
  const btnTraduccion = document.getElementById("verTraduccion");
  const btnSiguiente = document.getElementById("btnSiguiente");

  function verificarInputs() {
    let todosCompletos = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        todosCompletos = false;
      }
    });

    btnTraduccion.disabled = !todosCompletos;
    btnSiguiente.disabled = !todosCompletos;
  }

  // 👇 AHORA SÍ funciona
  inputs.forEach(input => {
    input.addEventListener("input", verificarInputs);
  });

});

// TRADUCCIONES (correccion)

function verTxt() {
  document.getElementById("modal").classList.remove("oculto");
}

function cerrarModal() {
  document.getElementById("modal").classList.add("oculto");
}

// verificarInputs (corregido)
function verificarInputs() {
  console.log("input detectado");
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    input.addEventListener("input", verificarInputs);
  });
}

//PAGINACION AUTOMATIZADA
console.log("paginacion ejecutada");
// 🔹 CONFIGURACIÓN
const paginas = [
  "", // raíz
  "/2da_parte/",
  "/3ra_parte/",
];

const nav = document.querySelector(".paginacion");
nav.innerHTML = "";

let pathActual = window.location.pathname;

// detectar si estás en subcarpeta
const partes = pathActual.split("/").filter(Boolean);
const enSubcarpeta = partes.length > 2;

// detectar página actual
let indiceActual = 0;

paginas.forEach((ruta, i) => {
  if (ruta && pathActual.includes(ruta)) {
    indiceActual = i;
  }
});

// generar links
paginas.forEach((ruta, i) => {
  const link = document.createElement("a");

  let href;

  if (!enSubcarpeta) {
    // 👉 estás en raíz
    href = ruta || "./";
  } else {
    // 👉 estás en subcarpeta
    if (i === 0) {
      href = "../"; // volver a raíz
    } else {
      href = "../" + ruta;
    }
  }

  link.href = href;
  link.textContent = i + 1;

  if (i === indiceActual) {
    link.classList.add("actual");
  }

  nav.appendChild(link);
});




/*botones de paginacion - version VENTANA (+ de 5 paginas)*/
/*
const paginas = [
  "",
  "2da_parte/",
  "3ra_parte/",
  "4ta_parte/",
  "5ta_parte/",
  "6ta_parte/"
];

const nav = document.querySelector(".paginacion");
nav.innerHTML = "";

// detectar actual
let pathActual = window.location.pathname;

let indiceActual = paginas.findIndex(ruta =>
  pathActual.includes(ruta)
);

if (indiceActual === -1) indiceActual = 0;

const rango = 2;

// generar ventana
for (
  let i = indiceActual - rango;
  i <= indiceActual + rango;
  i++
) {
  if (i < 0 || i >= paginas.length) continue;

  const link = document.createElement("a");

  // rutas correctas
  let href;
  if (pathActual.includes("/2da_parte/") || pathActual.includes("/3ra_parte/")) {
    href = i === 0 ? "../" : "../" + paginas[i];
  } else {
    href = paginas[i] || "./";
  }

  link.href = href;
  link.textContent = i + 1;

  if (i === indiceActual) {
    link.classList.add("actual");
  }

  nav.appendChild(link);
}
*/
