/* 
import { add, subtract } from './math.js';
import Modal from './modules/modal';
const myModal = new Modal();
*/

// COMPONENTS
import { Modal } from './modules/components/modal.js';

// INITIALIZER
class App {
    constructor() {
        // Bind the onDomContentLoaded method to ensure it has the correct 'this' context
        // This ensures that the script runs after the HTML document has been fully loaded
        // preventing attempts to select elements before they exist
        this.onDomContentLoaded = this.onDomContentLoaded.bind(this);
        this.destroy = this.destroy.bind(this);

        // Set up the DOMContentLoaded listener
        document.addEventListener('DOMContentLoaded', this.onDomContentLoaded);
    }
    onDomContentLoaded() {
        // Initialize static components that are always needed
        this.modalInstance = new Modal();
        // ... Initialize other static components
        // Lazy load and initialize components based on certain events or conditions.
        this.initializeLazyComponents();
    }
    async initializeLazyComponents() {
        // Lazy load
    }
    destroy() {
        // Remove global event listeners
        document.removeEventListener(
            'DOMContentLoaded',
            this.onDomContentLoaded,
        );
        // Call destroy on static components if they have cleanup logic
        if (this.modalInstance) this.modalInstance.destroy();
        console.log('App cleaned up.');
    }
}

// Create an instance of the App class, initializing the application.
const myApp = new App();
