// JavaScript für ZerionMC Website
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.querySelector('.theme-icon');
    const html = document.documentElement;
    
    // Lade gespeichertes Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme Toggle Event
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Mobile Navigation Toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navigation zwischen Seiten
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Entferne active Klasse von allen Links und Seiten
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Füge active Klasse zum geklickten Link hinzu
            this.classList.add('active');
            
            // Zeige die entsprechende Seite
            const targetId = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
            
            // Schließe mobile Navigation
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Scrolle nach oben
            window.scrollTo(0, 0);
        });
    });

    // Shop Buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rankCard = this.closest('.rank-card');
            const rankName = rankCard.querySelector('h3').textContent;
            const price = rankCard.querySelector('.price').textContent;
            
            // Hier könntest du eine echte Shop-Integration hinzufügen
            if (confirm(`Möchtest du ${rankName} für ${price} kaufen?`)) {
                alert('Vielen Dank für deinen Einkauf! Du wirst zur Bezahlung weitergeleitet.');
                // Hier könntest du zu einer Bezahlseite weiterleiten
                // window.location.href = '/payment.html';
            }
        });
    });

    // Smooth Scrolling für interne Links
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

    // Animation beim Scrollen
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Beobachte Elemente für Animation
    document.querySelectorAll('.feature, .rank-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CTA Button Animation
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// Funktion zur Navigation zwischen Seiten
function navigateToPage(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Entferne active Klasse von allen Links und Seiten
    navLinks.forEach(l => l.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Finde den entsprechenden Nav-Link und aktiviere ihn
    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Zeige die entsprechende Seite
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scrolle nach oben
    window.scrollTo(0, 0);
}

// Funktion für Shop-Kauf (kann später erweitert werden)
function purchaseRank(rankName, price) {
    // Hier könntest du eine echte Shop-Integration hinzufügen
    console.log(`Kauf: ${rankName} für ${price}`);
    
    // Beispiel für eine einfache Bestätigung
    if (confirm(`Möchtest du ${rankName} für ${price} kaufen?`)) {
        // Hier könntest du eine API-Anfrage senden
        alert('Vielen Dank für deinen Einkauf! Du wirst zur Bezahlung weitergeleitet.');
        
        // Beispiel für Weiterleitung
        // window.location.href = '/checkout.html?rank=' + rankName;
    }
}

// Hilfsfunktion für das Formatieren von Preisen
function formatPrice(price) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Funktion für das Laden von Inhalten (falls später dynamische Inhalte benötigt werden)
async function loadContent(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        return content;
    } catch (error) {
        console.error('Fehler beim Laden des Inhalts:', error);
        return null;
    }
}
