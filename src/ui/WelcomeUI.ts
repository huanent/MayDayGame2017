class WelcomeUI extends egret.Sprite {
	beginBtn: egret.Bitmap;
	cardBtn: egret.Bitmap;
	rankUI: RankUI;
	helpBtnTimer: egret.Timer;
	isSub: boolean = StaticData.IsSub;
	/**
	 *欢迎界面
	 */
	constructor(public music: MusicPlayer) {
		super();
		this.createView();
	}

	private createView(): void {
		this.addBg();
		this.addRank();
		this.addBeginBtn();
		this.addCardBtn();
		this.addHelpBtn();
		if (!this.isSub) {
			let bg = new egret.Shape();
			bg.graphics.beginFill(0, 0.8);
			bg.graphics.drawRect(-1, -1, AlignHelpers.stageWidth + 1, AlignHelpers.stageHeight + 1);
			bg.graphics.endFill();
			bg.touchEnabled = true;
			super.addChild(bg);
			let qr = document.getElementById("qr");
			qr.style.visibility = "visible";
			let subText = new egret.TextField();
			subText.text = "长按识别二维码，关注公众号";
			RESHelpers.addToParent(this, subText, Align.center, AlignContainer.stage)
			subText.y += 230;
			let subText2 = new egret.TextField();
			subText2.text = "点击“开始游戏”，开始“唐僧五一游记”游戏。";
			RESHelpers.addToParent(this, subText2, Align.center, AlignContainer.stage);
			subText2.y += 270;
		}
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

	private addRank(): void {
		let num: number = 112;
		let txt1 = RESHelpers.createTxt("已有" + num + "人参加西游")
		RESHelpers.addToParent(this, txt1, Align.bottomRight, AlignContainer.stage, () => {
			txt1.textColor = 0x0;
			txt1.y -= 30;
			txt1.x -= 350;
		})
		let lookRankTxt = RESHelpers.createTxt("查看排行")
		RESHelpers.addToParent(this, lookRankTxt, Align.bottomRight, AlignContainer.stage, () => {
			lookRankTxt.textColor = 0xffb400;
			lookRankTxt.size = 40;
			lookRankTxt.x -= 220;
			lookRankTxt.y -= 40;
		})
		lookRankTxt.touchEnabled = true;
		lookRankTxt.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.rankUI = new RankUI();
			RESHelpers.addToParent(this, this.rankUI);
			this.rankUI.addEventListener(WindowCloseEvent.NAME, () => {
				super.removeChild(this.rankUI);
			}, this);
		}, this);
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