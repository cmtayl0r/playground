const form = document.querySelector('.myForm');
const inputs = form.querySelectorAll('input');

// trigger error on form submit
form.addEventListener('submit', event => {
    let formValid = true;
    inputs.forEach(input => {
        const isValid = input.validity.valid;
        const message = input.validationMessage;
        const connectedValidationId = input.getAttribute('aria-describedby');
        const connectedValidation = connectedValidationId
            ? document.getElementById(connectedValidationId)
            : false;

        if (connectedValidation && message && !isValid) {
            connectedValidation.innerText = message;
            connectedValidation.className = 'error active';
            input.parentNode.className = 'form__group error';
            formValid = false;
        } else {
            connectedValidation.innerText = '';
            connectedValidation.className = 'error';
            input.parentNode.className = 'form__group';
        }
    });
    if (!formValid) event.preventDefault();
});

// trigger errors on input blur
form.addEventListener(
    'blur',
    event => {
        const input = event.target;
        const isValid = input.validity.valid;
        const message = input.validationMessage;
        const connectedValidationId = input.getAttribute('aria-describedby');
        const connectedValidation = connectedValidationId
            ? document.getElementById(connectedValidationId)
            : false;

        if (connectedValidation && message && !isValid) {
            connectedValidation.innerText = message;
            connectedValidation.className = 'error active';
            input.parentNode.className = 'form__group error';
        } else {
            connectedValidation.innerText = '';
            connectedValidation.className = 'error';
            input.parentNode.className = 'form__group';
        }
    },
    true,
);

// form.addEventListener('input', event => {
//     const input = event.target;
//     const errorSpan = input.previousElementSibling;
//     console.log(errorSpan);
//     if (input.validity.valid) {
//         errorSpan.textContent = '';
//         errorSpan.className = '';
//         input.parentNode.className = 'form__group';
//     } else {
//         // console.log(`Error in ${input.name} field`);
//         showError(input, errorSpan);
//         errorSpan.className = 'error active';
//         input.parentNode.className = 'form__group error';
//     }
// });

// function showError(input, errorSpan) {
//     if (input.validity.valueMissing) {
//         errorSpan.textContent = `You need to enter ${input.name}.`;
//     } else if (input.validity.typeMismatch) {
//         errorSpan.textContent = `Entered value needs to be a ${input.type}.`;
//     } else if (input.validity.tooShort) {
//         errorSpan.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
//     }
//     errorSpan.className = 'error active';
//     input.parentNode.className = 'form__group error';
// }

/// ----------------------------------------------------------

// email.addEventListener('input', event => {
//     if (formEmail.validity.valid) {
//         emailError.textContent = '';
//         emailError.className = 'error';
//         emailError.parentNode.className = 'form__group';
//     } else {
//         console.log('Error! Need an email address');
//         console.log(emailError.parentNode);
//         emailError.parentNode.className = 'form__group error';
//         showError();
//     }
// });

// form.addEventListener('submit', event => {
//     // if the email field is valid, we let the form submit
//     if (!email.validity.valid) {
//         // If it isn't, we display an appropriate error message
//         showError();
//         // Then we prevent the form from being sent by canceling the event
//         event.preventDefault();
//     }
// });

// function showError() {
//     if (email.validity.valueMissing) {
//         // If the field is empty,
//         // display the following error message.
//         emailError.textContent = 'You need to enter an email address.';
//     } else if (email.validity.typeMismatch) {
//         // If the field doesn't contain an email address,
//         // display the following error message.
//         emailError.textContent = 'Entered value needs to be an email address.';
//     } else if (email.validity.tooShort) {
//         // If the data is too short,
//         // display the following error message.
//         emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
//     }

//     // Set the styling appropriately
//     emailError.className = 'error active';
// }
