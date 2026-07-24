// -------------------- DOM CONTENT LOADED --------------------
document.addEventListener('DOMContentLoaded', function() {

    // ---------- INIT EMAILJS ----------
    emailjs.init("NGb5stxE4EtCb-XfF"); // ✅ Public Key

    // ---------- INIT FEATURES ----------
    initNavbar();
    initTypingEffect();
    initSmoothScroll();
    initSectionAnimations();
    initContactForm();
});


// -------------------- NAVBAR --------------------
function initNavbar() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Mobile menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Active navbar on scroll
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {

        let current = "";

        const scrollY = window.pageYOffset;

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();
}


// -------------------- TYPING EFFECT --------------------
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Ful-stack Developer', 
        'Data Scientist',
        'Analytical Thinker',
        'Tech Explorer',
        'Backend Engineer'
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}


// -------------------- SMOOTH SCROLL --------------------
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
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}


// -------------------- SECTION ANIMATIONS --------------------
function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left') || entry.target.classList.contains('slide-in-right')) {
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

    elements.forEach(el => observer.observe(el));
}

// -------------------- CONTACT FORM --------------------
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_38qvago",   // Service ID
            "template_zm5t0u4",  // Template ID
            this
        ).then(
            () => {
                alert(" Message sent successfully!");
                form.reset();
            },
            (error) => {
                alert("Failed to send message: " + error.text);
            }
        );
    });

      
}
 // Clone tracks so the loop is truly seamless (no jump)
  (function () {
    ['marquee-row2'].forEach(function (id) {
      var track = document.getElementById(id);
      if (!track) return;
      var clone = track.cloneNode(true);
      clone.removeAttribute('id');
      clone.setAttribute('aria-hidden', 'true');
      track.parentNode.appendChild(clone);
    });
  })();

  document.addEventListener("DOMContentLoaded", () => {
    console.log("Certifications JS Loaded");

    const images = document.querySelectorAll(".cert-card img");

    images.forEach((img) => {
        img.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.classList.add("certificate-overlay");
            // Basic styles in case your CSS is missing them
            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0,0,0,0.8)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "10000";
            overlay.style.cursor = "pointer";

            overlay.innerHTML = `
                <div class="preview-box" style="position: relative; max-width: 90vw; max-height: 90vh;">
                    <img src="${img.src}" alt="Certificate Preview" style="max-width: 100%; max-height: 90vh; border-radius: 10px;">
                    <button class="close-preview" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">×</button>
                </div>
            `;

            document.body.appendChild(overlay);

            // Close logic for the image preview
            const closeButton = overlay.querySelector(".close-preview");
            closeButton.onclick = () => overlay.remove();
            
            overlay.onclick = (e) => {
                if (e.target === overlay) overlay.remove();
            };

            document.addEventListener("keydown", function closeEsc(e) {
                if (e.key === "Escape") {
                    overlay.remove();
                    document.removeEventListener("keydown", closeEsc);
                }
            });
        });
    });
});


function openCertificate(imagePath, pdfPath, title, platform) {
    const viewer = document.getElementById('certViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerPlatform = document.getElementById('viewerPlatform');
    const downloadBtn = document.getElementById('viewerDownloadBtn');

    // Populate the viewer with the passed data
    viewerImg.src = imagePath;
    viewerTitle.textContent = title;
    viewerPlatform.textContent = 'Issued by ' + platform;
    downloadBtn.href = pdfPath;

    // Show the viewer (matches the .active class in your CSS)
    viewer.classList.add('active');
}

// Function to close the main certificate viewer
function closeCertificate() {
    const viewer = document.getElementById('certViewer');
    viewer.classList.remove('active');
}

// Function to open the "View All" modal
function openAllCertsModal() {
    const modal = document.getElementById('allCertsModal');
    modal.classList.add('active');
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden'; 
}

// Function to close the "View All" modal
function closeAllCertsModal() {
    const modal = document.getElementById('allCertsModal');
    modal.classList.remove('active');
    // Restore background scrolling
    document.body.style.overflow = 'auto'; 
}

// Close modal if user clicks outside the content box
document.getElementById('allCertsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAllCertsModal();
    }
});

