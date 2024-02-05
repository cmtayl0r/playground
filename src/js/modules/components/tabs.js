'use strict';
// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------
const tabsContainer = document.querySelector('.tabs__container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panel');

tabButtons.forEach((tab, index) => {
    if (index === 0) {
        //
    } else {
        tabPanels[index].setAttribute('hidden', '');
    }
});

tabsContainer.addEventListener('click', evt => {
    // If we don't click on a link, we don't want JS to do anything
    // Look for closest link when click, if not a link = null
    const clickedTab = evt.target.closest('a');
    // Guard clause, if no tab clicked (null), escape and don't do any more
    if (!clickedTab) return;
    // Prevent default behaviour of link, stop link jumping
    evt.preventDefault;
    // Helper Function for switching tab panels
    switchTab(clickedTab);
    //
});

const switchTab = function (newTab) {
    // When click on a link, get href value (#xxxx)
    const activePanelId = newTab.getAttribute('href');
    // Make clicked link the active panel based on the id (#xxxx)
    const activePanel = tabsContainer.querySelector(activePanelId);
    // Loop through each of the panels, set to hidden
    tabPanels.forEach(panel => {
        panel.setAttribute('hidden', true);
    });
    // Set the active panel as not hidden
    activePanel.removeAttribute('hidden');
    console.log(activePanelId);
};
