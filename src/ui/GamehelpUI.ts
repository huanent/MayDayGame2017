class GamehelpUI extends egret.Sprite {
	public constructor() {
		super();
		this.createView();
	}
	private createView() {
		var tipBg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		var startBtn = RESHelpers.createImg("btn-i-know@2x_png");
		var tipMonk = RESHelpers.createImg("monk_png");
		var txt1 = RESHelpers.createTxt("长按并拉动角色");
		var txt2 = RESHelpers.createTxt("进行移动");
		var txt3 = RESHelpers.createTxt("00:00");
		txt3.size = 50;
		RESHelpers.addToParent(this, tipBg);
		RESHelpers.addToParent(this, startBtn, Align.center, AlignContainer.stage, () => {
			startBtn.y += 350;
			startBtn.touchEnabled = true;
		});
		RESHelpers.addToParent(this, txt1, Align.center, AlignContainer.stage, () => {
			txt1.y += 150;
		});
		RESHelpers.addToParent(this, txt2, Align.center, AlignContainer.stage, () => {
			txt2.y += 200;
		});
		RESHelpers.addToParent(this, txt3, Align.center, AlignContainer.stage, () => {
			txt3.y -= 400;
		});
		RESHelpers.addToParent(this, tipMonk, Align.center, AlignContainer.stage);
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this)
	}
}