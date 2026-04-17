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

    const caseStudies = {
        'aquaflora-agroshop': {
            title: 'AquaFlora AgroShop',
            tag: 'E-commerce',
            problem: 'A operacao tinha gargalos de estoque e atendimento em momentos de pico. O time precisava reduzir friccao na jornada de compra sem perder controle de catalogo.',
            solution: 'Foi estruturado um ecossistema integrado com WooCommerce, automacoes e fluxos de atendimento. O projeto uniu melhorias de performance, organizacao operacional e comunicacao mais rapida com clientes.',
            result: 'O ciclo comercial ficou mais enxuto, com resposta mais rapida e operacao mais previsivel para escalar catalogo e campanhas.',
            metrics: [
                { label: 'Tempo de resposta', value: '-90%' },
                { label: 'Produtos gerenciados', value: '3000+' },
                { label: 'Ganho operacional', value: '100h+/mes' }
            ],
            images: [
                'assets/AquaFlora/AquaFlora Home.webp',
                'assets/AquaFlora/AquaFlora Loja.webp',
                'assets/AquaFlora/Estoque AquaFlora.webp'
            ],
            videos: [
                {
                    type: 'external',
                    title: 'Visitar a loja em producao',
                    url: 'https://aquafloragroshop.com.br/'
                }
            ],
            links: {
                live: 'https://aquafloragroshop.com.br/',
                repo: '',
                demo: '',
                blog: ''
            }
        },
        comerciobes: {
            title: 'ComercioBes',
            tag: 'Vitrine Local',
            problem: 'Comercios locais tinham baixa visibilidade digital e pouca conversao de descoberta para contato.',
            solution: 'A proposta priorizou navegacao mobile-first, blocos de oferta diretos e estrutura de conteudo orientada a descoberta local.',
            result: 'A base ficou pronta para captacao de leads com foco regional e evolucao gradual para um portal comercial mais robusto.',
            metrics: [
                { label: 'Foco principal', value: 'Leads locais' },
                { label: 'Experiencia', value: 'Mobile-first' },
                { label: 'Status', value: 'Em evolucao' }
            ],
            images: [],
            videos: [
                {
                    type: 'external',
                    title: 'Visao geral do conceito',
                    url: '/#projects'
                }
            ],
            links: {
                live: '',
                repo: '',
                demo: '',
                blog: ''
            }
        },
        'florescer-garden': {
            title: 'Florescer Garden',
            tag: 'E-commerce Agricultura',
            problem: 'Era necessario organizar uma vitrine digital com narrativa clara de valor para transformar interesse em contato comercial.',
            solution: 'O projeto foi desenhado com layout orientado a conversao, categorizacao de produtos e CTA estrategicos para acelerar a tomada de decisao.',
            result: 'A estrutura permite validar oferta com mais consistencia e preparar terreno para crescimento com dados reais de comportamento.',
            metrics: [
                { label: 'Objetivo', value: 'Conversao' },
                { label: 'Canal', value: 'Catalogo digital' },
                { label: 'Status', value: 'Em tracao' }
            ],
            images: [
                'assets/FlorescerGarden/fachada.png',
                'assets/FlorescerGarden/Produtos.png',
                'assets/FlorescerGarden/Carrinho.png'
            ],
            videos: [
                {
                    type: 'external',
                    title: 'Visao geral da proposta',
                    url: '/#projects'
                }
            ],
            links: {
                live: '',
                repo: '',
                demo: '',
                blog: ''
            }
        },
        joysticknights: {
            title: 'JoysticKnights',
            tag: 'Portal de Noticias',
            problem: 'O portal precisava melhorar velocidade e estrutura tecnica para competir em SEO sem sacrificar experiencia de leitura.',
            solution: 'A stack foi otimizada com foco em carregamento, organizacao de conteudo e ajustes tecnicos para indexacao mais eficiente.',
            result: 'O projeto ganhou mais consistencia de performance e melhor base para crescimento organico de audiencia.',
            metrics: [
                { label: 'Tempo de carregamento', value: '-60%' },
                { label: 'SEO tecnico', value: 'Otimizado' },
                { label: 'Plataforma', value: 'WordPress' }
            ],
            images: [
                'assets/JoysticKnights/fachada.webp',
                'assets/JoysticKnights/1.webp'
            ],
            videos: [
                {
                    type: 'external',
                    title: 'Portal online',
                    url: 'https://joysticknights.com.br/'
                }
            ],
            links: {
                live: 'https://joysticknights.com.br/',
                repo: '',
                demo: '',
                blog: ''
            }
        },
        'home-lab-hardware': {
            title: 'Home Lab & Hardware',
            tag: 'Infraestrutura',
            problem: 'Manter varios servicos pessoais e de produto com estabilidade exige arquitetura previsivel, observabilidade e boas rotinas operacionais.',
            solution: 'Foi consolidado um ambiente Proxmox com containers e servicos de apoio para automacao, testes e operacao diaria.',
            result: 'A infraestrutura hoje acelera validacao de ideias e reduz dependencia de servicos externos para tarefas criticas.',
            metrics: [
                { label: 'Servicos ativos', value: '15+' },
                { label: 'Foco', value: 'Infra produtiva' },
                { label: 'Beneficio', value: 'Autonomia tecnica' }
            ],
            images: [],
            videos: [
                {
                    type: 'external',
                    title: 'Guia pratico completo',
                    url: '/blog/homelab-proxmox-guia-pratico/'
                }
            ],
            links: {
                live: '/blog/homelab-proxmox-guia-pratico/',
                repo: '',
                demo: '',
                blog: '/blog/homelab-proxmox-guia-pratico/'
            }
        },
        'kingdom-of-aen': {
            title: 'Kingdom of Aen',
            tag: 'Game Development',
            problem: 'Era preciso construir uma base de logica de jogo consistente para turnos, regras e progressao sem depender de frameworks.',
            solution: 'A engine foi implementada em JavaScript puro com separacao de responsabilidades e persistencia de estado local.',
            result: 'Projeto tecnico de referencia para portfolio, demonstrando arquitetura de regras e dominio de logica front-end.',
            metrics: [
                { label: 'Logica implementada', value: '2000+ linhas' },
                { label: 'Stack', value: 'JS/HTML/CSS' },
                { label: 'Estado', value: 'Persistente' }
            ],
            images: [],
            videos: [
                {
                    type: 'external',
                    title: 'Repositorio do projeto',
                    url: 'https://github.com/pedrobragabes/Kingdom-of-Aen'
                }
            ],
            links: {
                live: '',
                repo: 'https://github.com/pedrobragabes/Kingdom-of-Aen',
                demo: '',
                blog: ''
            }
        }
    };

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

    async function submitContactForm(actionEndpoint, formData) {
        const response = await fetch(actionEndpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        const result = await response.json().catch(() => null);
        return response.ok && (result?.success === true || result?.success === 'true');
    }

    function getContactFormMessages() {
        const lang = (document.documentElement.lang || 'pt').toLowerCase();
        const isEnglish = lang.startsWith('en');

        if (isEnglish) {
            return {
                sending: 'Sending...',
                success: 'Message sent successfully. I will get back to you soon.',
                error: 'Could not send right now. Please try again in a few minutes.',
                invalid: 'Please fill in all required fields before sending.'
            };
        }

        return {
            sending: 'Enviando...',
            success: 'Mensagem enviada com sucesso. Retorno em breve.',
            error: 'Nao foi possivel enviar agora. Tente novamente em alguns minutos.',
            invalid: 'Preencha todos os campos obrigatorios antes de enviar.'
        };
    }

    function renderContactFeedback(feedbackContainer, statusClass, message) {
        if (!feedbackContainer) {
            return;
        }

        feedbackContainer.innerHTML = '';
        if (!message) {
            return;
        }

        const feedback = document.createElement('div');
        feedback.className = statusClass;
        feedback.textContent = message;
        feedbackContainer.appendChild(feedback);
    }

    const contactForm = document.querySelector('.contact__form');

    if (contactForm) {
        const feedbackContainer = contactForm.querySelector('.contact__feedback');

        // Remove invalid state as soon as user starts fixing each field
        const fields = contactForm.querySelectorAll('.contact__input, .contact__textarea, .contact__select');
        fields.forEach(field => {
            const eventName = field.tagName === 'SELECT' ? 'change' : 'input';
            field.addEventListener(eventName, () => {
                field.classList.remove('invalid');
            });
            field.addEventListener('blur', () => {
                if (!field.hasAttribute('required')) {
                    return;
                }

                const fieldValue = typeof field.value === 'string' ? field.value.trim() : field.value;
                field.classList.toggle('invalid', !fieldValue);
            });
        });

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const submitBtn = form.querySelector('.contact__submit');
            const originalText = submitBtn.textContent;
            const messages = getContactFormMessages();

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                const fieldValue = typeof field.value === 'string' ? field.value.trim() : field.value;
                const hasValue = Boolean(fieldValue);
                field.classList.toggle('invalid', !hasValue);
                if (!hasValue) {
                    field.classList.add('invalid');
                    isValid = false;
                }
            });

            if (!isValid) {
                renderContactFeedback(feedbackContainer, 'form-error', messages.invalid);
                form.querySelector('.invalid')?.focus();
                return;
            }

            renderContactFeedback(feedbackContainer, '', '');

            form.classList.add('submitting');
            form.setAttribute('aria-busy', 'true');
            submitBtn.disabled = true;
            submitBtn.textContent = messages.sending;

            try {
                const formData = new FormData(form);
                if (!formData.get('_replyto') && formData.get('email')) {
                    formData.append('_replyto', formData.get('email'));
                }

                const actionEndpoint = (form.action || '').trim();
                const isSuccess = actionEndpoint ? await submitContactForm(actionEndpoint, formData) : false;

                if (isSuccess) {
                    renderContactFeedback(feedbackContainer, 'form-success', messages.success);
                    form.reset();
                    requiredFields.forEach(field => field.classList.remove('invalid'));
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                renderContactFeedback(feedbackContainer, 'form-error', messages.error);
            } finally {
                form.classList.remove('submitting');
                form.removeAttribute('aria-busy');
                submitBtn.disabled = false;
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
    const modalContent = modal ? modal.querySelector('.modal__content') : null;
    let lastFocusedElement = null;

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
            { key: 'demo', label: 'Demo interativa' },
            { key: 'blog', label: 'Post relacionado' }
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

        lastFocusedElement = document.activeElement;

        document.getElementById('modalTag').textContent = data.tag || 'Projeto';
        document.getElementById('modalTitle').textContent = data.title || 'Detalhes do projeto';
        document.getElementById('modalProblem').textContent = data.problem || 'Contexto em atualizacao.';
        document.getElementById('modalSolution').textContent = data.solution || 'Implementacao em atualizacao.';
        document.getElementById('modalResult').textContent = data.result || 'Impacto em atualizacao.';
        renderModalMetrics(data.metrics);
        renderModalVideos(data.videos);
        renderModalLinks(data.links);
        renderModalGallery(data.images, data.title);

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            if (modalClose) {
                modalClose.focus();
                return;
            }

            if (modalContent) {
                modalContent.focus();
            }
        });
    }

    function getModalFocusableElements() {
        if (!modal) {
            return [];
        }

        return [...modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')]
            .filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
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

    function closeModal(options = {}) {
        const shouldRestoreFocus = options.restoreFocus !== false;

        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (shouldRestoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }

        lastFocusedElement = null;
    }

    function activateProjectCard(card, event) {
        if (!card) {
            return;
        }

        const projectId = card.dataset.project;
        const fallbackTitle = card.querySelector('.project-card__title')?.textContent.trim();
        const projectKey = projectId || fallbackTitle;

        if (caseStudies[projectKey]) {
            if (event) {
                event.preventDefault();
            }
            openModal(projectKey);
            return;
        }

        const liveButton = card.querySelector('[data-project-link="live"]');
        const liveUrl = liveButton ? liveButton.getAttribute('href') : '';

        if (!isValidProjectUrl(liveUrl)) {
            if (event) {
                event.preventDefault();
            }
            return;
        }

        if (event) {
            event.preventDefault();
        }

        const normalizedUrl = liveUrl.trim();
        if (/^https?:\/\//i.test(normalizedUrl)) {
            window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.location.assign(normalizedUrl);
        }
    }

    projectCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('.project-card__btn')) {
                return;
            }

            activateProjectCard(card, event);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            if (event.target.closest('.project-card__btn')) {
                return;
            }

            event.preventDefault();
            activateProjectCard(card, event);
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

    // Keyboard support: modal focus trap + Escape close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal && modal.classList.contains('active')) {
            const focusableElements = getModalFocusableElements();
            if (focusableElements.length === 0) {
                e.preventDefault();
                modalContent?.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }

        if (e.key === 'Escape') {
            if (lightbox && lightbox.classList.contains('active')) {
                closeLightbox();
            }

            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
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

