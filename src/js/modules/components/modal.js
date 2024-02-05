'use strict';

// Use named export to export class in modules
export class Modal {
    // DATA
    constructor() {
        // DOM Selections
        this.modal = document.querySelector('#modal');
        this.btnsOpenModal = document.querySelectorAll('.show-modal');
        this.btnsCloseModal = document.querySelectorAll('.close-modal');
        // Helper variable for accessibility focus trap
        this.lastFocusedElement = null;
        // Bind the event listeners
        this.bindModalEvents();
    }
    // METHODS
    openModal() {
        this.modal.showModal(); // This adds the `open` dialog attribute
        this.modal.addEventListener(
            'animationend',
            () => {
                // Clear the animation style after it completes, to reset the state
                this.modal.style.animation = '';
            },
            { once: true }, // Ensure the listener is removed after it's invoked once
        );
        console.log('Modal open');

        // Accessibility focus management
        // Before opening the modal, save the current focused element
        this.lastFocusedElement = document.activeElement;
        // After displaying the modal, move the focus to the first focusable element inside the modal
        const firstFocusableElement = this.modal.querySelector(
            'a[href], button:not([disabled]), textarea, input, select',
        );
        if (firstFocusableElement) firstFocusableElement.focus();
    }
    closeModal() {
        this.modal.classList.add('closing'); // Trigger the fadeOut animation
        this.modal.addEventListener(
            'animationend',
            () => {
                this.modal.classList.remove('closing'); // Remove the class when animation ends
                this.modal.close(); // This removes the `open` dialog attribute
            },
            { once: true }, // Ensure the listener is removed after it's invoked once
        );
        console.log('Modal close');

        // Accessibility focus management
        // After closing the modal, return the focus to the element that had it before the modal was opened
        if (this.lastFocusedElement) this.lastFocusedElement.focus();
    }
    /*
    The trapFocus function is a critical part of making modals accessible. It ensures that when a modal is open, focus doesn't escape to the background content, which can be disorienting for keyboard and screen reader users. This function specifically handles focus trapping by ensuring that the focus stays within the modal when the user navigates through it using the Tab key.
    */
    trapFocus(event) {
        // Define all focusable elements inside the modal
        const focusableElements = this.modal.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select',
        );
        // Get the first focusable element in the modal.
        const firstFocusableElement = focusableElements[0];
        // Get the last focusable element in the modal.
        const lastFocusableElement =
            focusableElements[focusableElements.length - 1];

        // Check if the pressed key is 'Tab' (Tab has a keycode of 9).
        // This is the main part of trapping focus: you need to check if the user is navigating via the Tab key.
        if (event.key === 'Tab' || event.keyCode === 9) {
            if (event.shiftKey) {
                // Check if the Shift key is also pressed.
                // If Shift is held, it means the user is navigating backwards (Shift + Tab).
                if (document.activeElement === firstFocusableElement) {
                    // Move the focus to the last focusable element.
                    // This wraps the focus from the beginning of the modal to the end.
                    lastFocusableElement.focus();
                    // Prevent the default action (moving to the next focusable element in the DOM) to ensure that the focus moves within the modal.
                    event.preventDefault();
                }
            } else {
                // If Tab is pressed, move to the first focusable element if the current focus is on the last one
                if (document.activeElement === lastFocusableElement) {
                    // Move the focus to the first focusable element.
                    // This wraps the focus from the end of the modal to the beginning.
                    firstFocusableElement.focus();
                    // Prevent the default action to ensure that the focus moves within the modal.
                    event.preventDefault();
                }
            }
        }
    }
    bindModalEvents() {
        // EVENT BINDING
        // Group events binding inside a class can encapsulate
        // the logic for setting up event listeners,
        // keeping the constructor cleaner and more focused on initialization tasks

        // 01 - Open modal event listeners
        for (const btnOpen of this.btnsOpenModal) {
            btnOpen.addEventListener('click', () => this.openModal());
        }
        // 02 - Close modal event listeners
        for (const btnClose of this.btnsCloseModal) {
            btnClose.addEventListener('click', () => this.closeModal());
        }
        // 03 - Trap focus within modal
        this.modal.addEventListener('keydown', event => this.trapFocus(event));
        // 04 - Close modal when clicking on dialog backdrop area
        this.modal.addEventListener('click', e => {
            if (e.target === modal) {
                this.modal.close();
            }
        });
        // 05 - Esc key dismiss part of dialog
    }
    destroy() {
        // Remove event listeners that were added in bindModalEvents
        for (const btnOpen of this.btnsOpenModal) {
            btnOpen.removeEventListener('click', () => this.openModal());
        }
        for (const btnClose of this.btnsCloseModal) {
            btnClose.removeEventListener('click', () => this.closeModal());
        }
        // Remove event listener for trapping focus
        this.modal.removeEventListener('keydown', event =>
            this.trapFocus(event),
        );

        // Nullify references to DOM elements
        this.modal = null;
        this.btnsOpenModal = null;
        this.btnsCloseModal = null;

        console.log('Modal instance destroyed.');
    }
}

/*
//
// Non Class structure below
//

// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------

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

//

*/
