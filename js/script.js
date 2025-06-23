// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.3)';
    }
});

// Form validation and submission
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Basic form validation
    const requiredFields = ['name', 'email', 'service', 'description'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            input.style.border = '2px solid #ff4444';
        } else {
            input.style.border = 'none';
        }
    });

    // Email validation
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        emailInput.style.border = '2px solid #ff4444';
    }

    if (!isValid) {
        alert('Please fill in all required fields correctly.');
        return;
    }
    
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    const form = this;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Create FormData object
    const formData = new FormData(form);
    
    // Submit via fetch API
    fetch('https://formsubmit.co/8545112d8542876919f62911118071c6', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(() => {
        // Success - show confirmation message
        alert('Thank you for your quote request! We will be in contact to discuss your project.');
        form.reset(); // Clear the form
        // Reset any validation styling
        requiredFields.forEach(field => {
            document.getElementById(field).style.border = 'none';
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your request. Please try again or contact us directly.');
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
});

// Add animation on scroll
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

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();