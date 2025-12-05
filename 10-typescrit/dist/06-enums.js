"use strict";
//Define Enemy types with enums
var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["flying"] = 0] = "flying";
    EnemyType[EnemyType["Grounds"] = 1] = "Grounds";
    EnemyType[EnemyType["Boss"] = 2] = "Boss";
})(EnemyType || (EnemyType = {}));
const currentEnemy = EnemyType.Grounds;
const output06 = document.getElementById('output06');
if (output06) {
    output06.innerHTML = `
        <li><b>Enemy Type:</b> ${EnemyType[currentEnemy]}</li>
        <li><b>Type Value:</b> ${currentEnemy}</li>
        
        `;
}
