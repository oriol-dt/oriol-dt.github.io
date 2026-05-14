function toggleVisibility(category) {
    const contentElements = document.querySelectorAll('.' + category + '-content');

    if (contentElements.length > 0) {
        const currentState = contentElements[0].style.display;

        contentElements.forEach(function(element) {
            if (currentState === 'none' || currentState === '') {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }
}