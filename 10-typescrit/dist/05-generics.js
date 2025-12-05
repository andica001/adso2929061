"use strict";
//generic inventary for any type
class inventary {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }
}
const charmInventory = new inventary();
charmInventory.addItem('Mothwing Cloak');
charmInventory.addItem('Crystal Heart');
const output05 = document.getElementById('output05');
if (output05) {
    output05.innerHTML = `
        <li><b>Charms Collected:</b> ${null}</li>
        <ul>${charmInventory.getItems().map(c => `<li> ${c}</li>`).join('')}
        </ul>
        `;
}
