class GameOverUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let restartBtn = RESHelpers.createImg("restart_btn_png");
		RESHelpers.addToParent(this, restartBtn, Align.center, AlignContainer.stage);
		restartBtn.touchEnabled = true;
		restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this);
	}
}