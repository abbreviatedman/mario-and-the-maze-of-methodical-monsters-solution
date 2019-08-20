const player =  {
	hitPoints: 100,
	attackMin: 3,
	attackMax: 5,
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
		this.hitPoints -= damageTaken;
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
		player.isAlive = true;
		player.hitPoints = 100;
	}
}