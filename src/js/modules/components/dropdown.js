// --------------------------------------------------------
// Dropdown Component
// --------------------------------------------------------
class Dropdown {
    constructor(trigger, dropdownData) {
        // The trigger element that will open the dropdown
        this.dropdownTrigger = trigger;
        // Data to populate the dropdown
        this.dropdownData = dropdownData;
        // set to null initially because the dropdown does not exist yet
        this.dropdown = null;
        this.initDropdown();
    }

    // Initialize the dropdown
    initDropdown() {
        // 01 - On trigger click, toggle the dropdown
        this.dropdownTrigger.addEventListener('click', event => {
            // Prevent the event from bubbling up to the document
            event.stopPropagation();
            // Prevent the default behavior of the trigger
            event.preventDefault();
            // Toggle the dropdown
            this.toggleDropdown();
            if (this.dropdown.style.display === 'block') {
                // If the dropdown is visible, trap focus
                this.trapFocus();
            }
        });
        // Add a click event listener to the document to hide the dropdown when clicked outside
        document.addEventListener(
            'click',
            this.handleOutsideClick.bind(this),
            false,
        );
    }

    // Create the dropdown element
    createDropdown() {
        // if dropdown is already open, do nothing
        if (this.dropdown) return;

        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown__content');
        const dropdownList = document.createElement('ul');
        dropdownList.classList.add('dropdown__list');
        dropdown.appendChild(dropdownList);

        // alternate method of injection of HTML markup
        // dropdown.innerHTML = `
        //     <ul class="dropdown__list">
        //         ${this.dropdownData.map(link => `<li><a href="${link.url}">${link.text}</a></li>`).join('')}
        //     </ul>
        // `;

        this.dropdownData.forEach(item => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = item.url;
            link.textContent = item.text; // safer than innerHTML
            listItem.appendChild(link);
            dropdownList.appendChild(listItem);
        });

        // Insert the dropdown after the trigger element
        this.dropdownTrigger.parentNode.insertBefore(
            dropdown,
            this.dropdownTrigger.nextSibling,
        );
        // Set the dropdown to the instance because we need to reference it later to toggle visibility
        this.dropdown = dropdown;
    }

    // Toggle dropdown visibility
    toggleDropdown() {
        // If dropdown does not exist, create it
        if (!this.dropdown) {
            this.createDropdown();
        }

        const isOpen = this.dropdown.style.display === 'block';
        this.dropdown.style.display = isOpen ? 'none' : 'block';
        // set attribute to aria-expanded if dropdown is visible
        this.dropdownTrigger.setAttribute('aria-expanded', !isOpen);
    }

    // Hide dropdown when clicked outside
    handleOutsideClick(event) {
        // if dropdown exists and the click target is not the trigger or the dropdown
        if (
            this.dropdown &&
            !this.dropdown.contains(event.target) &&
            !this.dropdownTrigger.contains(event.target)
        ) {
            // then hide the dropdown and set aria-expanded to false
            this.dropdown.style.display = 'none';
            this.dropdownTrigger.setAttribute('aria-expanded', 'false');
        }
    }

    // Trap focus within the dropdown
    trapFocus() {
        this.dropdown.addEventListener('keydown', event => {
            // Call handleKeydown method
            this.handleKeydown(event);
        });
    }

    // Handle keydown events
    handleKeydown(event) {
        const focusableElements = this.dropdown.querySelectorAll(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement =
            focusableElements[focusableElements.length - 1];

        switch (event.key) {
            case 'Escape':
                this.dropdown.style.display = 'none';
                this.dropdownTrigger.setAttribute('aria-expanded', 'false');
                this.dropdownTrigger.focus();
                break;
            case 'Tab':
                if (
                    // If the dropdown is open and the shift key is pressed
                    event.shiftKey &&
                    document.activeElement === firstFocusableElement
                ) {
                    // If the first focusable element is focused, move focus to the last focusable element
                    event.preventDefault();
                    lastFocusableElement.focus();
                } else if (
                    // If the dropdown is open and the shift key is not pressed
                    !event.shiftKey &&
                    document.activeElement === lastFocusableElement
                ) {
                    // If the last focusable element is focused, move focus to the first focusable element
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
                break;
        }
    }
}

// --------------------------------------------------------
// DUMMY DATA
// --------------------------------------------------------

// Dummy data to populate dropdowns
const linksData1 = [
    {
        text: 'Link 1',
        url: '#',
    },
    {
        text: 'Link 2',
        url: '#',
    },
    {
        text: 'Link 3',
        url: '#',
    },
    {
        text: 'Link 4',
        url: '#',
    },
    {
        text: 'Link 5',
        url: '#',
    },
];

// --------------------------------------------------------
// INITIALIZATION
// --------------------------------------------------------

// Instantiate Dropdown for each trigger with different data
const trigger1 = document.querySelector('#dropdown1');
const trigger2 = document.querySelector('#dropdown2');
new Dropdown(trigger1, linksData1);
new Dropdown(trigger2, linksData1);
