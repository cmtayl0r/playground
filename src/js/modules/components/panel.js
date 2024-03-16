// -----------------------------------------------------------------------------
// DOM ELEMENTS
// -----------------------------------------------------------------------------

class Sidebar {
    constructor() {
        this.sidebarToggle = document.querySelector('.sidebar--toggle');
        this.sidebarClose = document.querySelector('.sidebar--close');
        this.sidebar = document.querySelector('.sidebar');
        this.overlay = document.querySelector('.overlay');

        // Bind event listeners
        this.bindEvents();
    }

    openSidebar() {
        this.sidebar.classList.add('show');
        this.overlay.classList.add('show');
        // clear animation
        this.sidebar.addEventListener(
            'animationend',
            () => {
                this.sidebar.style.animation = '';
                this.overlay.style.animation = '';
            },
            { once: true },
        );
    }
    closeSidebar() {
        this.sidebar.classList.remove('show');
        this.overlay.classList.remove('show');
        this.sidebar.classList.add('closing');
        this.overlay.classList.add('closing');
        // clear closing when done
        this.sidebar.addEventListener(
            'animationend',
            () => {
                this.sidebar.classList.remove('closing');
                this.overlay.classList.remove('closing');
            },
            { once: true },
        );
    }
    bindEvents() {
        this.sidebarToggle.addEventListener(
            'click',
            this.openSidebar.bind(this),
        );
        this.sidebarClose.addEventListener(
            'click',
            this.closeSidebar.bind(this),
        );
        this.overlay.addEventListener('click', this.closeSidebar.bind(this));

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

// sidebarToggle.addEventListener('click', () => {
//     console.log('TOGGLE!');
//     sidebar.classList.contains('show')
//         ? sidebar.classList.remove('show')
//         : sidebar.classList.add('show');
//     overlay.classList.contains('show')
//         ? overlay.classList.remove('show')
//         : overlay.classList.add('show');
// });

// sidebarClose.addEventListener('click', () => {
//     console.log('CLOSE!');
//     // remove show
//     sidebar.classList.remove('show');
//     overlay.classList.remove('show');
//     // add closing
//     sidebar.classList.add('closing');
//     overlay.classList.add('closing');
//     // clear closing when done
//     sidebar.addEventListener('animationend', () => {
//         sidebar.classList.remove('closing');
//         overlay.classList.remove('closing');
//     });
// });
