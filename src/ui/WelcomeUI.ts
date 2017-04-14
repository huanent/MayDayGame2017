class WelcomeUI extends egret.Sprite {
	beginBtn: egret.Bitmap;
	/**
	 *欢迎界面
	 */
	constructor() {
		super();
		this.createView();
	}

	private createView(): void {
		let beginBtn = this.beginBtn= RESHelpers.createImg("begin_btn_png");

		let bg = RESHelpers.createImg("bg_png", AlignHelpers.stageWidth);
		RESHelpers.addToParent(this, bg);

		let title = RESHelpers.createImg("begin_title_png");
		RESHelpers.addToParent(this, title, Align.centerX, null, () => {
			title.y -= title.height;
			egret.Tween.get(title).to({ y: title.y + 400 }, 1000, egret.Ease.circOut);
		});

		RESHelpers.addToParent(this, beginBtn, Align.centerX, null, () => {
			beginBtn.y = AlignHelpers.stageHeight + beginBtn.height;
			egret.Tween.get(beginBtn)
				.to({ y: beginBtn.y - 500 }, 1000, egret.Ease.circOut)
		})

		let cardBtn = RESHelpers.createImg("card_btn_png");
		RESHelpers.addToParent(this, cardBtn, Align.centerX, null, () => {
			cardBtn.y = AlignHelpers.stageHeight + cardBtn.height;
			egret.Tween.get(cardBtn)
				.to({ y: cardBtn.y - 350 }, 1000, egret.Ease.circOut);
		})
	}

	enableBeginGameTap(): void {
		let beginBtn = this.beginBtn;
		beginBtn.touchEnabled = true;
		beginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME))
		}, this)
	}
}