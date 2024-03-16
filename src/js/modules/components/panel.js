// TODO: trap focus in sidebar like modal

// -----------------------------------------------------------------------------
// DOM ELEMENTS
// -----------------------------------------------------------------------------

class Sidebar {
    constructor() {
        this.sidebarToggle = document.querySelector('.sidebar--toggle');
        this.sidebarClose = document.querySelector('.sidebar--close');
        this.sidebar = document.querySelector('.sidebar');
        this.overlay = document.querySelector('.overlay');

        // Enable keyboard navigation in sidebar
        this.toggleTabIndices(false);

        // Bind event listeners
        this.bindEvents();
    }

    openSidebar() {
        console.log('OPEN!');
        // show sidebar and overlay
        this.sidebar.classList.add('show');
        this.overlay.classList.add('show');

        // set aria attributes
        this.sidebar.setAttribute('aria-hidden', 'false');
        this.sidebarToggle.setAttribute('aria-expanded', 'true');

        // clear animation when done
        this.sidebar.addEventListener(
            'animationend',
            () => {
                this.sidebar.style.animation = '';
                this.overlay.style.animation = '';
            },
            { once: true },
        );

        // enable keyboard navigation in sidebar
        this.toggleTabIndices(false);
    }
    closeSidebar() {
        console.log('CLOSE!');
        // hide sidebar and overlay
        this.sidebar.classList.remove('show');
        this.overlay.classList.remove('show');
        this.sidebar.classList.add('closing');
        this.overlay.classList.add('closing');

        // set aria attributes
        this.sidebar.setAttribute('aria-hidden', 'true');
        this.sidebarToggle.setAttribute('aria-expanded', 'false');

        // clear closing when done
        this.sidebar.addEventListener(
            'animationend',
            () => {
                this.sidebar.classList.remove('closing');
                this.overlay.classList.remove('closing');
            },
            { once: true },
        );

        // disable keyboard navigation in sidebar
        this.toggleTabIndices(true);
    }

    toggleTabIndices(disable) {
        const focusableElements = Array.from(
            this.sidebar.querySelectorAll('a, button, input, select, textarea'),
        );
        focusableElements.forEach(el => {
            if (disable) {
                el.setAttribute('tabindex', '-1');
            } else {
                el.removeAttribute('tabindex');
            }
        });
    }
    bindEvents() {
        // Bind event listeners
        this.sidebarToggle.addEventListener(
            'click',
            this.openSidebar.bind(this),
        );
        this.sidebarClose.addEventListener(
            'click',
            this.closeSidebar.bind(this),
        );
        this.overlay.addEventListener('click', this.closeSidebar.bind(this));
        // Close sidebar on escape key
        document.addEventListener('keydown', e => {
            if (
                (e.key === 'Escape' || e.key === 'Esc') &&
                this.sidebar.classList.contains('show')
            ) {
                this.closeSidebar();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Sidebar();
});
