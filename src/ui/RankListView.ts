class RankListView extends egret.Sprite {
	hei: number = 100;
	tempY: number;
	offset: number;
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let rankView = new RankView();
		this.addChild(rankView);
		let touchpad = RESHelpers.createShape(0, 0, 530, 660, 0, 0);
		touchpad.touchEnabled = true;
		this.addChild(touchpad);
		touchpad.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
			this.offset = e.stageY - rankView.y;
		}, this)
		touchpad.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
			if (rankView.count < 8) {
				return;
			}
			rankView.y = e.stageY - this.offset;
			if (rankView.y > 0) rankView.y = 0;
			if (rankView.y < -(rankView.count - 6) * 101) rankView.y = -(rankView.count - 6) * 101;
		}, this)
	}

}