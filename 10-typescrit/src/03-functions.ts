function calculateAttack(baseDamage: number, multiplier:number):number{
    return baseDamage*multiplier;
}

const attack=calculateAttack(15,3);

const output03 = document.getElementById('output03');

if (output03){
    output03.innerHTML=`
        <li><b>Base Damage:</b> 15</li>
        <li><b>Multiplier:</b> 3</li>
        <li><b>Total Attack:</b> ${attack}</li>
    `; 
}