class RankListView extends egret.Sprite {
	hei: number = 100;
	tempY: Number;

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
		touchpad.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
			if (!this.tempY) this.tempY = e.stageY;
			if (e.stageY > this.tempY && rankView.y < 0) {
				rankView.y += 10;
			} 
			else if (e.stageY < this.tempY && rankView.y > -rankView.count * 61) {
				rankView.y -= 10;
			}


			this.tempY = e.stageY;
		}, this)
	}

}