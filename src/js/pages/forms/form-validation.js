const form = document.querySelector('.myForm');
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const emailError = document.querySelector('label[for="email"] + span.error');
const formPassword = document.getElementById('password');

email.addEventListener('input', event => {
    if (formEmail.validity.valid) {
        emailError.textContent = '';
        emailError.className = 'error';
        emailError.parentNode.className = 'form__group';
    } else {
        console.log('Error! Need an email address');
        console.log(emailError.parentNode);
        emailError.parentNode.className = 'form__group error';
        showError();
    }
});

form.addEventListener('submit', event => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        showError();
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
    }
});

function showError() {
    if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = 'You need to enter an email address.';
    } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = 'Entered value needs to be an email address.';
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    emailError.className = 'error active';
}
