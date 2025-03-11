const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();

const spanAño = document.getElementById('year');
spanAño.textContent = añoActual;