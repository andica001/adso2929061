"use strict";
// Union types for attach 
function performAttack() {
    return "critical";
}
const result = performAttack();
const output07 = document.getElementById('output07');
if (output07) {
    output07.innerHTML = `
        <li><strong>Attack Result:</strong> ${result.toUpperCase()}</li>
    `;
}
