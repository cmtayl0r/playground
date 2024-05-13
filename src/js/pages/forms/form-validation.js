const form = document.getElementById('myForm');
const inputs = form.querySelectorAll('input, textarea, select');

// TODO: Add validation for groups of checkboxes

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

    // Real-time validation of inputs on blur
    inputs.forEach(input => {
        // Check for real-time validation of inputs
        input.addEventListener('blur', () => {
            // Using the browser's built-in validation
            if (!input.validity.valid) {
                showError(input, input.validationMessage);
            } else {
                clearError(input);
            }
        });
    });

    // Validation of inputs on form submit
    form.addEventListener('submit', event => {
        // Check if form is valid, so we can prevent the form from submitting
        let isFormValid = true;
        // Loop through each input and check if it's valid
        inputs.forEach(input => {
            if (!input.validity.valid) {
                // show error message inline with input
                showError(input, input.validationMessage);
                // Set form as invalid
                isFormValid = false;
            } else {
                // clear any error messages
                clearError(input);
            }
        });
        // If form is not valid, prevent it from submitting
        if (!isFormValid) {
            event.preventDefault();
            alert('👍 Form is valid');
        } else {
            // Form is valid, submit it
            alert('❌ Form is NOT valid');
        }
    });
});
