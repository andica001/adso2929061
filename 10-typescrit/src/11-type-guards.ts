//Type guard to check entity type

interface Player {name: string;}
interface Enemy {health: number;}

function isPlayer(entity: Player| Enemy): entity is Player{
    return (entity as Player).name !== undefined;
}

const entity: Player | Enemy = {name: "Hornet"};
const result11 = isPlayer(entity) ? "Player detected" : "Enemy detected";

const output11 = document.getElementById('output11');
if(output11){
    output11.innerHTML = `
        <li><strong>Entity type: </strong> ${result11}</li>

    `
}