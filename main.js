const monsters = [];
let i = 0;
reset();

function attackRound() {
  const monster = monsters[i];
  const playerDamage = player.attack(monster);
  const monsterDamage = monster.attack(player);
  
  if (monster.isAlive) {
    updateMonsterDamageText(monsterDamage)
    if (player.isAlive) {
      updatePlayerDamageText(playerDamage);
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
      const droppedItemType = playerDamage;
      let droppedItem = '';
      if (droppedItemType === 'armor') {
        droppedItem = player.armor.name;
      } else if (droppedItemType === 'weapon') {
        droppedItem = player.weapon.name
      } else {
        droppedItem = '... an item you already had';
      }
      updateResult(`You slayed the monster and received ${droppedItem.toUpperCase()}! But you'll need it, because... here comes a BIGGER monster!`);
      updateInventory();
    }
  }

  updateHealthBars();
}

function getAttackDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateInventory() {
  document.querySelector('#weapon-name')
      .innerText = `${player.weapon.name[0].toUpperCase()}${player.weapon.name.slice(1)}.`;
  document.querySelector('#weapon-flavor-text')
    .innerText = player.weapon.flavorText;
  document.querySelector('#armor-name')
  .innerText = `${player.armor.name[0].toUpperCase()}${player.armor.name.slice(1)}.`;
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
    monsterDamageText += `The monster couldn't get through your armor!`;
  } else if (damage === 1) {
    monsterDamageText += `The monster barely scratched you with ${damage} damage.`
  } else if (damage < 4) {
    monsterDamageText += `The monster hit you for ${damage} damage`;
  } else {
    monsterDamageText += `The monster clobbered you with ${damage} damage.`;
  }
  
  document.querySelector('#player-damage-taken').innerText = monsterDamageText;
}

function updatePlayerDamageText(damage) {
  let playerDamageText = '';
  if (damage < 1) {
    playerDamageText += `You couldn't get through the monster's armor!.`;
  } else if (damage === 1) {
    playerDamageText += `You barely scratched the monster with ${damage} damage.`
  } else if (damage < 4) {
    playerDamageText += `You hit the monster for ${damage} damage`;
  } else {
    playerDamageText += `You clobbered the monster with ${damage} damage.`;
  }
  
  document.querySelector('#monster-damage-taken').innerText = playerDamageText;
}
    
function updateResult(result) {
  document.querySelector('#results').innerText = result;
}

function reset() {
  const fightButton = document.querySelector('#fight');
  fightButton.innerText = 'Start New Game';
  fightButton.onclick = startGame;

  player.reset();
  
  i = 0;
  monsters.splice(0);

  while (monsters.length < 8) {
    monsters.push(newMonster(monsters.length));
  }

  updateHealthBars();
  updateInventory();
}

function startGame() {
  const fightButton = document.querySelector('#fight');
  fightButton.onclick = attackRound;
  fightButton.innerText = 'Fight'
}
