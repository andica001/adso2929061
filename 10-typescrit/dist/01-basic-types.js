"use strict";
//Basic types: String number, boolean, array, tuple, any
const CharacterName = 'Hornet';
const health = 100;
const canDoubleJump = false;
const tools = ['Tacks', 'Curveclaw', 'Cogly'];
const memoryLockeds = [1, 'Bone Bottom'];
const firstSkill = 'Dash';
const output01 = document.getElementById('output01');
if (output01) {
    output01.innerHTML = `
        <li><b>Character:</b> ${CharacterName}</li>
        <li><b>Healt:</b> ${health}</li>
        <li><b>Can Doble Jump:</b> ${canDoubleJump}</li>
        <li><b>Tools:</b> ${tools}</li>
        <li><b>Memory Lockeds:</b> ${memoryLockeds}</li>
        <li><b>First Skills:</b> ${firstSkill}</li>
    `;
}
