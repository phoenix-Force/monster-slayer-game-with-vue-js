let vm1 = new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		isRunningGame: false,
		turn: [],
		healcount: [],
		superAttackCount: new Array(3).fill(0, 0, 2)
	},
	methods: {
		start: function () {
			this.isRunningGame = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.healCountFunc()
		},
		attack: function () {
			let damage = this.calculateDamage(3, 10);
			this.monsterHealth -= damage;
			if (this.checkWin()) {
				return;
			}
			this.turn.unshift({
				player: true,
				text: 'player hits monster ' + damage
			});
			this.mAttack();
		},
		sattack: function () {
			let damage = this.calculateDamage(10, 15);
			this.monsterHealth -= damage
			if (this.checkWin()) {
				return;
			}
			this.turn.unshift({
				player: true,
				text: 'player hits monster ' + damage
			});
			this.mAttack();
		},
		mAttack: function () {
			let damage = this.calculateDamage(5, 12);
			this.turn.unshift({
				player: false,
				text: 'monster hits player for ' + damage
			});
			this.playerHealth -= damage;
			this.checkWin();
		},
		heal: function () {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.mAttack();
		},
		giveUp: function () {
			this.isRunningGame = false;
			this.turn = []
		},
		calculateDamage: function (min, max) {
			let damage = Math.max(Math.floor(Math.random() * max) + 1, min);
			return damage;
		},
		checkWin: function () {
			if (this.monsterHealth <= 0) {
				if (confirm('You win !! want to start new game')) {
					this.start();
				} else {
					isRunningGame = false;
				}

				return true;
			} else if (this.playerHealth <= 0) {
				if (confirm('You lost !! want to start new game')) {
					this.start();
				} else {
					isRunningGame = false;
				}

				return true;
			}
			return false;
		}
	}
});