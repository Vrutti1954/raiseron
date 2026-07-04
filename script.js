// ── MARQUEE DATA ──
const customers = [
    { initials: "RK", name: "Raj Kumar Sweets", bg: "#E0F5FF", fg: "#0369A1" },
    { initials: "SK", name: "Sharma Kirana Store", bg: "#DCFCE7", fg: "#166534" },
    { initials: "MT", name: "Metro Tech Solutions", bg: "#EDE9FE", fg: "#6D28D9" },
    { initials: "PH", name: "Prime Health Clinic", bg: "#FEF3C7", fg: "#92400E" },
    { initials: "ZF", name: "Zara Fashion Hub", bg: "#FCE7F3", fg: "#9D174D" },
    { initials: "SB", name: "Sunrise Builders", bg: "#E0F5FF", fg: "#0369A1" },
    { initials: "TG", name: "TechGuru Academy", bg: "#DCFCE7", fg: "#166534" },
    { initials: "AR", name: "Aroma Restaurant", bg: "#FEF3C7", fg: "#92400E" },
    { initials: "SAE", name: "Shree Ambica Enterprise", bg: "#EDE9FE", fg: "#6D28D9" },
    { initials: "GE", name: "Global Exports Co.", bg: "#FCE7F3", fg: "#9D174D" },
    { initials: "HD", name: "Happy Dog Grooming", bg: "#DCFCE7", fg: "#166534" },
    { initials: "NF", name: "NextGen Fintech", bg: "#E0F5FF", fg: "#0369A1" }
];

function buildMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    let html = '';
    const doubled = [...customers, ...customers];
    doubled.forEach(c => {
        html += `<div class="c-chip">
      <div class="c-av" style="background:${c.bg};color:${c.fg};">${c.initials}</div>
      ${c.name}
      <span class="c-stars">★★★★★</span>
    </div>`;
    });
    track.innerHTML = html;
}

// ── MOBILE MENU ──
function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
    const reveals = document.querySelectorAll('.vector-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), idx * 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10 });
    reveals.forEach(el => observer.observe(el));
}

// ── STICKY NAV ──
function initStickyNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    const threshold = 60;
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > threshold) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ── QUANTUM MOUSE TRACKING ──
function initQuantumTracker() {
    const tracker = document.getElementById('quantumTracker');
    if (!tracker) return;

    let rafId = null;
    let lastX = 50,
        lastY = 50;

    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        lastX = x;
        lastY = y;

        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            tracker.style.setProperty('--mouse-x', `${lastX}%`);
            tracker.style.setProperty('--mouse-y', `${lastY}%`);
            rafId = null;
        });
    });

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if (!touch) return;
        const x = (touch.clientX / window.innerWidth) * 100;
        const y = (touch.clientY / window.innerHeight) * 100;
        tracker.style.setProperty('--mouse-x', `${x}%`);
        tracker.style.setProperty('--mouse-y', `${y}%`);
    }, { passive: true });
}

// ── SHOW MORE TOGGLE ──
function toggleShowMore(btn) {
    const content = btn.nextElementSibling;
    const isOpen = content.classList.contains('open');
    content.classList.toggle('open');
    btn.textContent = isOpen ? 'Show more ▾' : 'Show less ▴';
}

// ── TAG TOGGLE ──
let selectedTags = [];

function toggleTag(btn) {
    const tag = btn.dataset.tag;
    const icon = btn.querySelector('.icon');
    if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(t => t !== tag);
        btn.classList.remove('active');
        icon.textContent = '+';
    } else {
        selectedTags.push(tag);
        btn.classList.add('active');
        icon.textContent = '✓';
    }
}

// ── GENERATE DRAFT ──
function generateDraft() {
    const output = document.getElementById('draftOutput');
    if (selectedTags.length === 0) {
        output.style.display = 'block';
        output.style.borderColor = '#EF4444';
        output.style.color = '#EF4444';
        output.textContent = '⚠ Please select at least one tag to generate a review.';
        return;
    }

    const tagMap = {
        'Fast Service': 'lightning-fast service that blew me away',
        'Friendly Staff': 'incredibly warm and welcoming staff',
        'Ultra Premium': 'a premium, top-tier experience',
        'Great Vibe': 'an amazing vibe and atmosphere'
    };

    const phrases = selectedTags.map(t => tagMap[t] || t);
    const draft = `"Absolutely loved my experience! ${phrases.join(', ')}. Highly recommend this place to everyone. 10/10!"`;

    output.style.display = 'block';
    output.style.borderColor = 'rgba(33, 40, 116, 0.20)';
    output.style.color = 'var(--text)';
    output.textContent = `📝 ${draft}`;

    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── WHATSAPP BUBBLE ──
function initWhatsAppBubble() {
    const bubble = document.getElementById('waBubble');
    const closeBtn = document.getElementById('waBubbleClose');
    if (!bubble) return;
    setTimeout(() => bubble.classList.add('show'), 1800);
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            bubble.classList.remove('show');
        });
    }
}

