class RankUI extends egret.Sprite {
	tempY: Number;
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		let img = RESHelpers.createImg("paihangbang-bg@2x_png");
		RESHelpers.addToParent(this, img, Align.center, AlignContainer.stage);
		let close = RESHelpers.createImg("close@2x_png");
		RESHelpers.addToParent(this, close, Align.center, AlignContainer.stage);
		close.y -= 450;
		close.x += 300;
		close.touchEnabled = true;
		close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this)
		this.getRankListView();
	}
	private getRankListView() {
		let rankListView = new RankListView();
		RESHelpers.addToParent(this, rankListView);
		rankListView.y = AlignHelpers.stageHeight / 2 - 210;
		rankListView.x += 90;
		rankListView.mask = new egret.Rectangle(0, -20, 530, 660);

		// let touchpad = RESHelpers.createShape(90, AlignHelpers.stageHeight / 2 - 210, 530, 660, 0, 0.5);
		// touchpad.touchEnabled = true;
		// this.addChild(touchpad);
		// touchpad.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
		// 	if (!this.tempY) this.tempY = e.stageY;
		// 	if (e.stageY > this.tempY) {
		// 		rankListView.y += 5;
		// 	} else if (e.stageY < this.tempY) {
		// 		rankListView.y -= 5;
		// 	}
		// 	this.tempY = e.stageY;
		// }, this)
	}
}