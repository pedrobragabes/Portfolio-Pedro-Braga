(function () {
    'use strict';

    var CONTENT_PATH = '/data/content.json';
    var DRAFT_KEY = 'portfolio-admin-draft-v1';

    var contentData = {
        certifications: [],
        testimonials: []
    };

    var selectedCertificationIndex = 0;
    var selectedTestimonialIndex = 0;

    var refs = {
        statusMessage: document.getElementById('statusMessage'),

        repoOwner: document.getElementById('repoOwner'),
        repoName: document.getElementById('repoName'),
        repoBranch: document.getElementById('repoBranch'),
        workflowFile: document.getElementById('workflowFile'),
        githubToken: document.getElementById('githubToken'),
        commitMessage: document.getElementById('commitMessage'),

        reloadButton: document.getElementById('reloadButton'),
        downloadButton: document.getElementById('downloadButton'),
        copyButton: document.getElementById('copyButton'),
        publishButton: document.getElementById('publishButton'),
        publishDeployButton: document.getElementById('publishDeployButton'),
        deployOnlyButton: document.getElementById('deployOnlyButton'),

        certificationsList: document.getElementById('certificationsList'),
        testimonialsList: document.getElementById('testimonialsList'),

        addCertificationButton: document.getElementById('addCertificationButton'),
        deleteCertificationButton: document.getElementById('deleteCertificationButton'),
        addTestimonialButton: document.getElementById('addTestimonialButton'),
        deleteTestimonialButton: document.getElementById('deleteTestimonialButton'),

        certTitle: document.getElementById('certTitle'),
        certInstitution: document.getElementById('certInstitution'),
        certCredentialUrl: document.getElementById('certCredentialUrl'),
        certStatus: document.getElementById('certStatus'),
        certHours: document.getElementById('certHours'),
        certLogo: document.getElementById('certLogo'),
        certHighlight: document.getElementById('certHighlight'),

        testimonialText: document.getElementById('testimonialText'),
        testimonialAuthorName: document.getElementById('testimonialAuthorName'),
        testimonialAuthorRole: document.getElementById('testimonialAuthorRole'),
        testimonialAuthorPhoto: document.getElementById('testimonialAuthorPhoto'),
        testimonialAuthorInitial: document.getElementById('testimonialAuthorInitial'),

        previewCredentials: document.getElementById('previewCredentials'),
        previewTestimonials: document.getElementById('previewTestimonials')
    };

    function cloneDeep(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function sanitizeText(value) {
        if (typeof value !== 'string') {
            return '';
        }
        return value;
    }

    function buildPayload() {
        var payload = cloneDeep(contentData);

        if (!Array.isArray(payload.certifications)) {
            payload.certifications = [];
        }

        if (!Array.isArray(payload.testimonials)) {
            payload.testimonials = [];
        }

        return payload;
    }

    function buildJsonText() {
        return JSON.stringify(buildPayload(), null, 2) + '\n';
    }

    function setStatus(message, type) {
        refs.statusMessage.textContent = message;
        refs.statusMessage.dataset.type = type || 'info';
    }

    function saveDraft() {
        try {
            localStorage.setItem(DRAFT_KEY, buildJsonText());
        } catch (error) {
            setStatus('Alteracao aplicada, mas nao foi possivel salvar rascunho local.', 'warning');
        }
    }

    function loadDraftIfPresent() {
        try {
            var raw = localStorage.getItem(DRAFT_KEY);
            if (!raw) {
                return false;
            }

            var parsed = JSON.parse(raw);
            if (!parsed || !Array.isArray(parsed.certifications) || !Array.isArray(parsed.testimonials)) {
                return false;
            }

            contentData = parsed;
            setStatus('Rascunho local carregado automaticamente.', 'info');
            return true;
        } catch (error) {
            return false;
        }
    }

    function clearDraft() {
        try {
            localStorage.removeItem(DRAFT_KEY);
        } catch (error) {
            return;
        }
    }

    function ensureSelectionBounds() {
        if (contentData.certifications.length === 0) {
            selectedCertificationIndex = -1;
        } else if (selectedCertificationIndex < 0 || selectedCertificationIndex >= contentData.certifications.length) {
            selectedCertificationIndex = 0;
        }

        if (contentData.testimonials.length === 0) {
            selectedTestimonialIndex = -1;
        } else if (selectedTestimonialIndex < 0 || selectedTestimonialIndex >= contentData.testimonials.length) {
            selectedTestimonialIndex = 0;
        }
    }

    function renderCertificationList() {
        refs.certificationsList.innerHTML = '';

        if (contentData.certifications.length === 0) {
            refs.certificationsList.textContent = 'Nenhuma certificacao cadastrada.';
            return;
        }

        contentData.certifications.forEach(function (item, index) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'item-list__button' + (index === selectedCertificationIndex ? ' is-active' : '');

            var title = document.createElement('strong');
            title.textContent = sanitizeText(item.title) || 'Sem titulo';

            var subtitle = document.createElement('span');
            subtitle.textContent = (sanitizeText(item.institution) || 'Sem instituicao') + ' | ' + (sanitizeText(item.status) || 'status');

            button.appendChild(title);
            button.appendChild(subtitle);

            button.addEventListener('click', function () {
                selectedCertificationIndex = index;
                syncAllViews();
            });

            refs.certificationsList.appendChild(button);
        });
    }

    function renderTestimonialsList() {
        refs.testimonialsList.innerHTML = '';

        if (contentData.testimonials.length === 0) {
            refs.testimonialsList.textContent = 'Nenhum depoimento cadastrado.';
            return;
        }

        contentData.testimonials.forEach(function (item, index) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'item-list__button' + (index === selectedTestimonialIndex ? ' is-active' : '');

            var title = document.createElement('strong');
            title.textContent = sanitizeText(item.authorName) || 'Autor sem nome';

            var subtitle = document.createElement('span');
            subtitle.textContent = sanitizeText(item.text).slice(0, 70) || 'Sem texto';

            button.appendChild(title);
            button.appendChild(subtitle);

            button.addEventListener('click', function () {
                selectedTestimonialIndex = index;
                syncAllViews();
            });

            refs.testimonialsList.appendChild(button);
        });
    }

    function renderCertificationForm() {
        if (selectedCertificationIndex < 0 || !contentData.certifications[selectedCertificationIndex]) {
            refs.certTitle.value = '';
            refs.certInstitution.value = '';
            refs.certCredentialUrl.value = '';
            refs.certStatus.value = 'completed';
            refs.certHours.value = '';
            refs.certLogo.value = 'alura';
            refs.certHighlight.checked = false;
            return;
        }

        var item = contentData.certifications[selectedCertificationIndex];
        refs.certTitle.value = sanitizeText(item.title);
        refs.certInstitution.value = sanitizeText(item.institution);
        refs.certCredentialUrl.value = sanitizeText(item.credentialUrl);
        refs.certStatus.value = sanitizeText(item.status) || 'completed';
        refs.certHours.value = sanitizeText(item.hours);
        refs.certLogo.value = sanitizeText(item.logo) || 'alura';
        refs.certHighlight.checked = Boolean(item.isHighlight);
    }

    function renderTestimonialForm() {
        if (selectedTestimonialIndex < 0 || !contentData.testimonials[selectedTestimonialIndex]) {
            refs.testimonialText.value = '';
            refs.testimonialAuthorName.value = '';
            refs.testimonialAuthorRole.value = '';
            refs.testimonialAuthorPhoto.value = '';
            refs.testimonialAuthorInitial.value = '';
            return;
        }

        var item = contentData.testimonials[selectedTestimonialIndex];
        refs.testimonialText.value = sanitizeText(item.text);
        refs.testimonialAuthorName.value = sanitizeText(item.authorName);
        refs.testimonialAuthorRole.value = sanitizeText(item.authorRole);
        refs.testimonialAuthorPhoto.value = sanitizeText(item.authorPhoto);
        refs.testimonialAuthorInitial.value = sanitizeText(item.authorInitial);
    }

    function renderPreviewCredentials() {
        refs.previewCredentials.innerHTML = '';

        contentData.certifications.forEach(function (item) {
            var li = document.createElement('li');

            var line1 = document.createElement('strong');
            line1.textContent = sanitizeText(item.title) || 'Sem titulo';

            var line2 = document.createElement('p');
            line2.textContent = (sanitizeText(item.institution) || 'Sem instituicao') + ' | ' + (sanitizeText(item.hours) || '-');

            li.appendChild(line1);
            li.appendChild(line2);
            refs.previewCredentials.appendChild(li);
        });
    }

    function renderPreviewTestimonials() {
        refs.previewTestimonials.innerHTML = '';

        contentData.testimonials.forEach(function (item) {
            var blockquote = document.createElement('blockquote');
            blockquote.textContent = '"' + (sanitizeText(item.text) || 'Sem texto') + '"';

            var cite = document.createElement('cite');
            cite.textContent = (sanitizeText(item.authorName) || 'Autor') + ' - ' + (sanitizeText(item.authorRole) || 'Sem cargo');

            blockquote.appendChild(cite);
            refs.previewTestimonials.appendChild(blockquote);
        });
    }

    function syncAllViews() {
        ensureSelectionBounds();
        renderCertificationList();
        renderTestimonialsList();
        renderCertificationForm();
        renderTestimonialForm();
        renderPreviewCredentials();
        renderPreviewTestimonials();
    }

    function bindCertificationFormEvents() {
        var handlers = [
            { el: refs.certTitle, key: 'title', event: 'input' },
            { el: refs.certInstitution, key: 'institution', event: 'input' },
            { el: refs.certCredentialUrl, key: 'credentialUrl', event: 'input' },
            { el: refs.certStatus, key: 'status', event: 'change' },
            { el: refs.certHours, key: 'hours', event: 'input' },
            { el: refs.certLogo, key: 'logo', event: 'change' }
        ];

        handlers.forEach(function (entry) {
            entry.el.addEventListener(entry.event, function () {
                if (selectedCertificationIndex < 0 || !contentData.certifications[selectedCertificationIndex]) {
                    return;
                }

                contentData.certifications[selectedCertificationIndex][entry.key] = entry.el.value;
                saveDraft();
                syncAllViews();
            });
        });

        refs.certHighlight.addEventListener('change', function () {
            if (selectedCertificationIndex < 0 || !contentData.certifications[selectedCertificationIndex]) {
                return;
            }

            contentData.certifications[selectedCertificationIndex].isHighlight = refs.certHighlight.checked;
            saveDraft();
            syncAllViews();
        });
    }

    function bindTestimonialFormEvents() {
        var handlers = [
            { el: refs.testimonialText, key: 'text', event: 'input' },
            { el: refs.testimonialAuthorName, key: 'authorName', event: 'input' },
            { el: refs.testimonialAuthorRole, key: 'authorRole', event: 'input' },
            { el: refs.testimonialAuthorPhoto, key: 'authorPhoto', event: 'input' },
            { el: refs.testimonialAuthorInitial, key: 'authorInitial', event: 'input' }
        ];

        handlers.forEach(function (entry) {
            entry.el.addEventListener(entry.event, function () {
                if (selectedTestimonialIndex < 0 || !contentData.testimonials[selectedTestimonialIndex]) {
                    return;
                }

                contentData.testimonials[selectedTestimonialIndex][entry.key] = entry.el.value;
                saveDraft();
                syncAllViews();
            });
        });
    }

    function addCertification() {
        contentData.certifications.push({
            title: 'Nova certificacao',
            institution: 'Instituicao',
            credentialUrl: 'https://',
            status: 'completed',
            hours: '',
            logo: 'alura',
            isHighlight: false
        });

        selectedCertificationIndex = contentData.certifications.length - 1;
        saveDraft();
        syncAllViews();
    }

    function deleteCertification() {
        if (selectedCertificationIndex < 0 || contentData.certifications.length === 0) {
            return;
        }

        contentData.certifications.splice(selectedCertificationIndex, 1);
        if (selectedCertificationIndex >= contentData.certifications.length) {
            selectedCertificationIndex = contentData.certifications.length - 1;
        }

        saveDraft();
        syncAllViews();
    }

    function nextTestimonialId() {
        return contentData.testimonials.reduce(function (maxId, item) {
            return Math.max(maxId, Number(item.id) || 0);
        }, 0) + 1;
    }

    function addTestimonial() {
        contentData.testimonials.push({
            id: nextTestimonialId(),
            text: 'Novo depoimento',
            authorName: 'Nome',
            authorRole: 'Cargo',
            authorPhoto: '',
            authorInitial: 'N'
        });

        selectedTestimonialIndex = contentData.testimonials.length - 1;
        saveDraft();
        syncAllViews();
    }

    function deleteTestimonial() {
        if (selectedTestimonialIndex < 0 || contentData.testimonials.length === 0) {
            return;
        }

        contentData.testimonials.splice(selectedTestimonialIndex, 1);
        if (selectedTestimonialIndex >= contentData.testimonials.length) {
            selectedTestimonialIndex = contentData.testimonials.length - 1;
        }

        saveDraft();
        syncAllViews();
    }

    function downloadJson() {
        var jsonText = buildJsonText();
        var blob = new Blob([jsonText], { type: 'application/json;charset=utf-8' });
        var url = URL.createObjectURL(blob);

        var link = document.createElement('a');
        link.href = url;
        link.download = 'content.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setStatus('Arquivo content.json baixado.', 'success');
    }

    async function copyJson() {
        var jsonText = buildJsonText();

        try {
            await navigator.clipboard.writeText(jsonText);
            setStatus('JSON copiado para a area de transferencia.', 'success');
        } catch (error) {
            setStatus('Nao foi possivel copiar automaticamente.', 'warning');
        }
    }

    function getGitHubConfig() {
        return {
            owner: refs.repoOwner.value.trim(),
            repo: refs.repoName.value.trim(),
            branch: refs.repoBranch.value.trim(),
            workflowFile: refs.workflowFile.value.trim(),
            token: refs.githubToken.value.trim(),
            commitMessage: refs.commitMessage.value.trim() || 'chore(admin): update content.json'
        };
    }

    function encodeBase64Utf8(text) {
        var bytes = new TextEncoder().encode(text);
        var binary = '';
        bytes.forEach(function (byte) {
            binary += String.fromCharCode(byte);
        });
        return btoa(binary);
    }

    async function githubRequest(url, options, token) {
        var requestOptions = options || {};
        requestOptions.headers = requestOptions.headers || {};
        requestOptions.headers.Authorization = 'Bearer ' + token;
        requestOptions.headers.Accept = 'application/vnd.github+json';
        requestOptions.headers['X-GitHub-Api-Version'] = '2022-11-28';

        var response = await fetch(url, requestOptions);
        if (!response.ok) {
            var bodyText = await response.text();
            throw new Error('GitHub API falhou: ' + response.status + ' ' + bodyText);
        }

        if (response.status === 204) {
            return null;
        }

        return response.json();
    }

    async function publishContent(triggerDeploy) {
        var cfg = getGitHubConfig();
        if (!cfg.owner || !cfg.repo || !cfg.branch || !cfg.token) {
            throw new Error('Preencha owner, repositorio, branch e token para publicar.');
        }

        var contentUrl = 'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + '/contents/data/content.json?ref=' + encodeURIComponent(cfg.branch);
        var currentFile = await githubRequest(contentUrl, { method: 'GET' }, cfg.token);

        var payload = {
            message: cfg.commitMessage,
            content: encodeBase64Utf8(buildJsonText()),
            branch: cfg.branch,
            sha: currentFile.sha
        };

        await githubRequest(
            'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + '/contents/data/content.json',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            },
            cfg.token
        );

        clearDraft();
        setStatus('content.json publicado no GitHub com sucesso.', 'success');

        if (triggerDeploy) {
            await triggerDeployWorkflow();
        }
    }

    async function triggerDeployWorkflow() {
        var cfg = getGitHubConfig();
        if (!cfg.owner || !cfg.repo || !cfg.branch || !cfg.token || !cfg.workflowFile) {
            throw new Error('Preencha owner, repositorio, branch, workflow e token para deploy.');
        }

        var dispatchUrl = 'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo + '/actions/workflows/' + encodeURIComponent(cfg.workflowFile) + '/dispatches';

        await githubRequest(
            dispatchUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ref: cfg.branch
                })
            },
            cfg.token
        );

        setStatus('Deploy disparado via GitHub Actions.', 'success');
    }

    async function loadFromLocalFile() {
        setStatus('Carregando dados do arquivo local...', 'info');

        var response = await fetch(CONTENT_PATH + '?v=' + Date.now());
        if (!response.ok) {
            throw new Error('Nao foi possivel carregar data/content.json');
        }

        var parsed = await response.json();
        if (!parsed || !Array.isArray(parsed.certifications) || !Array.isArray(parsed.testimonials)) {
            throw new Error('Estrutura invalida em data/content.json');
        }

        contentData = parsed;
        selectedCertificationIndex = 0;
        selectedTestimonialIndex = 0;
        syncAllViews();
        setStatus('Dados locais carregados com sucesso.', 'success');
    }

    function bindActions() {
        refs.reloadButton.addEventListener('click', function () {
            loadFromLocalFile().catch(function (error) {
                setStatus(error.message, 'error');
            });
        });

        refs.downloadButton.addEventListener('click', downloadJson);
        refs.copyButton.addEventListener('click', function () {
            copyJson().catch(function (error) {
                setStatus(error.message, 'error');
            });
        });

        refs.publishButton.addEventListener('click', function () {
            setStatus('Publicando content.json no GitHub...', 'info');
            publishContent(false).catch(function (error) {
                setStatus(error.message, 'error');
            });
        });

        refs.publishDeployButton.addEventListener('click', function () {
            setStatus('Publicando content.json e disparando deploy...', 'info');
            publishContent(true).catch(function (error) {
                setStatus(error.message, 'error');
            });
        });

        refs.deployOnlyButton.addEventListener('click', function () {
            setStatus('Disparando deploy...', 'info');
            triggerDeployWorkflow().catch(function (error) {
                setStatus(error.message, 'error');
            });
        });

        refs.addCertificationButton.addEventListener('click', addCertification);
        refs.deleteCertificationButton.addEventListener('click', deleteCertification);
        refs.addTestimonialButton.addEventListener('click', addTestimonial);
        refs.deleteTestimonialButton.addEventListener('click', deleteTestimonial);
    }

    function initialize() {
        bindCertificationFormEvents();
        bindTestimonialFormEvents();
        bindActions();

        var hasDraft = loadDraftIfPresent();

        if (hasDraft) {
            syncAllViews();
        } else {
            loadFromLocalFile().catch(function (error) {
                setStatus(error.message, 'error');
            });
        }
    }

    initialize();
})();
