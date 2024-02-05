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
