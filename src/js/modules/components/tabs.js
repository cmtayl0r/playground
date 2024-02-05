'use strict';
// -----------------------------------------------------------------------------
// DOM SELECTIONS
// -----------------------------------------------------------------------------
const tabsContainer = document.querySelector('.tabs__container');
const tabsList = tabsContainer.querySelector('ul');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panel');

// -----------------------------------------------------------------------------
// ATTRIBUTE SETTING
// -----------------------------------------------------------------------------

// Set the 'role' attribute of 'tabsList' to 'tablist' (ul)
// indicating its role in accessibility features
tabsList.setAttribute('role', 'tablist');

// For each 'li' element in 'tabsList', set its 'role' attribute to 'presentation'
// indicating it should be ignored by screen readers
tabsList.querySelectorAll('li').forEach(listItem => {
    listItem.setAttribute('role', 'presentation');
});

// For each tab button, assign the role of 'tab'
// manage its selected state and visibility
tabButtons.forEach((tab, index) => {
    // Set the 'role' attribute of each tab link to 'tab'
    tab.setAttribute('role', 'tab');
    if (index === 0) {
        // For the first tab, set it as selected by setting 'aria-selected' attribute to 'true'
        tab.setAttribute('aria-selected', 'true');
    } else {
        // For other tabs, make them not focusable by setting 'tabindex' to '-1'
        // and set their corresponding panels as hidden
        tab.setAttribute('tabindex', '-1');
        tabPanels[index].setAttribute('hidden', '');
    }
});

// Set each tab panel's role to 'tabpanel'
// make it focusable by setting 'tabindex' to '0'
// Setting tabindex in JS has no negative effect to tab order, if no javascript
tabPanels.forEach(panel => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '0');
});

// -----------------------------------------------------------------------------
// TAB NAVIGATION
// -----------------------------------------------------------------------------

// Add a click event listener to 'tabsContainer'
tabsContainer.addEventListener('click', evt => {
    // Get the closest ancestor 'a' element of the clicked target, or null if none
    const clickedTab = evt.target.closest('a');
    // Guard clause
    // If no tab was clicked (i.e., 'clickedTab' is null), return early from the function
    if (!clickedTab) return;
    // Prevent the default action of the clicked link (stop link jumping)
    evt.preventDefault;
    // Call 'switchTab' to switch to the clicked tab
    switchTab(clickedTab);
});

// Add a keydown event listener to 'tabsContainer' for keyboard navigation
tabsContainer.addEventListener('keydown', evt => {
    switch (evt.key) {
        case 'ArrowLeft':
            moveLeft(); // Call 'moveLeft' to move focus to the previous tab
            break;
        case 'ArrowRight':
            moveRight(); // Call 'moveRight' to move focus to the next tab
            break;
        case 'Home':
            evt.preventDefault(); // Prevent the default action
            switchTab(tabButtons[0]); // Switch to the first tab
            break;
        case 'End':
            evt.preventDefault(); // Prevent the default action
            switchTab(tabButtons[tabButtons.length - 1]); // Switch to the last tab
            break;
    }
});

// Define 'moveLeft' function to move focus to the previous tab or loop around to the last tab
const moveLeft = function () {
    // Get the currently focused element
    const currentTab = document.activeElement;
    // If at the furthest left tab, loop to end on the right
    // If there is no previous sibling (we are at the first tab)
    if (!currentTab.parentElement.previousElementSibling) {
        // Loop around and focus the last tab
        switchTab(tabButtons[tabButtons.length - 1]);
    } else {
        // Otherwise, focus the previous tab (using DOM traversal)
        // PreviousElement will be the li
        switchTab(
            currentTab.parentElement.previousElementSibling.querySelector('a'),
        );
    }
};

// Define 'moveRight' function to move focus to the next tab or loop around to the first tab
const moveRight = function () {
    // Get the currently focused element
    const currentTab = document.activeElement;
    // If there is no next sibling (we are at the last tab)
    if (!currentTab.parentElement.nextElementSibling) {
        // Loop around and focus the first tab
        switchTab(tabButtons[0]);
    } else {
        // Otherwise, focus the previous tab (using DOM traversal)
        switchTab(
            currentTab.parentElement.nextElementSibling.querySelector('a'),
        );
    }
};

// Define 'switchTab' function to switch between tabs and manage visibility of tab panels
const switchTab = function (newTab) {
    // Get the 'href' attribute of the clicked tab
    const activePanelId = newTab.getAttribute('href');
    // Find the corresponding panel for the clicked tab (based on the id)
    const activePanel = tabsContainer.querySelector(activePanelId);
    // Loop through each of the buttons
    // Set all tab buttons to non-selected and not focusable
    tabButtons.forEach(button => {
        button.setAttribute('aria-selected', false);
        button.setAttribute('tabindex', '-1');
    });
    // Loop through each of the panels
    // Set all panels to hidden
    tabPanels.forEach(panel => {
        panel.setAttribute('hidden', true);
    });
    // Make the active panel visible and the clicked tab selected and focusable
    activePanel.removeAttribute('hidden');
    newTab.setAttribute('aria-selected', true);
    newTab.setAttribute('tabindex', '0');
    // Set focus to the new tab
    newTab.focus();
};
