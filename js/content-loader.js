/**
 * Content Loader Module
 * Loads dynamic content from data/content.json
 *
 * This module enables a "Mini-CMS" pattern where content
 * can be updated in a JSON file without touching HTML.
 */

(function () {
    'use strict';

    const CONTENT_URL = 'data/content.json';

    /**
     * Sanitize a string for safe use in text content
     */
    function sanitizeText(str) {
        if (typeof str !== 'string') return '';
        return str;
    }

    /**
     * Sanitize a URL - only allow http(s) and relative paths
     */
    function sanitizeUrl(url) {
        if (typeof url !== 'string') return '#';
        const trimmed = url.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('assets/')) {
            return trimmed;
        }
        return '#';
    }

    /**
     * Fetches content from JSON file and populates the page
     */
    async function loadContent() {
        try {
            const response = await fetch(CONTENT_URL);
            if (!response.ok) {
                return;
            }

            const data = await response.json();

            if (data.certifications) {
                populateCredentials(data.certifications);
            }

            if (data.testimonials) {
                populateTestimonials(data.testimonials);
            }

            if (data.contact) {
                populateContact(data.contact);
            }

            if (data.education) {
                populateEducation(data.education);
            }

        } catch (error) {
            // Silent fail - fallback HTML content remains
        }
    }


    /**
     * Populates credentials list from JSON data using safe DOM creation
     * @param {Array} credentials - Array of credential objects
     */
    function populateCredentials(credentials) {
        const container = document.getElementById('credentialsList');
        if (!container || credentials.length === 0) return;

        // Clear existing content safely
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Logo paths map (allowlist)
        const logoMap = {
            'alura': 'assets/icons/Alura.png',
            'efset': 'assets/icons/EF_SET_logo.svg'
        };

        credentials.forEach(cred => {
            const li = document.createElement('li');
            li.className = 'credential-item';

            const isInProgress = cred.status === 'in-progress';
            const isHighlight = cred.isHighlight === true;

            // Build class list
            let linkClasses = 'credential-link';
            if (isInProgress) linkClasses += ' credential-link--progress';
            if (isHighlight) linkClasses += ' credential-link--highlight';

            // Create link element
            const a = document.createElement('a');
            a.href = sanitizeUrl(cred.credentialUrl);
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = linkClasses;

            // Logo (only from allowlist)
            const logoSrc = logoMap[cred.logo];
            if (logoSrc) {
                const img = document.createElement('img');
                img.src = logoSrc;
                img.alt = sanitizeText(cred.institution);
                img.className = 'credential-logo-img';
                a.appendChild(img);
            }

            // Credential info container
            const infoDiv = document.createElement('div');
            infoDiv.className = 'credential-info';

            // Title
            const titleSpan = document.createElement('span');
            titleSpan.className = 'credential-title';
            titleSpan.textContent = sanitizeText(cred.title) + ' ';

            // Badge (in-progress)
            if (isInProgress) {
                const badge = document.createElement('span');
                badge.className = 'credential-badge';
                badge.setAttribute('data-i18n', 'credentials.in_progress');
                badge.textContent = 'Em andamento';
                titleSpan.appendChild(badge);
            }

            infoDiv.appendChild(titleSpan);

            // Institution + hours
            const instSpan = document.createElement('span');
            instSpan.className = 'credential-institution';
            instSpan.textContent = sanitizeText(cred.institution) + ' ';

            if (cred.hours) {
                const hoursSpan = document.createElement('span');
                hoursSpan.className = 'credential-hours';
                hoursSpan.textContent = sanitizeText(cred.hours);
                instSpan.appendChild(hoursSpan);
            }

            infoDiv.appendChild(instSpan);
            a.appendChild(infoDiv);

            // SVG icon (static, safe)
            const svgNS = 'http://www.w3.org/2000/svg';
            const svg = document.createElementNS(svgNS, 'svg');
            svg.setAttribute('class', 'credential-icon');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');

            const path = document.createElementNS(svgNS, 'path');
            path.setAttribute('d', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6');
            svg.appendChild(path);

            const polyline = document.createElementNS(svgNS, 'polyline');
            polyline.setAttribute('points', '15 3 21 3 21 9');
            svg.appendChild(polyline);

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', '10');
            line.setAttribute('y1', '14');
            line.setAttribute('x2', '21');
            line.setAttribute('y2', '3');
            svg.appendChild(line);

            a.appendChild(svg);
            li.appendChild(a);
            container.appendChild(li);
        });
    }



    /**
     * Populates testimonials from JSON data using safe DOM methods
     * @param {Array} testimonials - Array of testimonial objects
     */
    function populateTestimonials(testimonials) {
        const container = document.querySelector('.testimonials__grid');
        if (!container || testimonials.length === 0) return;

        const t = testimonials[0];

        const nameEl = container.querySelector('.testimonial-card__name');
        const roleEl = container.querySelector('.testimonial-card__role');
        const textEl = container.querySelector('.testimonial-card__text');
        const avatarEl = container.querySelector('.testimonial-card__avatar--photo');

        if (nameEl) nameEl.textContent = sanitizeText(t.authorName);
        if (roleEl) roleEl.textContent = sanitizeText(t.authorRole);
        if (textEl) textEl.textContent = `"${sanitizeText(t.text)}"`;

        // Handle photo vs initial - safe DOM creation
        if (avatarEl) {
            while (avatarEl.firstChild) {
                avatarEl.removeChild(avatarEl.firstChild);
            }

            if (t.authorPhoto && t.authorPhoto.trim() !== '') {
                const img = document.createElement('img');
                img.src = sanitizeUrl(t.authorPhoto);
                img.alt = sanitizeText(t.authorName);
                img.className = 'avatar-image';
                avatarEl.appendChild(img);
            } else {
                const span = document.createElement('span');
                span.className = 'avatar-initial';
                span.textContent = sanitizeText(t.authorInitial || t.authorName.charAt(0));
                avatarEl.appendChild(span);
            }
        }
    }

    /**
     * Populates contact section from JSON data
     * @param {Object} contact - Contact configuration object
     */
    function populateContact(contact) {
        const titleEl = document.querySelector('.contact .section-title');
        const subtitleEl = document.querySelector('.contact__subtitle');

        if (titleEl && contact.sectionTitle) {
            titleEl.textContent = sanitizeText(contact.sectionTitle);
        }

        if (subtitleEl && contact.sectionSubtitle) {
            subtitleEl.textContent = sanitizeText(contact.sectionSubtitle);
        }
    }

    /**
     * Populates education/degree section from JSON data using safe DOM methods
     * @param {Object} education - Education configuration object
     */
    function populateEducation(education) {
        const { currentSemester, totalSemesters, expectedYear, subjects } = education;

        const progressPercent = Math.round((currentSemester / totalSemesters) * 100);

        const progressBar = document.querySelector('.education__progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        const progressLabel = document.querySelector('.education__progress-label');
        if (progressLabel) {
            progressLabel.setAttribute('data-progress', progressPercent);
        }

        const semesterEl = document.querySelector('.education__detail-item:nth-child(2) span');
        if (semesterEl) {
            semesterEl.setAttribute('data-semester', currentSemester);
        }

        // Update subjects tags - safe DOM creation
        const tagsContainer = document.querySelector('.education__tags');
        if (tagsContainer && subjects && subjects.length > 0) {
            while (tagsContainer.firstChild) {
                tagsContainer.removeChild(tagsContainer.firstChild);
            }
            subjects.forEach(subject => {
                const span = document.createElement('span');
                span.className = 'education__tag';
                span.textContent = sanitizeText(subject);
                tagsContainer.appendChild(span);
            });
        }
    }


    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContent);
    } else {
        loadContent();
    }

})();
