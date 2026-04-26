const actualYear = new Date().getFullYear();
const spanYear = document.getElementById("year");
if (spanYear) {
    spanYear.textContent = actualYear;
}

const updateProgress = () => {
    const targetDate = new Date('2026-05-01T00:00:00').getTime();
    const startDate = new Date('2026-04-01T00:00:00').getTime();
    const now = new Date().getTime();

    const total = targetDate - startDate;
    const elapsed = now - startDate;

    let percentage = (elapsed / total) * 100;

    percentage = Math.min(Math.max(percentage, 0), 100);

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");

    if (bar && text) {
        bar.style.width = percentage + "%";
        text.innerText = percentage.toFixed(2) + '% completado';

    } else {
        console.error("No se han encontrado los elementos 'progressBar' o 'progressText'");
    }

};

setInterval(updateProgress, 1000);
updateProgress();