// Registro global de entradas
const registroEntradas = [];

// Clase base Entrada
class Entrada {
  constructor(id_entrada, titulo, parrafos, ciudad) {
    this.id_entrada = id_entrada;
    this.titulo = titulo;
    this.parrafos = parrafos; // ahora es un array
    this.ciudad = ciudad;
    this.activa = false;

    registroEntradas.push(this);
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("entrada");

    // Generar HTML de los párrafos
    const contenido = this.parrafos
      .map(texto => `<p>${texto}</p>`)
      .join("");

    div.innerHTML = `
      <h3>${this.titulo}</h3>
      ${contenido}
      <small>${this.ciudad}</small>
    `;

    div.addEventListener("click", () => {
      this.activar();
      div.classList.add("activa");
    });

    return div;
  }
}