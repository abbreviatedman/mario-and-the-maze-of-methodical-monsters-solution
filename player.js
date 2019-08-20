const player =  {
	hitPoints: 100,
	attackMin: 0,
	attackMax: 3,
	level: 1,
	armor: armor[0],
	weapon: weapons[0],
	isAlive: true,

	attack: function(monster) {
		const baseAttack = this.getAttackDamage();
		return monster.takeDamage(baseAttack);
	},
	
	getAttackDamage: function() {
		const range = this.attackMax - this.attackMin + 1;
		return Math.floor(Math.random() * range)
			+ this.attackMin
			+ this.level
			+ this.weapon.attackBonus;
	},

	takeDamage(baseAttack) {
		const damageTaken = baseAttack - this.armor.armorBonus
		this.hitPoints -= Math.max(damageTaken, 0);
		if (this.hitPoints <= 0) {
			this.isAlive = false;
		}

		return damageTaken;
	},

	levelUp() {
		this.level++;
		this.attackMax++;
	},

	reset: function() {
		player.hitPoints = 100;
		player.attackMin = 3;
		player.attackMax = 5;
		player.level = 1;
		player.armor = armor[0];
		player.weapon = weapons[0];
		player.isAlive = true;
	}
}