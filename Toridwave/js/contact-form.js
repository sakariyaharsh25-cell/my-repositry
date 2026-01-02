
document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.getElementById('professionalContactForm');
    if (!contactForm) return;

    /* 🔑 EmailJS Init (APNA PUBLIC KEY DAALE) */
    emailjs.init("CdH0ixXeTpAK1sSC7iHJb");

    initFormValidation(contactForm);
    contactForm.addEventListener('submit', handleFormSubmit);
});

/* ================= VALIDATION ================= */

function initFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let errorMessage = '';

    field.classList.remove('error', 'success');
    const oldError = field.parentElement.querySelector('.error-message');
    if (oldError) oldError.remove();

    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
    }

    if (field.name === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Enter a valid email address';
        }
    }

    if (field.name === 'phone' && value && value.length < 10) {
        errorMessage = 'Enter a valid phone number';
    }

    if (field.name === 'message' && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters';
    }

    if (errorMessage) {
        field.classList.add('error');
        const err = document.createElement('div');
        err.className = 'error-message show';
        err.textContent = errorMessage;
        field.parentElement.appendChild(err);
        return false;
    }

    if (value) field.classList.add('success');
    return true;
}

function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
        if (!validateField(input)) valid = false;
    });
    return valid;
}

/* ================= SUBMIT ================= */

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.innerHTML;

    if (!validateForm(form)) {
        showMessage('❌ Please fix the errors in the form', 'error');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = 'Sending...';

    const data = {
        from_name:
            form.querySelector('#firstName').value +
            ' ' +
            form.querySelector('#lastName').value,
        from_email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value || 'Not provided',
        message: form.querySelector('#message').value,
        to_name: 'TorridWave Team'
    };

    try {
        await emailjs.send(
            'service_aadb9es',     // ✅ TERA SERVICE ID
            'template_d3scg6v',    // ✅ TERA TEMPLATE ID
            data
        );

        showMessage('✅ Message sent successfully!', 'success');
        form.reset();
        form.querySelectorAll('.success').forEach(el => el.classList.remove('success'));

    } catch (err) {
        console.error(err);
        showMessage('❌ Failed to send message. Try again later.', 'error');
    }

    btn.disabled = false;
    btn.innerHTML = btnText;
}

/* ================= MESSAGE UI ================= */

function showMessage(text, type) {
    document.querySelectorAll('.form-success-message,.form-error-message')
        .forEach(el => el.remove());

    const div = document.createElement('div');
    div.className = type === 'success'
        ? 'form-success-message show'
        : 'form-error-message show';

    div.textContent = text;

    const form = document.getElementById('professionalContactForm');
    form.parentElement.insertBefore(div, form);

    setTimeout(() => div.remove(), 5000);
}
