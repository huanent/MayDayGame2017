class GameUI extends egret.Sprite {
	bg: egret.Bitmap;
	monk: MonkUI;
	barUI: BarUI;
	passTime: number = 0;//游戏时间
	enemys: Array<EnemyUI> = new Array<EnemyUI>();
	haveAddEnemyTask: boolean;
	gameIsOver: boolean;
	timers: Array<egret.Timer> = new Array<egret.Timer>();
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		this.addBg();
		this.addMonk();
		this.addBar();
		this.addEnemyTimer();
		this.addEnemyAction();
	}

	private addBg(): void {
		let bg = this.bg = RESHelpers.createImg("game_bg_png", AlignHelpers.stageWidth, AlignHelpers.stageHeight);
		RESHelpers.addToParent(this, bg);
	}

	private addMonk(): void {
		let monk = this.monk = new MonkUI();
		let bg = this.bg
		RESHelpers.addToParent(this, monk, Align.bottomCenter, null, () => {
			monk.y -= 100;
		})
		bg.touchEnabled = true;
		let moveMonk: Function = (e: egret.TouchEvent) => {
			let x = e.stageX - monk.x - monk.width / 2;
			let y = e.stageY - monk.y - - monk.height / 2;
			let length = Math.sqrt(x * x + y * y);
			egret.Tween.get(monk)
				.to({ x: e.stageX - monk.width / 2, y: e.stageY - monk.height / 2 }, length / 3)
		}
		bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, moveMonk, this);
		bg.addEventListener(egret.TouchEvent.TOUCH_TAP, moveMonk, this);
	}

	private addBar(): void {
		let barUI = this.barUI = new BarUI();
		RESHelpers.addToParent(this, barUI);
		let timer = new egret.Timer(100, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, () => {
			this.passTime += 0.1;
			barUI.setTime(this.passTime);
		}, this)
		this.timers.push(timer);
		timer.start();
	}

	private addEnemy(): void {
		let enemy = new EnemyUI();
		let monk = this.monk;
		if (Helpers.getRandomNum(0, 1) == 1) {
			enemy.x = AlignHelpers.stageWidth;
		}
		else {
			enemy.x -= enemy.width;
		}
		enemy.y = Helpers.getRandomNum(0, AlignHelpers.stageHeight - enemy.height);
		enemy.visible = true;
		this.addChild(enemy);
		this.enemys.push(enemy);
		this.enemyHit(enemy);
	}

	private addEnemyAction(): void {
		let timer = new egret.Timer(20, 0);
		let toLength = AlignHelpers.stageHeight + AlignHelpers.stageWidth;
		let speed = 4;
		timer.addEventListener(egret.TimerEvent.TIMER, () => {
			this.enemys.forEach(element => {
				let x = this.monk.x - element.x;
				let y = this.monk.y - element.y;
				let s = Math.sqrt(x * x + y * y);
				if (s < 350) {
					let toX = toLength / (1 + Math.abs(y / x));
					if (this.monk.x < element.x) toX = -toX;
					let toY = toLength / (1 + Math.abs(x / y));
					if (this.monk.y < element.y) toY = -toY;
					egret.Tween
						.get(element)
						.to({ x: element.x + toX, y: element.y + toY }, 2000)
						.call(() => {
							super.removeChild(element);
						})
					this.enemys.splice(this.enemys.indexOf(element), 1);
				} else {
					if (x > speed || x < -speed) {
						element.x += this.monk.x > element.x ? speed : -speed;
					}
					if (y > speed || y < -speed) {
						element.y += this.monk.y > element.y ? speed : -speed;
					}
				}

			});
		}, this)
		this.timers.push(timer);
		timer.start();
	}

	private addEnemyTimer(): void {
		let timer = new egret.Timer(100, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, () => {
			if (!this.haveAddEnemyTask && this.enemys.length == 0) {
				this.haveAddEnemyTask = true;
				egret.Tween.get(timer).wait(2500).call(() => {
					let enemyNum = 0;
					if (this.passTime < 25) enemyNum = Helpers.getRandomNum(2, 3);
					else if (this.passTime >= 25 && this.passTime < 50) enemyNum = Helpers.getRandomNum(3, 4);
					else if (this.passTime > 50) enemyNum = Helpers.getRandomNum(4, 5);
					for (let i = 0; i < enemyNum; i++) {
						this.addEnemy();
					}
					this.haveAddEnemyTask = false;
				})
			}
		}, this)
		this.timers.push(timer);
		timer.start();
	}

	private enemyHit(enemy: EnemyUI): void {
		let timer = new egret.Timer(10, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, () => {
			let monk = this.monk;
			let isHit = enemy.hitTestPoint(monk.x + monk.width / 2, monk.y + monk.height / 2);
			if (isHit && !this.gameIsOver) {
				this.gameIsOver = true;
				this.timers.forEach(element => {
					element.stop();
				});
				alert("gameover")
			}
		}, this)
		this.timers.push(timer)
		timer.start();
	}
}