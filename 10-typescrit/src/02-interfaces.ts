// Define weapon structure

interface Weapon {
    name: string;
    damage: number;
    range: number;
}

const needle: Weapon = {
    name: 'Silken Needle',
    damage: 15,
    range: 3
}

const output02 = document.getElementById('output02');

if(output02) {
    output02.innerHTML = `
        <li><b>Weapon:</b>        ${needle.name}</li>
    <li><b>Damage:</b>           ${needle.damage}</li>
    <li><b>Range:</b>   ${needle.range}</li>
    `
}