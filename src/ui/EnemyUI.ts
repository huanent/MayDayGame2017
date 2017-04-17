class EnemyUI extends egret.Sprite {
	private enemy: egret.Bitmap;
	private enemy2: egret.Bitmap;
	private timer: egret.Timer;

	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		this.enemy = RESHelpers.createImg("enemy_png");
		RESHelpers.addToParent(this, this.enemy);
		this.enemy2 = RESHelpers.createImg("enemy2_png");
		RESHelpers.addToParent(this, this.enemy2);
		this.enemy2.visible = false;
		this.timer = new egret.Timer(100, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
			this.enemy.visible = !this.enemy.visible;
			this.enemy2.visible = !this.enemy2.visible;
		}, this)
		this.timer.start();
	}
	slip(x: number, y: number): void {
		this.timer.stop();
		this.enemy.visible = false;
		this.enemy2.visible = false;
		let enemy3 = RESHelpers.createImg("enemy_png");
		// var r = y * y * 90 / (y * y + x * x);
		// if (x == 0 && y > 0) {
		// 	r = 180;
		// }
		// else if (x == 0 && y < 0) {
		// 	r = 0;
		// }
		// else if (x > 0 && y > 0) {
		// 	r += 90;
		// }
		// else if (x > 0 && y == 0) {
		// 	r = 90;
		// }
		// else if (x < 0 && y == 0) {
		// 	r = 270;
		// }
		// else if (x < 0 && y < 0) {
		// 	r += 270;
		// } else if (x < 0 && y > 0) {
		// 	r += 180;
		// } else if (x > 0 && y > 0) {
		// 	r += 90;
		// }
		// enemy3.anchorOffsetX += enemy3.width / 2;
		// enemy3.anchorOffsetY += enemy3.height / 2;
		// enemy3.x += enemy3.width / 2;
		// enemy3.y += enemy3.height / 2;
		// enemy3.rotation = r;
		RESHelpers.addToParent(this, enemy3);
	}
}