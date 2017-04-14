class EnemyUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let enemy = RESHelpers.createImg("enemy_png", 150, 150);
		RESHelpers.addToParent(this, enemy);
	}
}