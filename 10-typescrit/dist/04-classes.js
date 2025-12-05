"use strict";
//Enemy Class
class Enemy {
    constructor(name, healt) {
        this.name = name;
        this.healt = healt;
    }
    takeDamage(damage) {
        this.healt -= damage;
    }
}
const enemigo = new Enemy('Covenant', 100);
const output04 = document.getElementById('output04');
if (output04) {
    output04.innerHTML = `
        <li><b>Enemigo:</b> ${enemigo.name}</li>
        <li><b>Salud inicial:</b> ${enemigo.healt}</li>
        `;
    enemigo.takeDamage(15);
    output04.innerHTML += `
        <li><b>Salud final:</b> ${enemigo.healt}</li>
    `;
}
