class WelcomeUI extends egret.Sprite {
	beginBtn: egret.Bitmap;
	helpBtnTimer: egret.Timer;
	/**
	 *欢迎界面
	 */
	constructor() {
		super();
		this.createView();
	}

	private createView(): void {
		let beginBtn = this.beginBtn = RESHelpers.createImg("begin_btn_png");
		let helpBtn = RESHelpers.createImg("home-jinnang@2x_png");
		let bg = RESHelpers.createImg("bg_png", AlignHelpers.stageWidth);
		RESHelpers.addToParent(this, bg);

		RESHelpers.addToParent(this, beginBtn, Align.centerX, null, () => {
			beginBtn.y = AlignHelpers.stageHeight + beginBtn.height;
			egret.Tween.get(beginBtn)
				.to({ y: beginBtn.y - 420 }, 1000, egret.Ease.circOut)
		})

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
		})

		let cardBtn = RESHelpers.createImg("card_btn_png");
		RESHelpers.addToParent(this, cardBtn, Align.centerX, null, () => {
			cardBtn.y = AlignHelpers.stageHeight + cardBtn.height;
			egret.Tween.get(cardBtn)
				.to({ y: cardBtn.y - 300 }, 1000, egret.Ease.circOut);
		})
		cardBtn.touchEnabled = true;
		cardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			window.location.href = StaticData.url + "/Coupon/MyCoupon?mch=guzhiwei";
		}, this)
		helpBtn.touchEnabled = true;
		helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			let helpUI = new HelpUI();
			RESHelpers.addToParent(this, helpUI);
			helpUI.addEventListener(WindowCloseEvent.NAME, () => {
				super.removeChild(helpUI);
			}, this)
		}, this)
	}

	enableBeginGameTap(): void {
		let beginBtn = this.beginBtn;
		beginBtn.touchEnabled = true;
		beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.helpBtnTimer.stop();
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME))
		}, this)
	}
}