// verificar que se carga el js
console.log("main.js cargao");

// ==============================
// CONFIGURACIÓN DE RITMO
// ==============================

// cantidad de scroll necesaria por entrada (en vh)
const SCROLL_POR_ENTRADA = 20; // probá 40, 50, 70

// ==============================
// ESTADO GLOBAL
// ==============================

// índice de la entrada activa
let entradaActivaIndex = 0;

// referencias a las capas de fondo
const capasFondo = {
  actual: document.querySelector(".capa1"),
  siguiente: document.querySelector(".capa2")
};

// controla cuál capa está visible
let capaActiva = "actual";


// ==============================
// CREAR ENTRADAS DESDE JSON
// ==============================

function crearEntradasDesdeJSON(data) {
  Object.keys(data).forEach(ciudad => {
    data[ciudad].forEach(entrada => {
      switch (ciudad) {
        case "Kyoto":
          new Kyoto(entrada.titulo, entrada.parrafos);
          break;
        case "Osaka":
          new Osaka(entrada.titulo, entrada.parrafos);
          break;
        case "Nagoya":
          new Nagoya(entrada.titulo, entrada.parrafos);
          break;
        case "Tokyo":
          new Tokyo(entrada.titulo, entrada.parrafos);
          break;
      }
    });
  });
}


// ==============================
// RENDER INICIAL
// ==============================

function renderEntradasInicial() {
  const app = document.getElementById("app");

  registroEntradas.forEach(entrada => {
    app.appendChild(entrada.render());
  });

  actualizarEntradaActiva();
  actualizarFondo(entradaActivaIndex);
}


// ==============================
// ACTIVAR / DESACTIVAR ENTRADAS
// ==============================

function actualizarEntradaActiva() {
  const entradasDOM = document.querySelectorAll(".entrada");

  entradasDOM.forEach((el, index) => {
    el.classList.toggle("activa", index === entradaActivaIndex);
  });
}


// ==============================
// FONDO CON CROSS-FADE
// ==============================

function actualizarFondo(index) {
  const imagenURL = `img/fondo-${index}.jpg`;

  const capaVisible = capasFondo[capaActiva];
  const capaOculta =
    capaActiva === "actual" ? capasFondo.siguiente : capasFondo.actual;

  // asignar imagen a la capa oculta
  capaOculta.style.backgroundImage = `url(${imagenURL})`;

  // cross-fade
  capaOculta.classList.add("activa");
  capaVisible.classList.remove("activa");

  // alternar capas
  capaActiva = capaActiva === "actual" ? "siguiente" : "actual";
}


// ==============================
// AJUSTAR ALTURA DE SCROLL
// ==============================

function ajustarScrollSpacer() {
  const spacer = document.getElementById("scroll-spacer");
  spacer.style.height = `${registroEntradas.length * SCROLL_POR_ENTRADA}vh`;
}


// ==============================
// CARGA DEL JSON
// ==============================

fetch("data/entradas.json")
  .then(response => response.json())
  .then(data => {
    crearEntradasDesdeJSON(data);
    entradaActivaIndex = 0;
    renderEntradasInicial();
    ajustarScrollSpacer();
  })
  .catch(error => {
    console.error("Error cargando el JSON:", error);
  });


// ==============================
// SCROLL → CAMBIO DE ENTRADA
// ==============================

window.addEventListener("scroll", () => {
  const scrollUnit = window.innerHeight * (SCROLL_POR_ENTRADA / 100);
  const index = Math.floor(window.scrollY / scrollUnit);

  // limitar el índice al rango válido
  const indexSeguro = Math.max(
    0,
    Math.min(index, registroEntradas.length - 1)
  );

  if (indexSeguro !== entradaActivaIndex) {
    entradaActivaIndex = indexSeguro;
    actualizarEntradaActiva();
    actualizarFondo(entradaActivaIndex);
  }
});

