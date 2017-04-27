class WelcomeUI extends egret.Sprite {
	beginBtn: egret.Bitmap;
	cardBtn: egret.Bitmap;
	rankBtn: egret.Bitmap;
	rankUI: RankUI;
	/**
	 *欢迎界面
	 */
	constructor() {
		super();
		this.createView();
	}

	private createView(): void {
		this.addBg();
		this.addRank();
		this.addBeginBtn();
		this.addCardBtn();
		RESHelpers.addToParent(this, new HelpBtn());
		//Helpers.checkIsSub();
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
				.to({ y: beginBtn.y - 510 }, 1000, egret.Ease.circOut)
		});
		beginBtn.touchEnabled = true;
		beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			egret.Tween.get(this.rankBtn)
				.to({ y: this.rankBtn.y + 180 }, 500, egret.Ease.circIn)
			egret.Tween.get(this.beginBtn)
				.to({ y: this.beginBtn.y + 420 }, 500, egret.Ease.circIn)
			egret.Tween.get(this.cardBtn)
				.to({ y: this.cardBtn.y + 300 }, 1000, egret.Ease.cubicOut)
				.call(() => {
					this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME))
				})
		}, this)
	}

	private addCardBtn(): void {
		let cardBtn = this.cardBtn = RESHelpers.createImg("card_btn_png");
		RESHelpers.addToParent(this, cardBtn, Align.centerX, null, () => {
			cardBtn.y = AlignHelpers.stageHeight + cardBtn.height;
			egret.Tween.get(cardBtn)
				.to({ y: cardBtn.y - 390 }, 1000, egret.Ease.circOut);
		})
		cardBtn.touchEnabled = true;
		cardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			window.location.href = StaticData.url + "/Coupon/MyCoupon?mch=guzhiwei";
		}, this)
	}

	private addRank(): void {
		let btn = this.rankBtn = this.cardBtn = RESHelpers.createImg("btn_paihang@2x_png");
		RESHelpers.addToParent(this, btn, Align.centerX, null, () => {
			btn.y = AlignHelpers.stageHeight + btn.height;
			egret.Tween.get(btn)
				.to({ y: btn.y - 270 }, 500, egret.Ease.circOut);
		})
		btn.touchEnabled = true;
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.rankUI = new RankUI();
			RESHelpers.addToParent(this, this.rankUI);
			this.rankUI.addEventListener(WindowCloseEvent.NAME, () => {
				super.removeChild(this.rankUI);
			}, this);
		}, this)
	}
}