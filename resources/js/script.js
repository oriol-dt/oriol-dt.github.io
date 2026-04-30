const updateProjectProgress = (startDateStr, endDateStr, barId, textId) => {
    const start = new Date(startDateStr).getTime();
    const end = new Date(endDateStr).getTime();
    const now = new Date().getTime();

    const total = end - start;
    const elapsed = now - start;

    let percentage = (elapsed / total) * 100;

    percentage = Math.min(Math.max(percentage, 0), 100);

    const bar = document.getElementById(barId);
    const text = document.getElementById(textId);

    if (bar && text) {
        bar.style.width = percentage.toFixed(2) + "%";
        text.innerText = percentage.toFixed(2) + '% completado';

        if (now < start) text.innerText = "Próximamente...";
    }
};

const runAllProgress = () => {
    updateProjectProgress('2026-05-01T00:00:00', '2026-06-01T00:00:00', 'progressBar2', 'progressText2');

    updateProjectProgress('2026-06-01T00:00:00', '2026-07-01T00:00:00', 'progressBar3', 'progressText3');

    updateProjectProgress('2026-07-01T00:00:00', '2026-08-01T00:00:00', 'progressBar4', 'progressText4');
};

setInterval(runAllProgress, 1000);
runAllProgress();