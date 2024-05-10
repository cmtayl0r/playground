// --------------------------------------------------------
// Dropdown Component
// --------------------------------------------------------
class Dropdown {
    constructor(trigger, dropdownData) {
        this.dropdownTrigger = trigger;
        this.dropdownData = dropdownData;
        this.dropdown = null; // Initialize the dropdown element holder
        this.init();
    }

    // Initialize the dropdown
    init() {
        // On trigger click, toggle the dropdown
        this.dropdownTrigger.addEventListener('click', event => {
            // Toggle the dropdown
            this.toggleDropdown(event);
            // Prevent the default behavior of the trigger
            event.stopPropagation();
        });
        // Add a click event listener to the document to hide the dropdown when clicked outside
        // false parameter is to use bubbling instead of capturing
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
        dropdown.innerHTML = `
            <ul class="dropdown__list">
                ${this.dropdownData.map(link => `<li><a href="${link.url}">${link.text}</a></li>`).join('')}
            </ul>
        `;
        // Insert the dropdown after the trigger element
        this.dropdownTrigger.parentNode.insertBefore(
            dropdown,
            this.dropdownTrigger.nextSibling,
        );
        // Set the dropdown to the instance because we need to reference it later to toggle visibility
        this.dropdown = dropdown;
    }

    // Toggle dropdown visibility
    toggleDropdown(event) {
        // If dropdown does not exist, create it
        if (!this.dropdown) {
            this.createDropdown();
        }

        // if dropdown visible set trigger to active state
        this.dropdownTrigger.classList.toggle('active');
        // if dropdown is block, hide it, otherwise show it
        this.dropdown.style.display =
            this.dropdown.style.display === 'block' ? 'none' : 'block';
        // set aria-expanded attribute to true if dropdown is visible
        this.dropdownTrigger.setAttribute(
            'aria-expanded',
            this.dropdown.style.display === 'block',
        );
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
