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
     * Fetches content from JSON file and populates the page
     */
    async function loadContent() {
        try {
            const response = await fetch(CONTENT_URL);
            if (!response.ok) {
                console.warn('Content JSON not found, using fallback HTML content.');
                return;
            }

            const data = await response.json();

            // Load credentials
            if (data.certifications) {
                populateCredentials(data.certifications);
            }

            // Load testimonials
            if (data.testimonials) {
                populateTestimonials(data.testimonials);
            }

            // Load contact info
            if (data.contact) {
                populateContact(data.contact);
            }

            // Load education/degree info
            if (data.education) {
                populateEducation(data.education);
            }

            console.log('✓ Content loaded from JSON');

        } catch (error) {
            console.warn('Could not load content.json:', error.message);
        }
    }


    /**
     * Populates credentials list from JSON data
     * @param {Array} credentials - Array of credential objects
     */
    function populateCredentials(credentials) {
        const container = document.getElementById('credentialsList');
        if (!container || credentials.length === 0) return;

        // Clear existing content
        container.innerHTML = '';

        // Logo paths map
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

            // Build badge HTML
            const badgeHTML = isInProgress ? '<span class="credential-badge" data-i18n="credentials.in_progress">Em andamento</span>' : '';


            // Hours badge (if available)
            const hoursHTML = cred.hours ? `<span class="credential-hours">${cred.hours}</span>` : '';

            // Logo HTML (if available)
            const logoSrc = logoMap[cred.logo] || '';
            const logoHTML = logoSrc ? `<img src="${logoSrc}" alt="${cred.institution}" class="credential-logo-img">` : '';

            li.innerHTML = `
                <a href="${cred.credentialUrl}" target="_blank" rel="noopener noreferrer" class="${linkClasses}">
                    ${logoHTML}
                    <div class="credential-info">
                        <span class="credential-title">${cred.title} ${badgeHTML}</span>
                        <span class="credential-institution">${cred.institution} ${hoursHTML}</span>
                    </div>
                    <svg class="credential-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            `;

            container.appendChild(li);
        });
    }



    /**
     * Populates testimonials from JSON data
     * @param {Array} testimonials - Array of testimonial objects
     */
    function populateTestimonials(testimonials) {
        const container = document.querySelector('.testimonials__grid');
        if (!container || testimonials.length === 0) return;

        // For now, we only handle the first testimonial (single card design)
        // Expand this if you add more testimonials
        const t = testimonials[0];

        const nameEl = container.querySelector('.testimonial-card__name');
        const roleEl = container.querySelector('.testimonial-card__role');
        const textEl = container.querySelector('.testimonial-card__text');
        const avatarEl = container.querySelector('.testimonial-card__avatar--photo');

        if (nameEl) nameEl.textContent = t.authorName;
        if (roleEl) roleEl.textContent = t.authorRole;
        if (textEl) textEl.textContent = `"${t.text}"`;

        // Handle photo vs initial
        if (avatarEl) {
            if (t.authorPhoto && t.authorPhoto.trim() !== '') {
                // Has photo - add image
                avatarEl.innerHTML = `<img src="${t.authorPhoto}" alt="${t.authorName}" class="avatar-image">`;
            } else {
                // No photo - show initial
                avatarEl.innerHTML = `<span class="avatar-initial">${t.authorInitial || t.authorName.charAt(0)}</span>`;
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
            titleEl.textContent = contact.sectionTitle;
        }

        if (subtitleEl && contact.sectionSubtitle) {
            subtitleEl.textContent = contact.sectionSubtitle;
        }
    }

    /**
     * Populates education/degree section from JSON data
     * @param {Object} education - Education configuration object
     */
    function populateEducation(education) {
        const { currentSemester, totalSemesters, expectedYear, subjects } = education;

        // Calculate progress percentage
        const progressPercent = Math.round((currentSemester / totalSemesters) * 100);

        // Update progress bar
        const progressBar = document.querySelector('.education__progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Update progress label (will be translated by i18n)
        const progressLabel = document.querySelector('.education__progress-label');
        if (progressLabel) {
            progressLabel.setAttribute('data-progress', progressPercent);
        }

        // Update semester display
        const semesterEl = document.querySelector('.education__detail-item:nth-child(2) span');
        if (semesterEl) {
            semesterEl.setAttribute('data-semester', currentSemester);
        }

        // Update subjects tags
        const tagsContainer = document.querySelector('.education__tags');
        if (tagsContainer && subjects && subjects.length > 0) {
            tagsContainer.innerHTML = subjects.map(subject =>
                `<span class="education__tag">${subject}</span>`
            ).join('');
        }

        console.log(`✓ Education: ${currentSemester}/${totalSemesters} (${progressPercent}%)`);
    }


    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadContent);
    } else {
        loadContent();
    }

})();
