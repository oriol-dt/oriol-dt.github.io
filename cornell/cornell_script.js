document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');
    let formattedDate;
    formattedDate = `${year}-${month}-${day}`;
    dateInput.value = formattedDate;
});