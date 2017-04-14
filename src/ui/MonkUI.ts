class MonkUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}

	private createView(): void {
		let monk = RESHelpers.createImg("monk_png", 150, 150);
		RESHelpers.addToParent(this, monk);
	}
}