//Organize code in namespace

namespace Game{
    export const title='Hollow Knight: Silksong';
    export const protagonist='Hornet';
}

const output10 = document.getElementById('output10');

if(output10){
    output10.innerHTML = `
        <li><strong>Game:</strong> ${Game.title}</li>
        <li><strong>Hero:</strong> ${Game.protagonist}</li>

    `
}