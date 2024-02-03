'use strict';

// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnsCloseModal = document.querySelectorAll('.close-modal');

// IF one single close modal button
// const btnCloseModal = document.querySelector('.close-modal');

// -----------------------------------------------------------------------------
// MODAL FUNCTIONS
// -----------------------------------------------------------------------------
let lastFocusedElement;

// OPEN MODEL
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    console.log('Modal open');

    // Accessibility focus management
    // Before opening the modal, save the current focused element
    lastFocusedElement = document.activeElement;
    // After displaying the modal, move the focus to the modal container
    modal.focus();
};

// CLOSE MODAL
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    console.log('Modal close');

    // Accessibility focus management
    // After closing the modal, return the focus to the element
    // that had it before the modal was opened
    if (lastFocusedElement) lastFocusedElement.focus();
};

// TRAP FOCUS IN MODAL
// Ensure that while the modal is open,
// tabbing through the elements doesn't move the focus outside the modal
const trapFocus = function (event) {
    // Define all focusable elements inside the modal
    const focusableElements = modal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select',
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

    // Check if Tab or Shift+Tab is pressed
    if (event.key === 'Tab' || event.keyCode === 9) {
        if (event.shiftKey) {
            // If Shift+Tab is pressed, move to the last focusable element if the current focus is on the first one
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else {
            // If Tab is pressed, move to the first focusable element if the current focus is on the last one
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
    }
};

// -----------------------------------------------------------------------------
// EVENT BINDING
// -----------------------------------------------------------------------------

// Function to bind all event listeners related to the modal
const bindModalEvents = function () {
    // Loop through each button that can open the modal
    for (const btnOpen of btnsOpenModal) {
        btnOpen.addEventListener('click', openModal);
    }
    // Loop through each button that can close the modal
    for (const btnClose of btnsCloseModal) {
        btnClose.addEventListener('click', closeModal);
    }

    // Add the trapFocus function as an event listener when the modal is opened
    modal.addEventListener('keydown', trapFocus);

    // IF one single close modal button
    // btnCloseModal.addEventListener('click', closeModal);

    // Add an event listener to the overlay to close the modal on click (clicking outside the modal)
    overlay.addEventListener('click', closeModal);

    // Add an event listener to the whole document for keydown events
    document.addEventListener('keydown', function (e) {
        // Check if the pressed key is 'Escape' and the modal is not already hidden
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
};

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------
export { bindModalEvents };
