class GameOverUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		bg.touchEnabled=true;
		let restartBtn = RESHelpers.createImg("restart_btn_png");
		RESHelpers.addToParent(this, restartBtn, Align.center, AlignContainer.stage);
		restartBtn.touchEnabled = true;
		restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this);
	}
}