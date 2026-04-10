/**
 * Portfolio - Pedro Braga
 * Main JavaScript
 * 
 * Modules:
 * 1. Header scroll behavior
 * 2. Mobile navigation
 * 3. Scroll reveal animations
 * 4. Active navigation highlighting
 * 5. Smooth scrolling
 * 6. Scroll progress indicator
 * 7. Button ripple effects
 */

(function () {
    'use strict';

    // Cache DOM elements
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id]');
    const scrollProgress = document.getElementById('scrollProgress');
    const projectCards = document.querySelectorAll('.project-card');

    const caseStudies = {};

    function isValidProjectUrl(url) {
        return typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';
    }

    function applyProjectLink(button, url) {
        if (!button) {
            return;
        }

        if (!isValidProjectUrl(url)) {
            button.removeAttribute('href');
            button.classList.add('is-disabled');
            button.setAttribute('aria-disabled', 'true');
            button.setAttribute('tabindex', '-1');
            button.removeAttribute('target');
            button.removeAttribute('rel');
            return;
        }

        const normalizedUrl = url.trim();
        button.setAttribute('href', normalizedUrl);
        button.classList.remove('is-disabled');
        button.removeAttribute('aria-disabled');
        button.removeAttribute('tabindex');

        if (/^https?:\/\//i.test(normalizedUrl)) {
            button.setAttribute('target', '_blank');
            button.setAttribute('rel', 'noopener noreferrer');
        } else {
            button.removeAttribute('target');
            button.removeAttribute('rel');
        }
    }

    function initializeProjectLinksFromMarkup() {
        projectCards.forEach((card) => {
            const liveButton = card.querySelector('[data-project-link="live"]');
            const repoButton = card.querySelector('[data-project-link="repo"]');

            [liveButton, repoButton].forEach((button) => {
                if (!button) {
                    return;
                }

                const initialHref = button.getAttribute('href');
                if (isValidProjectUrl(initialHref)) {
                    applyProjectLink(button, initialHref);
                    return;
                }

                applyProjectLink(button, '');
            });
        });
    }

    initializeProjectLinksFromMarkup();

    // Helper: Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // ==========================================================================
    // 1. HEADER SCROLL BEHAVIOR
    // ==========================================================================

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', throttle(handleHeaderScroll, 100));

    // ==========================================================================
    // 1.5. THEME TOGGLE (Dark Mode)
    // ==========================================================================

    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.backgroundColor = theme === 'dark' ? '#121212' : '#F5F0E8';
        localStorage.setItem('theme', theme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            return;
        }

        // Default respects system preference to avoid unexpected flash
        const systemPrefersDark = prefersDark.matches ? 'dark' : 'light';
        setTheme(systemPrefersDark);
    }

    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ==========================================================================
    // 1.6. PARALLAX EFFECTS
    // ==========================================================================

    const heroPhoto = document.querySelector('.hero__photo-wrapper');
    const heroContent = document.querySelector('.hero__content');

    function handleParallax() {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        if (scrollY < heroHeight) {
            const parallaxOffset = scrollY * 0.3;
            const opacity = 1 - (scrollY / heroHeight) * 0.5;

            if (heroPhoto) {
                heroPhoto.style.transform = `translateY(${parallaxOffset * 0.5}px) scale(${1 - scrollY * 0.0003})`;
            }
            if (heroContent) {
                heroContent.style.transform = `translateY(${parallaxOffset}px)`;
                heroContent.style.opacity = opacity;
            }
        }
    }

    // Use requestAnimationFrame for smooth parallax
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            handleParallax();
            ticking = false;
        });
    }, { passive: true });

    // ==========================================================================
    // 2. MOBILE NAVIGATION
    // ==========================================================================

    function toggleMobileMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    }

    function closeMobileMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
    }

    menuToggle.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    // ==========================================================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================================================

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 4. ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================================================

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(highlightNavOnScroll, 100));

    // ==========================================================================
    // 5. SMOOTH SCROLLING
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') {
                return;
            }

            const target = document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            if (this.classList.contains('skip-link')) {
                e.preventDefault();
                target.focus({ preventScroll: true });
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
                return;
            }

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // ==========================================================================
    // 6. SCROLL PROGRESS INDICATOR
    // ==========================================================================

    function updateScrollProgress() {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
            scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
        }
    }

    window.addEventListener('scroll', throttle(updateScrollProgress, 50));

    // ==========================================================================
    // 7. BUTTON RIPPLE EFFECTS
    // ==========================================================================

    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');

        // Remove existing ripple
        const existingRipple = button.getElementsByClassName('ripple')[0];
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);
    }

    document.querySelectorAll('.hero__cta, .contact__submit, .project-card__btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ==========================================================================
    // 8. CONTACT FORM HANDLING
    // ==========================================================================

    function formDataToJson(formData) {
        const payload = {};

        formData.forEach((value, key) => {
            if (typeof value === 'string') {
                payload[key] = value;
            }
        });

        return payload;
    }

    async function submitContactToApi(apiEndpoint, formData) {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formDataToJson(formData))
        });

        const result = await response.json().catch(() => null);
        return response.ok && (result?.success === true || result?.success === 'true');
    }

    async function submitContactToFallback(fallbackEndpoint, formData) {
        const response = await fetch(fallbackEndpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        const result = await response.json().catch(() => null);
        return response.ok && (result?.success === true || result?.success === 'true');
    }

    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        // Add input event listeners to remove invalid state on typing
        const inputs = contactForm.querySelectorAll('.contact__input, .contact__textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
            });
        });

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const submitBtn = form.querySelector('.contact__submit');
            const originalText = submitBtn.textContent;

            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                }
            });

            if (!isValid) {
                // Focus first invalid field
                form.querySelector('.invalid')?.focus();
                return;
            }

            // Remove previous feedback
            const existingFeedback = form.querySelector('.form-success, .form-error');
            if (existingFeedback) existingFeedback.remove();

            // Show loading state
            form.classList.add('submitting');
            submitBtn.textContent = 'Enviando...';

            try {
                const formData = new FormData(form);
                if (!formData.get('_replyto') && formData.get('email')) {
                    formData.append('_replyto', formData.get('email'));
                }
                const apiEndpoint = (form.dataset.apiAction || '').trim();
                const fallbackEndpoint = (form.dataset.fallbackAction || form.action || '').trim();
                const shouldTryApi = apiEndpoint
                    && !(window.location.protocol === 'file:' && apiEndpoint.startsWith('/'));

                let isSuccess = false;

                if (shouldTryApi) {
                    try {
                        isSuccess = await submitContactToApi(apiEndpoint, formData);
                    } catch (apiError) {
                        console.warn('Falha ao enviar para API interna, tentando fallback.', apiError);
                    }
                }

                if (!isSuccess && fallbackEndpoint) {
                    isSuccess = await submitContactToFallback(fallbackEndpoint, formData);
                }

                if (isSuccess) {
                    // Success feedback
                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-success';
                    successDiv.textContent = '✓ Mensagem enviada com sucesso!';
                    form.appendChild(successDiv);
                    form.reset();
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                // Error feedback
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = '✗ Erro ao enviar. Tente novamente.';
                form.appendChild(errorDiv);
            } finally {
                form.classList.remove('submitting');
                submitBtn.textContent = originalText;
            }
        });
    }

    // ==========================================================================
    // 9. ANIMATED COUNTERS
    // ==========================================================================

    const counters = document.querySelectorAll('.stats__number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Trigger counters when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ==========================================================================
    // 10. CASE STUDY MODAL
    // ==========================================================================

    const modal = document.getElementById('caseStudyModal');
    const modalClose = document.getElementById('modalClose');
    const caseStudyButtons = document.querySelectorAll('.project-card__cta');

    function clearChildren(element) {
        if (!element) {
            return;
        }

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function createModalEmptyState(text) {
        const state = document.createElement('div');
        state.className = 'modal__empty';
        state.textContent = text;
        return state;
    }

    function renderModalMetrics(metrics) {
        const metricsContainer = document.getElementById('modalMetrics');
        clearChildren(metricsContainer);

        if (!metricsContainer) {
            return;
        }

        if (!Array.isArray(metrics) || metrics.length === 0) {
            metricsContainer.appendChild(createModalEmptyState('Metricas detalhadas em breve.'));
            return;
        }

        metrics.forEach((metric) => {
            const metricCard = document.createElement('article');
            metricCard.className = 'modal__metric';

            const value = document.createElement('strong');
            value.className = 'modal__metric-value';
            value.textContent = metric.value || '--';

            const label = document.createElement('span');
            label.className = 'modal__metric-label';
            label.textContent = metric.label || 'Metrica';

            metricCard.appendChild(value);
            metricCard.appendChild(label);
            metricsContainer.appendChild(metricCard);
        });
    }

    function renderModalVideos(videos) {
        const videosContainer = document.getElementById('modalVideos');
        clearChildren(videosContainer);

        if (!videosContainer) {
            return;
        }

        if (!Array.isArray(videos) || videos.length === 0) {
            videosContainer.appendChild(createModalEmptyState('Video de demonstracao em breve.'));
            return;
        }

        videos.forEach((videoData) => {
            const card = document.createElement('article');
            card.className = 'modal__video-card';

            const title = document.createElement('h4');
            title.className = 'modal__video-title';
            title.textContent = videoData.title || 'Demonstracao';
            card.appendChild(title);

            if (videoData.type === 'embed' && isValidProjectUrl(videoData.url)) {
                const iframe = document.createElement('iframe');
                iframe.className = 'modal__video-embed';
                iframe.src = videoData.url;
                iframe.title = videoData.title || 'Video de demonstracao';
                iframe.loading = 'lazy';
                iframe.allowFullscreen = true;
                card.appendChild(iframe);
            } else if (videoData.type === 'mp4' && isValidProjectUrl(videoData.url)) {
                const video = document.createElement('video');
                video.className = 'modal__video-player';
                video.controls = true;
                video.preload = 'metadata';
                video.src = videoData.url;
                if (isValidProjectUrl(videoData.poster)) {
                    video.poster = videoData.poster;
                }
                card.appendChild(video);
            } else if (isValidProjectUrl(videoData.url)) {
                const link = document.createElement('a');
                link.className = 'modal__video-link';
                const normalizedUrl = videoData.url.trim();
                link.href = normalizedUrl;
                if (/^https?:\/\//i.test(normalizedUrl)) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
                link.textContent = 'Abrir demonstracao';
                card.appendChild(link);
            } else {
                card.appendChild(createModalEmptyState('Demonstracao indisponivel no momento.'));
            }

            videosContainer.appendChild(card);
        });
    }

    function renderModalLinks(links) {
        const linksContainer = document.getElementById('modalLinks');
        clearChildren(linksContainer);

        if (!linksContainer) {
            return;
        }

        const entries = [
            { key: 'live', label: 'Site ao vivo' },
            { key: 'repo', label: 'Repositorio' },
            { key: 'demo', label: 'Demo' }
        ];

        const availableLinks = entries.filter((entry) => isValidProjectUrl(links && links[entry.key]));

        if (availableLinks.length === 0) {
            linksContainer.appendChild(createModalEmptyState('Links publicos em breve.'));
            return;
        }

        availableLinks.forEach((entry) => {
            const anchor = document.createElement('a');
            anchor.className = 'modal__action-link';
            const normalizedUrl = links[entry.key].trim();
            anchor.href = normalizedUrl;
            if (/^https?:\/\//i.test(normalizedUrl)) {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }
            anchor.textContent = entry.label;
            linksContainer.appendChild(anchor);
        });
    }

    function renderModalGallery(images, title) {
        const galleryContainer = document.getElementById('modalImages');
        clearChildren(galleryContainer);

        if (!galleryContainer) {
            return;
        }

        if (!Array.isArray(images) || images.length === 0) {
            galleryContainer.appendChild(createModalEmptyState('Galeria em breve.'));
            return;
        }

        const gallery = document.createElement('div');
        gallery.className = 'modal__gallery';

        const mainButton = document.createElement('button');
        mainButton.type = 'button';
        mainButton.className = 'modal__gallery-main-btn';

        const mainImage = document.createElement('img');
        mainImage.className = 'modal__image';
        mainImage.loading = 'lazy';
        mainImage.alt = `${title} screenshot principal`;

        mainButton.appendChild(mainImage);
        gallery.appendChild(mainButton);

        const thumbs = document.createElement('div');
        thumbs.className = 'modal__thumbs';
        gallery.appendChild(thumbs);

        let activeSrc = images[0];

        const thumbButtons = images.map((src, index) => {
            const thumbButton = document.createElement('button');
            thumbButton.type = 'button';
            thumbButton.className = 'modal__thumb';

            const thumbImage = document.createElement('img');
            thumbImage.className = 'modal__thumb-image';
            thumbImage.src = src;
            thumbImage.alt = `${title} screenshot ${index + 1}`;
            thumbImage.loading = 'lazy';

            thumbButton.appendChild(thumbImage);
            thumbs.appendChild(thumbButton);
            return thumbButton;
        });

        function setActiveImage(index) {
            activeSrc = images[index];
            mainImage.src = activeSrc;
            mainImage.alt = `${title} screenshot ${index + 1}`;

            thumbButtons.forEach((button, buttonIndex) => {
                button.classList.toggle('is-active', buttonIndex === index);
            });
        }

        thumbButtons.forEach((button, index) => {
            button.addEventListener('click', () => setActiveImage(index));
        });

        mainButton.addEventListener('click', () => openLightbox(activeSrc));

        setActiveImage(0);
        galleryContainer.appendChild(gallery);
    }

    function openModal(projectKey) {
        const data = caseStudies[projectKey];
        if (!data || !modal) {
            return;
        }

        document.getElementById('modalTag').textContent = data.tag;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalProblem').textContent = data.problem;
        document.getElementById('modalSolution').textContent = data.solution;
        document.getElementById('modalResult').textContent = data.result;
        renderModalMetrics(data.metrics);
        renderModalVideos(data.videos);
        renderModalLinks(data.links);
        renderModalGallery(data.images, data.title);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // ==========================================================================
    // 10.5. LIGHTBOX
    // ==========================================================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Attach click handlers to case study buttons
    caseStudyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.project-card');
            if (!card) {
                return;
            }

            const projectId = card.dataset.project;
            const fallbackTitle = card.querySelector('.project-card__title')?.textContent.trim();
            const projectKey = projectId || fallbackTitle;

            if (caseStudies[projectKey]) {
                e.preventDefault();
                e.stopPropagation();
                openModal(projectKey);
                return;
            }

            const liveButton = card.querySelector('[data-project-link="live"]');
            const liveUrl = liveButton ? liveButton.getAttribute('href') : '';

            if (!isValidProjectUrl(liveUrl)) {
                e.preventDefault();
                return;
            }

            const normalizedUrl = liveUrl.trim();
            if (/^https?:\/\//i.test(normalizedUrl)) {
                window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
            } else {
                window.location.assign(normalizedUrl);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeLightbox();
        }
    });

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ==========================================================================
    // 9. LOGO SCROLL TO TOP
    // ==========================================================================

    const logoLink = document.querySelector('.logo');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ==========================================================================
    // 13. PROJECT VIDEO HOVER
    // ==========================================================================

    projectCards.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

})();

