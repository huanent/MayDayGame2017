class GameOverUI extends egret.Sprite {
	rankUI: RankUI;
	restartBtn: egret.Bitmap;
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
		rank.OpenId = StaticData.openId;
		request.send(JSON.stringify(rank));
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			this.addRank(request.response);
		}, this);
	}

	private addBg(): void {
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		bg.touchEnabled = true;

	}

	private addWindow(): void {
		let window: egret.Bitmap;
		if (this.getLevel() == 1) {
			window = RESHelpers.createImg("window1_png");
		} else if (this.getLevel() == 2) {
			window = RESHelpers.createImg("window2_png");
		}
		else if (this.getLevel() == 3) {
			window = RESHelpers.createImg("window3_png");
		} else {
			window = RESHelpers.createImg("losed@2x_png");
		}
		RESHelpers.addToParent(this, window, Align.center, AlignContainer.stage);
	}

	private addRestartBtn(): void {
		let restartBtn = this.restartBtn = RESHelpers.createImg("restart_btn_png");
		RESHelpers.addToParent(this, restartBtn, Align.center, AlignContainer.stage, () => {
			restartBtn.y += 170;
			restartBtn.x -= 150;
		});
		restartBtn.touchEnabled = true;
		restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this);
	}

	private addCardBtn(): void {
		let next: Function = (img: string) => {
			if (this.getLevel() == 0 && img == "btn_lingqujiangli@2x_png") {
				AlignHelpers.centerX(this.restartBtn);
				return;
			}
			let cardBtn = RESHelpers.createImg(img);
			RESHelpers.addToParent(this, cardBtn, Align.center, AlignContainer.stage, () => {
				cardBtn.y += 170;
				cardBtn.x += 150;
			});
			cardBtn.touchEnabled = true;
			cardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				var request = new egret.HttpRequest();
				request.responseType = egret.HttpResponseType.TEXT;
				request.open(StaticData.url + "/wxapi/Activity/MayDay2017/Play?openid=" + StaticData.openId + "&prizeType=" + this.getLevel(), egret.HttpMethod.POST);
				//设置响应头
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				//发送参数
				request.send();
				request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
					//alert(request.response);
					window.location.href = StaticData.url + "/Coupon/MyCoupon?mch=guzhiwei";
				}, this);
			}, this);
		}

		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(StaticData.url + "/wxapi/Activity/MayDay2017/Check?openID=" + StaticData.openId + "&prizeType=" + this.getLevel(), egret.HttpMethod.GET);
		//设置响应头
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//发送参数
		request.send();
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			var request = <egret.HttpRequest>event.currentTarget;
			let isCan = JSON.parse(request.response).Data;
			//alert(request.response);
			if (!isCan) {
				next("btn_jiangli@2x_png");
			} else {
				next("btn_lingqujiangli@2x_png");
			}
		}, this);
	}

	private addMark(): void {

		let txt1 = RESHelpers.createTxt("得分:");
		RESHelpers.addToParent(this, txt1, Align.center, null, () => {
			txt1.y -= 100;
			txt1.x -= 115;
			txt1.size = 30;
		});

		let txt = RESHelpers.createTxt(this.time.toFixed(2));
		RESHelpers.addToParent(this, txt, Align.center, null, () => {
			txt.y -= 110;
			txt.x -= 25;
			txt.size = 50;
		});

		let txt3 = RESHelpers.createTxt("秒");
		RESHelpers.addToParent(this, txt3, Align.center, null, () => {
			txt3.y -= 100;
			txt3.x += 100;
			txt3.size = 30;
		});
	}

	private addRank(rank: string): void {

		let txt1 = RESHelpers.createTxt("排行:");
		RESHelpers.addToParent(this, txt1, Align.center, null, () => {
			txt1.y -= 40;
			txt1.x -= 115;
			txt1.size = 30;
		});

		let txt2 = RESHelpers.createTxt("第" + rank + "位");
		RESHelpers.addToParent(this, txt2, Align.center, null, () => {
			txt2.y -= 40;
			txt2.x -= 25;
			txt2.size = 30;
		});

		let txt3 = RESHelpers.createTxt("查看排行");
		RESHelpers.addToParent(this, txt3, Align.center, null, () => {
			txt3.y -= 40;
			txt3.x += 100;
			txt3.size = 30;
			txt3.textColor = 0xffb400;
		});
		txt3.touchEnabled = true;
		txt3.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.rankUI = new RankUI();
			RESHelpers.addToParent(this, this.rankUI);
			this.rankUI.addEventListener(WindowCloseEvent.NAME, () => {
				super.removeChild(this.rankUI);
			}, this);
		}, this)
	}

	private getLevel(): number {
		if (this.time < 30) return 0;
		if (30 <= this.time && this.time < 40) return 3;
		if (40 <= this.time && this.time < 50) return 2;
		if (50 <= this.time) return 1;
	}
}