document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // --- Typewriter Effect ---
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        "Building the future of the web.",
        "CS Student @ Tech University.",
        "Passionate about AI & Systems.",
        "Creating pixel-perfect experiences."
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- Parallax Background ---
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;

        blobs.forEach((blob, idx) => {
            const speed = (idx + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // --- Skills Generation ---
    const skills = [
        'JavaScript', 'C', 'Python', 'Java', 'Git', 'Linux'
    ];

    const skillsCloud = document.getElementById('skills-cloud');
    skills.forEach(skill => {
        const pill = document.createElement('div');
        pill.className = 'skill-pill';
        pill.textContent = skill;
        skillsCloud.appendChild(pill);
    });

    // --- Scroll Reveal Animation ---
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

    // --- Form Submission ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Message Sent! ✨';
            btn.style.background = '#34C759';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
});
