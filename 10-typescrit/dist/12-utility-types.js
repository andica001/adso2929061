"use strict";
// Using Partial utility type
const update = { health: 80 };
const output12 = document.getElementById('output12');
if (output12) {
    output12.innerHTML = `
        <li><strong>Updated Property: </strong> health</li>
        <li><strong>New Value: </strong> ${update.health}</li>

    `;
}
