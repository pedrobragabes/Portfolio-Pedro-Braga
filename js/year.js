document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Initialize progress bars from data-width attributes
    var bars = document.querySelectorAll('[data-width]');
    for (var i = 0; i < bars.length; i++) {
        bars[i].style.width = bars[i].getAttribute('data-width') + '%';
    }
});
