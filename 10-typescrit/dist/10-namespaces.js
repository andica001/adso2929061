"use strict";
//Organize code in namespace
var Game;
(function (Game) {
    Game.title = 'Hollow Knight: Silksong';
    Game.protagonist = 'Hornet';
})(Game || (Game = {}));
const output10 = document.getElementById('output10');
if (output10) {
    output10.innerHTML = `
        <li><strong>Game:</strong> ${Game.title}</li>
        <li><strong>Hero:</strong> ${Game.protagonist}</li>

    `;
}
