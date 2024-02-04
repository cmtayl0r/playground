/* 
import { add, subtract } from './math.js';
import Modal from './modules/modal';
const myModal = new Modal();
*/

/* COMPONENTS */
import { Modal } from './modules/components/modal.js';

/*
ensures that the script runs after the HTML document has been fully loaded, preventing attempts to select elements before they exist
*/
document.addEventListener('DOMContentLoaded', () => {
    const modalInstance = new Modal();
});
