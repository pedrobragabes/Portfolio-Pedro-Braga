(function () {
    'use strict';

    try {
        var savedTheme = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = savedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.backgroundColor = theme === 'dark' ? '#121212' : '#F5F0E8';
    } catch (error) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.backgroundColor = '#F5F0E8';
    }
})();