// ── FORM HANDLER ──
document.addEventListener('DOMContentLoaded', function() {
    buildMarquee();
    initMobileMenu();
    initScrollReveal();
    initStickyNav();
    initQuantumTracker();
    initWhatsAppBubble();

    const form = document.getElementById('contactForm');
    if (!form) return;

    const SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbz__qSNCzFe8Ag45_xlrq-0apQdZJbJSV5B0rlNBFUKmVJrbd3N3ZKs41JoYJx6AqLk7Q/exec';

    function showFieldError(inputEl, msg) {
        clearFieldError(inputEl);
        inputEl.style.borderColor = '#EF4444';
        const err = document.createElement('span');
        err.className = 'field-error';
        err.textContent = '⚠ ' + msg;
        inputEl.parentNode.appendChild(err);
    }

    function clearFieldError(inputEl) {
        inputEl.style.borderColor = '';
        const prev = inputEl.parentNode.querySelector('.field-error');
        if (prev) prev.remove();
    }

    const PHONE_LENGTH_RULES = {
        '+91': [10],
        '+1': [10],
        '+44': [10, 11],
        '+61': [9],
        '+971': [9],
        '+974': [8],
        '+966': [9],
        '+65': [8],
        '+60': [9, 10],
        '+49': [10, 11],
        '+33': [9],
        '+39': [9, 10],
        '+81': [10],
        '+86': [11],
        '+7': [10],
        '+55': [10, 11],
        '+27': [9],
        '+234': [10],
        '+254': [9],
        '+92': [10],
        '+880': [10],
        '+94': [9],
        '+977': [10],
        '+64': [9, 10],
        '+353': [9],
        '+31': [9],
        '+34': [9],
        '+46': [9],
        '+47': [8],
        '+45': [8],
    };

    const COUNTRY_NAMES = {
        '+91': 'India',
        '+1': 'USA/Canada',
        '+44': 'UK',
        '+61': 'Australia',
        '+971': 'UAE',
        '+974': 'Qatar',
        '+966': 'Saudi Arabia',
        '+65': 'Singapore',
        '+60': 'Malaysia',
        '+49': 'Germany',
        '+33': 'France',
        '+39': 'Italy',
        '+81': 'Japan',
        '+86': 'China',
        '+7': 'Russia',
        '+55': 'Brazil',
        '+27': 'South Africa',
        '+234': 'Nigeria',
        '+254': 'Kenya',
        '+92': 'Pakistan',
        '+880': 'Bangladesh',
        '+94': 'Sri Lanka',
        '+977': 'Nepal',
        '+64': 'New Zealand',
        '+353': 'Ireland',
        '+31': 'Netherlands',
        '+34': 'Spain',
        '+46': 'Sweden',
        '+47': 'Norway',
        '+45': 'Denmark'
    };

    function validateForm() {
        let valid = true;
        const name = document.getElementById('Name');
        const email = document.getElementById('Email');
        const phone = document.getElementById('Phone');
        const service = document.getElementById('Service');
        const message = document.getElementById('Message');

        [name, email, phone, service, message].forEach(clearFieldError);

        if (!name.value.trim()) {
            showFieldError(name, 'Please enter your full name.');
            valid = false;
        }

        const emailVal = email.value.trim();
        if (!emailVal) {
            showFieldError(email, 'Please enter your email address.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
            showFieldError(email, 'Please enter a valid email address (e.g. you@example.com).');
            valid = false;
        }

        const phoneVal = phone.value.trim();
        const digitsOnly = phoneVal.replace(/\D/g, '');
        const countryCodeEl = document.getElementById('CountryCode');
        const selectedCode = countryCodeEl ? countryCodeEl.value : '+91';
        const allowedLengths = PHONE_LENGTH_RULES[selectedCode] || [9, 10];
        const countryLabel = COUNTRY_NAMES[selectedCode] || selectedCode;

        if (!phoneVal) {
            showFieldError(phone, 'Please enter your phone number.');
            valid = false;
        } else if (!/^[\d\s\-\(\)]+$/.test(phoneVal)) {
            showFieldError(phone, 'Phone number contains invalid characters.');
            valid = false;
        } else if (!allowedLengths.includes(digitsOnly.length)) {
            const expected = allowedLengths.join(' or ');
            showFieldError(phone,
                `Enter a valid ${countryLabel} (${selectedCode}) number — expected ${expected} digits, got ${digitsOnly.length}.`
            );
            valid = false;
        }

        if (!service.value) {
            showFieldError(service, 'Please select a package you are interested in.');
            valid = false;
        }

        if (!message.value.trim()) {
            showFieldError(message, 'Please enter a message so we can help you better.');
            valid = false;
        }

        return valid;
    }

    ['Name', 'Email', 'Phone', 'Service', 'Message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => clearFieldError(el));
    });

    const countryCodeSelect = document.getElementById('CountryCode');
    if (countryCodeSelect) {
        countryCodeSelect.addEventListener('change', () => {
            const phoneInput = document.getElementById('Phone');
            if (phoneInput) clearFieldError(phoneInput);
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            const firstError = form.querySelector('.field-error');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        const formStatus = document.getElementById('formStatus');

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--sky)';
        formStatus.innerHTML = '📤 Submitting your inquiry...';

        const countryCode = document.getElementById('CountryCode') ?
            document.getElementById('CountryCode').value :
            '+91';
        const phoneRaw = document.getElementById('Phone').value.trim();
        const fullPhone = phoneRaw ? countryCode + ' ' + phoneRaw : '';

        const payload = new URLSearchParams({
            Name: document.getElementById('Name').value.trim(),
            Email: document.getElementById('Email').value.trim(),
            Phone: fullPhone,
            Service: document.getElementById('Service').value,
            Message: document.getElementById('Message').value.trim(),
        }).toString();

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: payload
            });

            formStatus.style.color = '#22C55E';
            formStatus.innerHTML =
                '✅ Thank you! We\'ve received your inquiry. A confirmation email with your reference number is on its way — please check your inbox.';
            form.reset();

            setTimeout(() => { formStatus.style.display = 'none'; }, 36000);

        } catch (error) {
            console.error('Error:', error);
            formStatus.style.color = '#EF4444';
            formStatus.innerHTML =
                '❌ Something went wrong. Please try again or contact us directly via WhatsApp.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
});