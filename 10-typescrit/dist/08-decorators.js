"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//simple class decorator
function PowerUp(constructor) {
    constructor.prototype.powered = true;
}
let Character = class Character {
    constructor() {
        this.name = "hornet";
    }
};
Character = __decorate([
    PowerUp
], Character);
const hornet = new Character();
const output08 = document.getElementById('output08');
if (output08) {
    output08.innerHTML = `
        <li><strong>Character:</strong> ${hornet.name}</li>
        <li><strongPowered Up:</strong> ${hornet.powered}</li>
    `;
}
