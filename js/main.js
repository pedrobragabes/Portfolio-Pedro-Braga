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

    // Project case study data (Moved to top for better organization)
    const caseStudies = {
        'JoysticKnights': {
            tag: 'Portal de Notícias',
            title: 'JoysticKnights',
            problem: 'O site anterior tinha tempo de carregamento lento (>5s) e péssimo SEO, resultando em baixo tráfego orgânico e alta taxa de rejeição.',
            solution: 'Implementei arquitetura WordPress otimizada com lazy loading de imagens, cache estratégico com WP Rocket, e CDN. Reestruturei o HTML semântico para melhorar o SEO técnico.',
            result: 'Tempo de carregamento reduzido em 60% (de 5s para 2s). Melhoria significativa no Core Web Vitals e aumento no tráfego orgânico.'
        },
        'AquaFlora AgroShop': {
            tag: 'E-commerce',
            title: 'AquaFlora AgroShop',
            problem: 'Gestão de múltiplos canais com 3000+ produtos gerava gargalos operacionais: controle de estoque manual arriscado, perda de vendas por falta de agilidade e atendimento descentralizado.',
            solution: 'Liderança técnica na criação de um ecossistema digital completo. Orquestração de stack WordPress/WooCommerce de alta performance. Desenvolvimento de aplicação web interna para gestão de estoque mobile (scanner de código de barras) e arquitetura de automação de atendimento via IA com Node.js + whatsapp-web.js.',
            result: 'Redução de 80% no SLA de resposta ao cliente com automação. Atualização de estoque em tempo real eliminando rupturas. Scripts Python/JS para importação massiva economizaram centenas de horas de trabalho manual.',
            images: [
                'assets/AquaFlora/AquaFlora Home.webp',
                'assets/AquaFlora/AquaFlora Loja.webp',
                'assets/AquaFlora/Estoque AquaFlora.webp'
            ]
        },
        'Kingdom of Aen': {
            tag: 'Game Development',
            title: 'Kingdom of Aen',
            problem: 'Projeto pessoal para aprender JavaScript avançado: criar um jogo de cartas completo com IA adversária e persistência de estado.',
            solution: 'Engine desenvolvida em JavaScript puro sem frameworks. Sistema de turnos, IA com diferentes níveis de dificuldade, e salvamento local usando localStorage.',
            result: '2000+ linhas de lógica de jogo bem estruturada. Projeto de portfólio que demonstra capacidade de resolver problemas complexos.'
        },
        'Home Lab & Hardware': {
            tag: 'Infraestrutura',
            title: 'Home Lab & Hardware',
            problem: 'Necessidade de hospedar múltiplos serviços pessoais e de negócio (AquaFlora) sem custos recorrentes de cloud.',
            solution: 'Montei servidor físico com Proxmox VE rodando 15+ containers e VMs. Implementei VPN, DNS interno, monitoramento com Grafana, e backup automatizado.',
            result: 'Uptime de 99.9% ao longo do ano. Economia mensal vs cloud estimada em R$500+. Infraestrutura escalável para novos projetos.'
        }
    };

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
        localStorage.setItem('theme', theme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('dark');
        }
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
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                ticking = true;
            });
            ticking = false;
        }
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                form.classList.remove('submitting');

                if (response.ok) {
                    // Success feedback
                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-success';
                    successDiv.textContent = '✓ Mensagem enviada com sucesso!';
                    form.appendChild(successDiv);
                    form.reset();
                    submitBtn.textContent = originalText;
                } else {
                    throw new Error('Erro no envio');
                }
            } catch (error) {
                form.classList.remove('submitting');
                submitBtn.textContent = originalText;

                // Error feedback
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error';
                errorDiv.textContent = '✗ Erro ao enviar. Tente novamente.';
                form.appendChild(errorDiv);
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

    // Case Studies Data moved to top of file

    function openModal(projectName) {
        const data = caseStudies[projectName];
        if (data && modal) {
            document.getElementById('modalTag').textContent = data.tag;
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalProblem').textContent = data.problem;
            document.getElementById('modalSolution').textContent = data.solution;
            document.getElementById('modalResult').textContent = data.result;

            // Gallery Logic
            const galleryContainer = document.getElementById('modalImages');
            if (galleryContainer) {
                galleryContainer.innerHTML = ''; // Clear existing images

                if (data.images && data.images.length > 0) {
                    data.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = imgSrc;
                        img.alt = `${data.title} Screenshot`;
                        img.className = 'modal__image';
                        img.loading = 'lazy';
                        img.onclick = () => openLightbox(imgSrc); // Add click to zoom
                        galleryContainer.appendChild(img);
                    });
                } else {
                    // Fallback or empty state if no images
                    const placeholder = document.createElement('div');
                    placeholder.className = 'modal__image-placeholder';
                    placeholder.textContent = 'Galeria em breve';
                    galleryContainer.appendChild(placeholder);
                }
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
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
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const title = card.querySelector('.project-card__title').textContent;
            openModal(title);
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

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(e => console.log('Video play error:', e));
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

})();

// ==========================================================================
// 13. PROJECT VIDEO HOVER
// ==========================================================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const video = card.querySelector('video');
    if (video) {
        card.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log('Video play error:', e));
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});

