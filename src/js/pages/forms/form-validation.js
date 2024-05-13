const form = document.getElementById('myForm');
const inputs = form.querySelectorAll('input, textarea, select');

document.addEventListener('DOMContentLoaded', () => {
    // Function: Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form__group');
        const errorDisplay = formGroup.querySelector('.input__error');
        console.log(errorDisplay);
        errorDisplay.textContent = message;
        errorDisplay.classList.add('active');
        formGroup.classList.add('error');
    }

    // Function: Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form__group');
        const errorDisplay = formGroup.querySelector('.input__error');
        errorDisplay.textContent = '';
        errorDisplay.classList.remove('active');
        formGroup.classList.remove('error');
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.validity.valid) {
                showError(input, input.validationMessage);
            } else {
                clearError(input);
            }
        });
    });

    // Validation on form submit
    form.addEventListener('submit', event => {
        let isFormValid = true;
        inputs.forEach(input => {
            if (!input.validity.valid) {
                showError(input, input.validationMessage);
                isFormValid = false;
            } else {
                clearError(input);
            }
        });
        if (!isFormValid) {
            event.preventDefault();
        }

        if (isFormValid) {
            alert('👍 Form is valid');
        } else {
            alert('❌ Form is NOT valid');
        }
    });
});
