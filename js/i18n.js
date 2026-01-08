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
                console.warn('Translations not found');
                return;
            }

            translations = await response.json();

            // Get saved language or default
            currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

            // Set up toggle button
            setupToggle();

            // Apply translations
            updateLanguage(currentLang);

            console.log(`✓ i18n initialized (${currentLang.toUpperCase()})`);

        } catch (error) {
            console.warn('Could not load translations:', error.message);
        }
    }

    /**
     * Set up language toggle button
     */
    function setupToggle() {
        const toggle = document.getElementById('langToggle');
        if (!toggle) return;

        // Update toggle text
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

        // 1. Generic Data-Attribute Based Translation (Robust & Declarative)
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = resolveKey(t, key);
            if (val) {
                // If it's a placeholder, update attribute, otherwise textcontent
                if (el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', val);
                } else {
                    // Check if we need to keep icon
                    if (el.children.length > 0 && el.querySelector('svg, i, img')) {
                        // Simple HTML update preserving icon if it's at end or start?
                        // For safety, let's just update text node if possible or use complex logic.
                        // For now, assume simple text replacement unless specifiec classes.
                        // Actually, let's use a helper for mixed content if needed.
                        // Most data-i18n will be simple text.
                        // If it has children, we might want to check if it's just text replacement desired.
                        // But simple textContent overwrite is safest for now for most labels.
                        // If specific handling needed, use translateElements logic.
                        // Let's use innerText for simple cases.
                        el.textContent = val;
                    } else {
                        el.textContent = val;
                    }
                }
            }
        });

        // 2. Specific Element Translations (for elements not covered by data-i18n or requiring special handling)

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
        translateElements('#about .about__text:nth-of-type(1)', t.about.text1, { asHTML: true });
        translateElements('#about .about__text:nth-of-type(2)', t.about.text2, { asHTML: true });
        translateElements('#about .about__text:nth-of-type(3)', t.about.text3, { asHTML: true });

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
        // translateElements('.education__item--degree .education__badge', t.education.degree_status);
        translateElements('.education__detail-expected span', t.education.degree_expected);

        translateElements('.education__detail-semester span', t.education.degree_semester);
        translateElements('.education__focus-title', t.education.degree_focus);
        translateElements('.education__progress-label', t.education.progress_label);
        translateElements('.education__item--credentials h3', t.education.certs_title);


        // Testimonials section
        translateElements('#testimonials .section-label', t.testimonials.label);
        translateElements('#testimonials .section-title', t.testimonials.title);

        // Blog section (Handled by data-i18n if active, or hidden)
        /*
        translateElements('#blog .section-label', t.blog?.label);
        translateElements('#blog .section-title', t.blog?.title);
        translateElements('.blog__posts .blog__section-title', t.blog?.articles_title, { keepIcon: true });
        translateElements('.blog__coming-badge', t.blog?.coming_soon);
        translateElements('.blog__coming-soon > p:first-of-type', t.blog?.coming_soon_text);
        translateElements('.blog__cta-hint', t.blog?.follow_cta, { asHTML: true });
        translateElements('.blog__github .blog__section-title', t.blog?.github_title, { keepIcon: true });
        translateElements('.blog__wakatime .blog__section-title', t.blog?.wakatime_title, { keepIcon: true });
        */


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

        // Update credential badges (Handled by data-i18n now)
        // updateCredentialBadges(t.credentials?.in_progress);

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
     * Update credential "in progress" badges (Handled by data-i18n now)
     */
    /*
    function updateCredentialBadges(text) {
        if (!text) return;
        document.querySelectorAll('.credential-badge').forEach(badge => {
            badge.textContent = text;
        });
    }
    */



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
     * Translate elements matching selector
     * @param {string} selector - CSS selector
     * @param {string} text - Text to apply
     * @param {object} options - Additional options
     */
    function translateElements(selector, text, options = {}) {
        if (!text && !options['data-words']) return;

        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (options.keepIcon) {
                // Keep SVG icons, only replace text
                const svg = el.querySelector('svg');
                if (svg) {
                    el.innerHTML = text + ' ';
                    el.appendChild(svg);
                } else {
                    el.textContent = text;
                }
            } else if (options['data-words']) {
                el.setAttribute('data-words', options['data-words']);
            } else if (options.asHTML) {
                el.innerHTML = text;
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

    // Expose for debugging
    // Expose for debugging
    window.i18n = { setLang: (lang) => { currentLang = lang; updateLanguage(lang); } };


    /**
     * Resolve nested object path string (e.g. 'footer.rights')
     */
    function resolveKey(obj, key) {
        return key.split('.').reduce((acc, part) => acc && acc[part], obj);
    }
})();

