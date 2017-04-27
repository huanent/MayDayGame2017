class HelpBtn extends egret.Sprite {
	helpBtnTimer: egret.Timer;

	public constructor() {
		super();
		this.createView();
	}
	
	private createView() {
		let helpBtn = RESHelpers.createImg("home-jinnang@2x_png");
		RESHelpers.addToParent(this, helpBtn, Align.right, null, () => {
			helpBtn.y += 100;
			helpBtn.x += 30;
			helpBtn.anchorOffsetX = helpBtn.width / 2;
			helpBtn.anchorOffsetY = helpBtn.height / 2;
			this.helpBtnTimer = new egret.Timer(3000, 0);
			egret.Tween.get(helpBtn)
				.to({ width: helpBtn.width + 15, height: helpBtn.height + 15 }, 1500, )
				.to({ width: helpBtn.width, height: helpBtn.height }, 1500)
			this.helpBtnTimer.addEventListener(egret.TimerEvent.TIMER, () => {
				egret.Tween.get(helpBtn)
					.to({ width: helpBtn.width + 15, height: helpBtn.height + 15 }, 1500, )
					.to({ width: helpBtn.width, height: helpBtn.height }, 1500)
			}, this)
			this.helpBtnTimer.start();
			helpBtn.touchEnabled = true;
			helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				let helpUI = new HelpUI();
				RESHelpers.addToParent(this, helpUI);
				helpUI.addEventListener(WindowCloseEvent.NAME, () => {
					super.removeChild(helpUI);
				}, this)
			}, this)
		})
	}
}