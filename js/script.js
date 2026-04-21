//1. Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  cargarAcordeon("1ra_parte.json");
  activarModal();
});

// 🔵 MODAL (CORREGIDO)
function activarModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }
}

//2. Generar acordeón desde JSON
let datosGlobales = []; // 🔥 importante

function cargarAcordeon(archivo) {
  fetch("data/1ra_parte.json") //fetch(`../data/${archivo}`)//
    .then(res => res.json())
    .then(data => {

      datosGlobales = data; // 🔥 guardamos el JSON

      const contenedor = document.getElementById("faq-container");
      contenedor.innerHTML = "";

      data.forEach(item => {
        const bloque = document.createElement("div");
        bloque.className = "faq-item";

        bloque.innerHTML = `
          <div class="faq-header">
            <button class="audio-btn-circle" data-audio="audio${item.id}">
              🔊
            </button>

            <button class="faq-question" aria-expanded="false">
              ${item.en}
              <span class="icon">+</span>
            </button>

            <audio id="audio${item.id}" src="${item.audio}"></audio>
          </div>

          <div class="faq-answer">
            <input type="text" placeholder="Translate">
          </div>
        `;

        contenedor.appendChild(bloque);
      });

      activarAcordeon();
      activarInputs();
      activarAudio();
    });
}

//3. Acordeón
function activarAcordeon() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // cerrar todos
      items.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".faq-question")
          .setAttribute("aria-expanded", "false");

        const ans = i.querySelector(".faq-answer");
        ans.style.maxHeight = null; // 🔥 cerrar suave
      });

      // abrir el actual
      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");

        answer.style.maxHeight = answer.scrollHeight + "px"; // 🔥 altura dinámica
      }
    });
  });
}

//4. Inputs (CORREGIDO)
function activarInputs() {
  const inputs = document.querySelectorAll(".faq-answer input");
  const btnTraduccion = document.getElementById("verTraduccion");
  const btnSiguiente = document.getElementById("btnSiguiente");

  function verificar() {
    let completos = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        completos = false;
      }
    });

    if (btnTraduccion) btnTraduccion.disabled = !completos;
    if (btnSiguiente) btnSiguiente.disabled = !completos;
  }

  inputs.forEach(input => {
    input.addEventListener("input", verificar);
  });
}

//5. Audio (seguro)
function activarAudio() {
  document.querySelectorAll(".audio-btn-circle").forEach(btn => {
    btn.addEventListener("click", () => {
      const audio = document.getElementById(btn.dataset.audio);
      if (audio) audio.play();
    });
  });
}

// POP-UP (se mantiene igual)
function cerrarPopup() {
  document.getElementById("popup").style.display = "none";
}

window.onload = function() {
  if (!localStorage.getItem("popupMostrado")) {
    document.getElementById("popup").style.display = "flex";
    localStorage.setItem("popupMostrado", "true");
  }
};

// MODAL abrir/cerrar
function verTxt() {
  const modal = document.getElementById("modal");
  const lista = document.getElementById("lista-traducciones");

  // limpiar lista antes de cargar
  lista.innerHTML = "";

  datosGlobales.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.en} - ${item.es}`;
    lista.appendChild(li);
  });

  modal.classList.remove("oculto");
}

function cerrarModal() {
  document.getElementById("modal").classList.add("oculto");
}

// PAGINACIÓN (solo protegí un posible error)
console.log("paginacion ejecutada");

const paginas = ["/", "/2da_parte/", "/3ra_parte/"];

const nav = document.querySelector(".paginacion");

if (nav) {
  nav.innerHTML = "";

  let pathActual = window.location.pathname;
  const partes = pathActual.split("/").filter(Boolean);
  const enSubcarpeta = partes.length > 2;

  let indiceActual = 0;

  paginas.forEach((ruta, i) => {
    if (ruta && pathActual.includes(ruta)) {
      indiceActual = i;
    }
  });

  paginas.forEach((ruta, i) => {
    const link = document.createElement("a");

    let href;

    if (!enSubcarpeta) {
      href = ruta || "./";
    } else {
      href = i === 0 ? "../" : "../" + ruta;
    }

    link.href = href;
    link.textContent = i + 1;

    if (i === indiceActual) {
      link.classList.add("actual");
    }

    nav.appendChild(link);
  });
}



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
