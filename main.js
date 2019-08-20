const fightButton = document.querySelector('#fight')
fightButton.onclick = attackRound;

const monsters = [];

while (monsters.length < 5) {
  monsters.push(newMonster(monsters.length));
}

let i = 0;

function attackRound() {
  const monster = monsters[i];
  const playerDamage = player.attack(monster);
  updatePlayerDamageText(playerDamage);
  const monsterDamage = monster.attack(player);

  if (monster.isAlive) {
    updateMonsterDamageText(monsterDamage)
    if (player.isAlive) {
      updateResult(`You and the monster trade blows!`)
    } else {
      updateResult('You died! Game over...');
      reset();
    }
  } else {
    i++;
    if (i >= monsters.length) {
      updateResult('You beat all the monsters! You win!');
      reset();
    } else {
      updateResult('You slayed the monster! But here comes another...');
      updateInventory();
    }
  }

  updateHealthBars();
}

function getAttackDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateHealthBars() {
  const monster = monsters[i];
  const playerHealth = document.querySelector('#player-health');
  const monsterHealth = document.querySelector('#monster-health');
  const playerPicture = document.querySelector('#player');

  playerPicture.style.transform = `rotate(${player.hitPoints * 9 / 10 - 90}deg)`

  playerHealth.innerText = `${player.hitPoints}`
  playerHealth.style.width = `${player.hitPoints * 2}px`;

  monsterHealth.innerText = `${monster.hitPoints}`
  monsterHealth.style.width = `${monster.hitPoints * 2}px`;
}

function updateMonsterDamageText(damage) {
  let monsterDamageText = '';
  if (damage < 1) {
    monsterDamageText += `The monster barely scratched you with ${damage}.`;
  } else if (damage < 4) {
    monsterDamageText += `The monster hit you for ${damage}`;
  } else {
    monsterDamageText += `The monster clobbered you with ${damage}.`;
  }
  
  document.querySelector('#player-damage-taken').innerText = monsterDamageText;
}

function updatePlayerDamageText(damage) {
  let playerDamageText = '';
  if (damage < 1) {
    playerDamageText += `You barely scratched the monster with ${damage}.`;
  } else if (damage < 4) {
    playerDamageText += `You hit the monster for ${damage}`;
  } else {
    playerDamageText += `You clobbered the monster with ${damage}.`;
  }
  
  document.querySelector('#monster-damage-taken').innerText = playerDamageText;
}
    
function updateResult(result) {
  document.querySelector('#results').innerText = result;
}

function reset() {
  fightButton.innerText = 'Start Over';
  fightButton.onclick = startOver;

  player.reset();
  i = 0;
  monsters.splice(0);

  while (monsters.length < 5) {
    monsters.push(newMonster(monsters.length));
  }

  updateHealthBars();
}

function startOver() {
  fightButton.onclick = attackRound;
  fightButton.innerText = 'Fight'
}