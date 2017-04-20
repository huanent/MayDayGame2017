class GameOverUI extends egret.Sprite {
	public constructor(public time: number) {
		super();
		this.createView();
	}

	private createView(): void {
		this.uploadRecord();
		this.addBg();
		this.addWindow();
		this.addRestartBtn();
		this.addCardBtn();
		this.addMark();
	}

	private uploadRecord(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		//request.open(StaticData.rankUrl + "/rank/add", egret.HttpMethod.POST);
		request.open("/rank/add", egret.HttpMethod.POST);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/json");
		//发送参数
		let rank = new Rank();
		rank.HeadImgPath = StaticData.headImgPath;
		rank.Name = StaticData.nickName;
		rank.Record = this.time;
		request.send(JSON.stringify(rank));
	}

	private addBg(): void {
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		bg.touchEnabled = true;

	}

	private addWindow(): void {
		let window: egret.Bitmap;
		if (10 < this.time && this.time <= 30) {
			window = RESHelpers.createImg("window1_png");
		} else if ((30 < this.time && this.time <= 60)) {
			window = RESHelpers.createImg("window2_png");

		}
		else if ((60 < this.time)) {
			window = RESHelpers.createImg("window3_png");
		} else {
			window = RESHelpers.createImg("window1_png");
		}
		RESHelpers.addToParent(this, window, Align.center, AlignContainer.stage);
	}

	private addRestartBtn(): void {
		let restartBtn = RESHelpers.createImg("restart_btn_png");
		RESHelpers.addToParent(this, restartBtn, Align.center, AlignContainer.stage, () => {
			restartBtn.y += 150;
			restartBtn.x -= 150;
		});
		restartBtn.touchEnabled = true;
		restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this);
	}

	private addCardBtn(): void {
		let cardBtn = RESHelpers.createImg("btn_jiangli@2x_png");
		RESHelpers.addToParent(this, cardBtn, Align.center, AlignContainer.stage, () => {
			cardBtn.y += 150;
			cardBtn.x += 150;
		});
		cardBtn.touchEnabled = true;
		cardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			window.location.href = StaticData.url + "/Coupon/MyCoupon?mch=guzhiwei";
		}, this);
	}

	private addMark(): void {
		let txt = RESHelpers.createTxt(this.time.toFixed(2) + "秒");
		RESHelpers.addToParent(this, txt, Align.center, null, () => {
			txt.y -= 65;
			txt.x -= 25;
			txt.size = 50;
			txt.textColor = 0xffb400;
		});
	}

}