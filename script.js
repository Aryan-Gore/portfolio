document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initSmoothScroll();
    initSectionAnimations();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                navLinks.forEach(link => link.classList.remove('active'));
                
                
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Front-End', 
        'Problem Solver',
        'Code Explorer',
        'AI Explorer',
        'Innovator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));

    (function() {
  emailjs.init("NGb5stxE4EtCb-XfF"); // EmailJS
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_38qvago", "template_zm5t0u4", this)
    .then(() => {
      alert("Dn");
    }, (error) => {
      alert("Eror " + JSON.stringify(error));
    });
});

}

document.addEventListener('DOMContentLoaded', function () {
    // Contact Form
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_38qvago",   // Service ID 
            "template_zm5t0u4",  // Template ID EmailJS
            this
        ).then(
            () => {
                alert("✅ Message sent successfully!");
                form.reset();
            },
            (error) => {
                alert("❌ Failed to send message: " + error.text);
            }
        );
    });
});






