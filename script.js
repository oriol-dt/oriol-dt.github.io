const actualDate = new Date();
const actualYear = actualDate.getFullYear();

const spanYear = document.getElementById('year');
spanYear.textContent = actualYear;