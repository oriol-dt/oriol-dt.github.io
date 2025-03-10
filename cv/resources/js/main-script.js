const fechaNacimiento = new Date(2002, 2, 25);
var fechaActual = new Date();

var day = fechaActual.getDate();
var month = fechaActual.toLocaleDateString('es-ES', { month: 'long' });
var year = fechaActual.getFullYear();

document.getElementById("day").innerHTML = day;
document.getElementById("month").innerHTML = month;
document.getElementById("year").innerHTML = year

var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

if (fechaActual.getMonth() < fechaNacimiento.getMonth() || fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() < fechaNacimiento.getDate()) {
    edad--;
}

const ageSpan = document.getElementById("edad");
ageSpan.innerHTML = `${edad} años`;