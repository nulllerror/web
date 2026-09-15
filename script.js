document.addEventListener('DOMContentLoaded', () => {
    // --- Site Configuration ---
    const SITE_CONFIG = {
        typewriter: {
            phrases: [
                "aspiring SWE",
                "3rd year student",
                "passionate for AI"
            ],
            typeSpeed: 100,
            deleteSpeed: 50,
            endPause: 2000,
            startPause: 500
        },
        skills: [
            'JavaScript', 'C', 'Python', 'Java', 'Git', 'Linux', 'React', 'Node.js', 'SQL'
        ],
        projects: [
            {
                title: 'Unix Shell',
                description: 'A unix shell written in C',
                tags: ['C', 'Unix'],
                link: '#'
            }
        ]
    };

    // --- Theme Management ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // --- Typewriter Effect ---
    const typewriterEl = document.getElementById('typewriter');
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let currentTypeSpeed = SITE_CONFIG.typewriter.typeSpeed;

    function type() {
        const currentPhrase = SITE_CONFIG.typewriter.phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            currentTypeSpeed = SITE_CONFIG.typewriter.deleteSpeed;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            currentTypeSpeed = SITE_CONFIG.typewriter.typeSpeed;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            currentTypeSpeed = SITE_CONFIG.typewriter.endPause;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % SITE_CONFIG.typewriter.phrases.length;
            currentTypeSpeed = SITE_CONFIG.typewriter.startPause;
        }

        setTimeout(type, currentTypeSpeed);
    }
    type();

    // --- Background Blobs Interaction ---
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        blobs.forEach((blob, idx) => {
            const speed = (idx + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // --- Projects Rendering ---
    const projectsGrid = document.getElementById('projects-grid');
    SITE_CONFIG.projects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card reveal';
        card.innerHTML = `
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-desc">${proj.description}</p>
            <div class="project-tags">
                ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${proj.link}" target="_blank" class="project-link">View Project <i class="fas fa-external-link-alt"></i></a>
        `;
        projectsGrid.appendChild(card);
    });

    // --- Skills Cloud ---
    const skillsCloud = document.getElementById('skills-cloud');
    SITE_CONFIG.skills.forEach(skill => {
        const pill = document.createElement('div');
        pill.className = 'skill-pill';
        pill.textContent = skill;
        skillsCloud.appendChild(pill);
    });

    // --- Reveal Animation ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
