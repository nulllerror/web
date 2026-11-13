document.addEventListener('DOMContentLoaded', () => {
  const SITE_CONFIG = {
    typewriter: {
      phrases: [
        "aspiring SWE",
        "3rd year student",
        "NLP & systems enthusiast",
      ],
      typeSpeed: 90,
      deleteSpeed: 45,
      endPause: 2200,
      startPause: 600
    },
    skills: [
      'JavaScript', 'C', 'Python', 'Java', 'Git', 'Linux', 'React', 'Node.js', 'SQL'
    ],
    projects: [
      {
        title: 'AI Resume parser',
        description: 'NLP-Powered parser that converts unstructured resume data into structured data using pandas and spaCy.',
        tags: ['Python', 'Pandas', 'SpaCy NLPs'],
        link: 'https://github.com/nulllerror/resumeanalysis'
      },
      {
        title: 'Ai powered text summarizer',
        description: 'A streamlit webapp summary tool that summarizes pasted text or text from a pdf through a fine tuned BART model.',
        tags: ['Python', 'Streamlit', 'HuggingFace'],
        link: 'https://github.com/nulllerror/ai-summarizer'
      }
    ]
  };

  // SVGs for Theme Toggle (100% self-contained, no external requests)
  const MOON_ICON = `
    <svg class="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

  const SUN_ICON = `
    <svg class="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

  const themeToggle = document.getElementById('theme-toggle');
  const themeIconWrap = document.getElementById('theme-icon-wrap');
  const themeLabel = document.getElementById('theme-label');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeUI(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeUI(newTheme);
    });
  }

  function updateThemeUI(theme) {
    if (themeIconWrap) {
      themeIconWrap.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Parchment' : 'Paper';
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light paper mode' : 'Switch to dark parchment mode');
    }
  }

  const typewriterEl = document.getElementById('typewriter');
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let currentTypeSpeed = SITE_CONFIG.typewriter.typeSpeed;

  function type() {
    if (!typewriterEl) return;
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

  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    SITE_CONFIG.projects.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card paper-card';
      card.innerHTML = `
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">
          ${proj.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
        <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-link">
          <span>View on GitHub</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
      projectsGrid.appendChild(card);
    });
  }

  const skillsCloud = document.getElementById('skills-cloud');
  if (skillsCloud) {
    SITE_CONFIG.skills.forEach(skill => {
      const pill = document.createElement('span');
      pill.className = 'skill-pill';
      pill.textContent = skill;
      skillsCloud.appendChild(pill);
    });
  }
});
