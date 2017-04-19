class WelcomeUI extends egret.Sprite {
	beginBtn: egret.Bitmap;
	cardBtn: egret.Bitmap;
	helpBtnTimer: egret.Timer;
	/**
	 *欢迎界面
	 */
	constructor(public music: MusicPlayer) {
		super();
		this.createView();
	}

	private createView(): void {
		this.addBg();
		this.addBeginBtn();
		this.addCardBtn();
		this.addHelpBtn();
	}

	private addBg(): void {
		let bg = RESHelpers.createImg("bg_png", AlignHelpers.stageWidth);
		RESHelpers.addToParent(this, bg);
	}

	private addBeginBtn(): void {
		let beginBtn = this.beginBtn = RESHelpers.createImg("begin_btn_png");
		RESHelpers.addToParent(this, beginBtn, Align.centerX, null, () => {
			beginBtn.y = AlignHelpers.stageHeight + beginBtn.height;
			egret.Tween.get(beginBtn)
				.to({ y: beginBtn.y - 420 }, 1000, egret.Ease.circOut)
		})
	}

	private addHelpBtn(): void {
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

	private addCardBtn(): void {
		let cardBtn = this.cardBtn = RESHelpers.createImg("card_btn_png");
		RESHelpers.addToParent(this, cardBtn, Align.centerX, null, () => {
			cardBtn.y = AlignHelpers.stageHeight + cardBtn.height;
			egret.Tween.get(cardBtn)
				.to({ y: cardBtn.y - 300 }, 1000, egret.Ease.circOut);
		})
		cardBtn.touchEnabled = true;
		cardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			window.location.href = StaticData.url + "/Coupon/MyCoupon?mch=guzhiwei";
		}, this)
	}

	enableBeginGameTap(): void {
		let beginBtn = this.beginBtn;
		beginBtn.touchEnabled = true;
		beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			egret.Tween.get(this.beginBtn)
				.to({ y: this.beginBtn.y + 420 }, 500, egret.Ease.circIn)
			egret.Tween.get(this.cardBtn)
				.to({ y: this.cardBtn.y + 300 }, 1000, egret.Ease.cubicOut)
				.call(() => {
					this.helpBtnTimer.stop();
					this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME))
				})
			if (this.music.isFirst) this.music.play();
		}, this)
	}
}