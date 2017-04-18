class HelpUI extends egret.Sprite {
	public constructor() {
		super();
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		let img = RESHelpers.createImg("rules_bg@2x_png");
		RESHelpers.addToParent(this, img, Align.center, AlignContainer.stage);
		bg.touchEnabled = true;
		bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this)
	}
}