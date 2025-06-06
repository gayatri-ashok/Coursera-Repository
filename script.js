function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('visible');
    }
}

// Example: Attach to hamburger icon
const hamburgerIcon = document.getElementById('hamburger-icon');
if (hamburgerIcon) {
    hamburgerIcon.addEventListener('click', toggleMenu);
}

// Smooth scrolling for navigation links
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Filter feature for the "Projects" section
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Example: Attach filter buttons
document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterProjects(category);
    });
});

// Lightbox effect for project images
function createLightbox() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = 1000;

    const img = document.createElement('img');
    img.id = 'lightbox-img';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.boxShadow = '0 0 20px #000';

    modal.appendChild(img);
    document.body.appendChild(modal);

    // Close modal on click
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        img.src = '';
    });
}

function enableLightboxOnProjectImages() {
    const images = document.querySelectorAll('.project-item img');
    images.forEach(image => {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            const modal = document.getElementById('lightbox-modal');
            const modalImg = document.getElementById('lightbox-img');
            modalImg.src = this.src;
            modal.style.display = 'flex';
        });
    });
}

// Initialize lightbox after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createLightbox();
    enableLightboxOnProjectImages();

    // Contact form validation with real-time feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');

        // Helper to show error messages
        function showError(input, message) {
            let errorElem = input.nextElementSibling;
            if (!errorElem || !errorElem.classList.contains('input-error')) {
                errorElem = document.createElement('div');
                errorElem.className = 'input-error';
                errorElem.style.color = 'red';
                errorElem.style.fontSize = '0.9em';
                input.parentNode.insertBefore(errorElem, input.nextSibling);
            }
            errorElem.textContent = message;
        }

        function clearError(input) {
            let errorElem = input.nextElementSibling;
            if (errorElem && errorElem.classList.contains('input-error')) {
                errorElem.textContent = '';
            }
        }

        // Real-time validation handlers
        name.addEventListener('input', () => {
            if (!name.value.trim()) {
                showError(name, 'Please enter your name.');
            } else {
                clearError(name);
            }
        });

        email.addEventListener('input', () => {
            if (!email.value.trim()) {
                showError(email, 'Please enter your email.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
            } else {
                clearError(email);
            }
        });

        message.addEventListener('input', () => {
            if (!message.value.trim()) {
                showError(message, 'Please enter your message.');
            } else {
                clearError(message);
            }
        });

        contactForm.addEventListener('submit', function(e) {
            let valid = true;

            if (!name.value.trim()) {
                showError(name, 'Please enter your name.');
                valid = false;
            }
            if (!email.value.trim()) {
                showError(email, 'Please enter your email.');
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Please enter a valid email address.');
                valid = false;
            }
            if (!message.value.trim()) {
                showError(message, 'Please enter your message.');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});