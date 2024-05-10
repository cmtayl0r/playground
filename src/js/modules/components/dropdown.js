// --------------------------------------------------------
// Dropdown Component
// --------------------------------------------------------
class Dropdown {
    constructor(trigger, dropdownData) {
        this.dropdownTrigger = trigger;
        this.dropdownData = dropdownData;
        this.dropdown = null; // Initialize the dropdown element holder
        this.bindEvents();
    }

    // Initialize the dropdown
    bindEvents() {
        // 01 - On trigger click, toggle the dropdown
        this.dropdownTrigger.addEventListener('click', event => {
            // Prevent the event from bubbling up to the document
            event.stopPropagation();
            // Prevent the default behavior of the trigger
            event.preventDefault();
            // Toggle the dropdown
            this.toggleDropdown();
        });
        // Add a click event listener to the document to hide the dropdown when clicked outside

        document.addEventListener(
            'click',
            this.handleOutsideClick.bind(this),
            false,
        );

        // document.addEventListener(
        //     'keydown',
        //     this.trapFocus(event).bind(this),
        //     false,
        // );
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

    // Handle keyboard events
    trapFocus(event) {
        // if the dropdown is not visible, do nothing
        if (this.dropdown.style.display !== 'block') return;

        // Get the first and last focusable elements in the dropdown
        const focusableElements = this.dropdown.querySelectorAll(
            'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement =
            focusableElements[focusableElements.length - 1];

        // Handle keyboard events
        switch (event.key) {
            case 'Tab':
                if (event.shiftKey) {
                    // if shift + tab, and the first focusable element is focused, move focus to the last focusable element
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    // if tab, and the last focusable element is focused, move focus to the first focusable element
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
                break;
            case 'Escape':
                // if escape, hide the dropdown and set aria-expanded to false
                this.dropdown.style.display = 'none';
                this.dropdownTrigger.setAttribute('aria-expanded', 'false');
                break;
            default:
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
