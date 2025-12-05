//Define Enemy types with enums

enum EnemyType{
    flying,
    Grounds,
    Boss
}

const currentEnemy= EnemyType.Grounds;

const output06 = document.getElementById('output06');
if (output06){
    output06.innerHTML=`
        <li><b>Enemy Type:</b> ${EnemyType[currentEnemy]}</li>
        <li><b>Type Value:</b> ${currentEnemy}</li>
        
        `;
}