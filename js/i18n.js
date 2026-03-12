/**
 * Internationalization (i18n) Module
 * Handles language switching between PT and EN
 */

(function () {
    'use strict';

    const TRANSLATIONS_URL = 'data/translations.json';
    const DEFAULT_LANG = 'pt';
    const STORAGE_KEY = 'portfolio-language';

    let translations = null;
    let currentLang = DEFAULT_LANG;

    /**
     * Initialize i18n system
     */
    async function init() {
        try {
            const response = await fetch(TRANSLATIONS_URL);
            if (!response.ok) {
                return;
            }

            translations = await response.json();

            currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

            setupToggle();

            updateLanguage(currentLang);

        } catch (error) {
            // Silent fail - default language content remains
        }
    }

    /**
     * Set up language toggle button
     */
    function setupToggle() {
        const toggle = document.getElementById('langToggle');
        if (!toggle) return;

        updateToggleText(toggle);

        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            localStorage.setItem(STORAGE_KEY, currentLang);
            updateLanguage(currentLang);
            updateToggleText(toggle);
        });
    }


    /**
     * Update toggle button text
     */
    function updateToggleText(toggle) {
        const span = toggle.querySelector('span');
        if (span) {
            span.textContent = currentLang === 'pt' ? 'EN' : 'PT';
        }
        toggle.setAttribute('aria-label',
            currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'
        );
    }

    /**
     * Update all translatable elements on the page
     * @param {string} lang - Language code ('pt' or 'en')
     */
    function updateLanguage(lang) {
        if (!translations || !translations[lang]) return;

        const t = translations[lang];

        // 1. Generic Data-Attribute Based Translation
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = resolveKey(t, key);
            if (val) {
                if (el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', val);
                } else {
                    el.textContent = val;
                }
            }
        });

        // 2. Specific Element Translations

        // Navigation
        translateElements('.nav__link[href="#about"]', t.nav.about);
        translateElements('.nav__link[href="#servicos"]', t.nav.solutions);
        translateElements('.nav__link[href="#skills"]', t.nav.skills);
        translateElements('.nav__link[href="#projects"]', t.nav.projects);
        translateElements('.nav__link[href="#education"]', t.nav.education);
        translateElements('.nav__link[href="#blog"]', t.nav.blog);
        translateElements('.nav__link[href="#contact"]', t.nav.contact);

        // Hero section
        translateElements('.hero__badge span', t.hero.badge);
        translateElements('.hero .section-label', t.hero.greeting);
        translateElements('.hero__title .txt-type', null, { 'data-words': t.hero.role });
        translateElements('.hero__subtitle', t.hero.description);
        translateElements('.hero__cta:not(.hero__cta--secondary)', t.hero.cta_projects, { keepIcon: true });
        translateElements('.hero__cta--secondary', t.hero.cta_cv, { keepIcon: true });

        // About section
        translateElements('#about .section-label', t.about.label);
        translateElements('#about .section-title', t.about.title);
        translateElements('#about .about__text:nth-of-type(1)', t.about.text1);
        translateElements('#about .about__text:nth-of-type(2)', t.about.text2);
        translateElements('#about .about__text:nth-of-type(3)', t.about.text3);

        // Services section
        translateElements('#servicos .section-label', t.services.label);
        translateElements('#servicos .section-title', t.services.title);
        translateElements('.services__cta-wrapper .btn', t.services.cta);

        // Service Cards
        translateElements('.service-card:nth-child(1) .service-card__title', t.services.card1_title);
        translateElements('.service-card:nth-child(1) .service-card__description', t.services.card1_desc);
        translateElements('.service-card:nth-child(2) .service-card__title', t.services.card2_title);
        translateElements('.service-card:nth-child(2) .service-card__description', t.services.card2_desc);
        translateElements('.service-card:nth-child(3) .service-card__title', t.services.card3_title);
        translateElements('.service-card:nth-child(3) .service-card__description', t.services.card3_desc);


        // Skills section
        translateElements('#skills .section-label', t.skills.label);
        translateElements('#skills .section-title', t.skills.title);

        // Projects section
        translateElements('#projects .section-label', t.projects.label);
        translateElements('#projects .section-title', t.projects.title);
        translateElements('.project-card__cta', t.projects.view_case);
        translateElements('.project-card__btn--primary', t.projects.btn_site, { keepIcon: true });
        translateElements('.project-card__btn--secondary', t.projects.btn_code, { keepIcon: true });



        // Education section
        translateElements('#education .section-label', t.education.label);
        translateElements('#education .section-title', t.education.title);
        translateElements('.education__item--degree h3', t.education.degree_title);
        translateElements('.education__university', t.education.degree_university);
        translateElements('.education__detail-expected span', t.education.degree_expected);

        translateElements('.education__detail-semester span', t.education.degree_semester);
        translateElements('.education__focus-title', t.education.degree_focus);
        translateElements('.education__progress-label', t.education.progress_label);
        translateElements('.education__item--credentials h3', t.education.certs_title);


        // Testimonials section
        translateElements('#testimonials .section-label', t.testimonials.label);
        translateElements('#testimonials .section-title', t.testimonials.title);


        // Contact section
        translateElements('#contact .section-label', t.contact.label);
        translateElements('#contact .section-title', t.contact.title);
        translateElements('.contact__subtitle', t.contact.subtitle);
        translateElements('.contact__label[for="name"]', t.contact.name);
        translateElements('.contact__label[for="email"]', t.contact.email);
        translateElements('.contact__label[for="subject"]', t.contact.subject);
        translateElements('.contact__label[for="message"]', t.contact.message);
        translateElements('.contact__submit', t.contact.submit);

        // Form placeholders
        updatePlaceholder('#name', t.contact.name_placeholder);
        updatePlaceholder('#email', t.contact.email_placeholder);
        updatePlaceholder('#subject', t.contact.subject_placeholder);
        updatePlaceholder('#message', t.contact.message_placeholder);
        updatePlaceholder('#details', t.contact.details_placeholder);

        // Footer
        translateElements('.footer__bottom p:first-child', t.footer.developed);


        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update CV download link based on language
        updateCVLink(lang);

        // Update progress bar label
        translateElements('.education__progress-label', t.education?.progress_label);
    }

    /**
     * Update form placeholders
     */
    function updatePlaceholder(selector, text) {
        if (!text) return;
        const el = document.querySelector(selector);
        if (el) el.setAttribute('placeholder', text);
    }


    /**
     * Update CV download link based on language
     * @param {string} lang - Language code
     */
    function updateCVLink(lang) {
        const cvLink = document.querySelector('.hero__cta--secondary');
        if (cvLink) {
            const cvPath = lang === 'pt'
                ? 'assets/resume/CV_Pedro_Braga_Software_Engineer.pdf'
                : 'assets/resume/Resume_Pedro_Braga_Software_Engineer.pdf';
            cvLink.setAttribute('href', cvPath);
        }
    }


    /**
     * Translate elements matching selector (safe - no innerHTML)
     * @param {string} selector - CSS selector
     * @param {string} text - Text to apply
     * @param {object} options - Additional options
     */
    function translateElements(selector, text, options = {}) {
        if (!text && !options['data-words']) return;

        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (options.keepIcon) {
                // Keep SVG icons, only replace text safely
                const svg = el.querySelector('svg');
                if (svg) {
                    // Remove all child nodes except the SVG
                    const svgClone = svg.cloneNode(true);
                    while (el.firstChild) {
                        el.removeChild(el.firstChild);
                    }
                    el.appendChild(document.createTextNode(text + ' '));
                    el.appendChild(svgClone);
                } else {
                    el.textContent = text;
                }
            } else if (options['data-words']) {
                el.setAttribute('data-words', options['data-words']);
            } else {
                el.textContent = text;
            }
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /**
     * Resolve nested object path string (e.g. 'footer.rights')
     */
    function resolveKey(obj, key) {
        return key.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
})();
