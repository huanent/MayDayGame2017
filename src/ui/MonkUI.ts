class MonkUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}

	private createView(): void {
		let monk = RESHelpers.createImg("monk_png");
		RESHelpers.addToParent(this, monk);
		let monk2 = RESHelpers.createImg("monk2_png");
		RESHelpers.addToParent(this, monk2);
		monk2.visible = false;
		let timer = new egret.Timer(100, 0);
		timer.addEventListener(egret.TimerEvent.TIMER, () => {
			monk.visible = !monk.visible;
			monk2.visible = !monk2.visible;
		}, this)
		timer.start();
	}
}