'use strict';
// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------
const tabsContainer = document.querySelector('.tabs__container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panel');

// Add semantics role of tab list to ul
tabsList.setAttribute('role', 'tablist');

// Remove semantics role of the li's, so to ignore for screen readers in the tab list
tabsList.querySelectorAll('li').forEach(listItem => {
    listItem.setAttribute('role', 'presentation');
});

tabButtons.forEach((tab, index) => {
    // Add semantics role of "tab" to the a links
    tab.setAttribute('role', 'tab');
    if (index === 0) {
        // Set first tab as selected
        tab.setAttribute('aria-selected', 'true');
    } else {
        tab.setAttribute('tabindex', '-1');
        tabPanels[index].setAttribute('hidden', '');
    }
});

// Navigate via keyboard into the content of the visible tab
// Progressive enhancement technique, if no JS, tabindex handled by JS, so no negative effect if JS disabled
tabPanels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '0');
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

tabsContainer.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'Home':
            // Go to first tab
            evt.preventDefault();
            switchTab(tabButtons[0]);
            break;
        case 'End':
            // Go to last tab
            evt.preventDefault();
            switchTab(tabButtons[tabButtons.length - 1]);
            break;
    }
});

const moveLeft = function () {
    // Look at current active tab
    const currentTab = document.activeElement;
    // If at the furthest left tab, loop to end on the right
    if (!currentTab.parentElement.previousElementSibling) {
        switchTab(tabButtons[tabButtons.length - 1]);
    } else {
        // Find the previous a link using DOM traversal
        // PreviousElement will be the li
        switchTab(
            currentTab.parentElement.previousElementSibling.querySelector('a'),
        );
    }
};
const moveRight = function () {
    // Look at current active tab
    const currentTab = document.activeElement;
    // If at the furthest right tab, loop to start on the left
    if (!currentTab.parentElement.nextElementSibling) {
        switchTab(tabButtons[0]);
    } else {
        // Find the previous a link using DOM traversal
        // PreviousElement will be the li
        switchTab(
            currentTab.parentElement.nextElementSibling.querySelector('a'),
        );
    }
};

const switchTab = function (newTab) {
    // When click on a link, get href value (#xxxx)
    const activePanelId = newTab.getAttribute('href');
    // Make clicked link the active panel based on the id (#xxxx)
    const activePanel = tabsContainer.querySelector(activePanelId);
    // Loop through each of the buttons, set to assistive state
    tabButtons.forEach(button => {
        button.setAttribute('aria-selected', false);
        button.setAttribute('tabindex', '-1');
    });
    // Loop through each of the panels, set to hidden
    tabPanels.forEach(panel => {
        panel.setAttribute('hidden', true);
    });
    // Set the active panel as not hidden
    activePanel.removeAttribute('hidden');
    // Set clicked tab as selected
    newTab.setAttribute('aria-selected', true);
    newTab.setAttribute('tabindex', '0');
    newTab.focus();
    console.log(activePanelId);
};
