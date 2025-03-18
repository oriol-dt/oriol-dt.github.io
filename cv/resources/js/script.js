const birthDate = new Date(2002, 2, 25);
const actualDate = new Date();

const day = actualDate.getDate();
const month = actualDate.toLocaleDateString('es-ES', { month: 'long' });
const year = actualDate.getFullYear();

document.getElementById("day").innerHTML = ` ${day} `;
document.getElementById("month").innerHTML = ` ${month} `;
document.getElementById("year").innerHTML = ` ${year} `;

let age = actualDate.getFullYear() - birthDate.getFullYear();

if (actualDate.getMonth() < birthDate.getMonth() || actualDate.getMonth() === birthDate.getMonth() && actualDate.getDate() < birthDate.getDate()) {
    age--;
}

const ageSpan = document.getElementById("age");
ageSpan.innerHTML = `${age} años`;