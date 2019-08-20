function newMonster(level) {
	return {
		level: level,
		isAlive: true,
		hitPoints: 30,
		attackMin: level,
		attackMax: (level + 1) * 2,
		armor: level,

		attack: function() {
			const baseAttack = this.getAttackDamage();
			return player.takeDamage(baseAttack);
		},
		
		getAttackDamage: function() {
			const range = this.attackMax - this.attackMin + 1;
			return Math.floor(Math.random() * range) + this.attackMin;
		},

		takeDamage(baseAttack) {
			const damageTaken = baseAttack - this.armor;
			this.hitPoints -= Math.max(damageTaken, 0);
			if (this.hitPoints <= 0) {
				this.isAlive = false;
				return this.dropItem();
			}

			return damageTaken;
		},

		dropItem: function() {
			if (Math.random() >= 0.5) {
				const randomArmor = Math.floor(Math.random() * armor.length + this.level);
				player.armor = armor[Math.min(randomArmor, armor.length - 1)]

				return `armor`;
			} else {
				const randomWeapon = Math.floor(Math.random() * weapons.length + this.level);
				player.weapon = weapons[Math.min(randomWeapon, weapons.length - 1)]

				return `weapon`;
			}
		}
	}
}