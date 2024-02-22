const passwordBtn = document.getElementById('password-eye');

// SHow and hide password input
passwordBtn.addEventListener('click', e => {
    // Input and Icon DOM
    const passwordInput = document.getElementById('password');
    const icon = passwordBtn.querySelector('i');

    // Check if <i> has class, if yes, true = visible
    const isVisible = icon.classList.contains('ri-eye-line');
    // Ternary operator to change input type from password to text
    // if isVisible not true, input type = password, etc
    passwordInput.type = isVisible ? 'password' : 'text';
    // if isVisible not true, input type = password, show eye-off icon, etc
    icon.setAttribute('class', isVisible ? 'ri-eye-off-line' : 'ri-eye-line');
});
