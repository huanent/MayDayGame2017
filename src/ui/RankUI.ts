class RankUI extends egret.Sprite {
	tempY: Number;
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let bg = RESHelpers.createShape(0, 0, AlignHelpers.stageWidth, AlignHelpers.stageHeight, 0, 0.8);
		RESHelpers.addToParent(this, bg);
		let img = RESHelpers.createImg("paihangbang-bg@2x_png");
		RESHelpers.addToParent(this, img, Align.center, AlignContainer.stage);
		let close = RESHelpers.createImg("close@2x_png");
		RESHelpers.addToParent(this, close, Align.center, AlignContainer.stage);
		close.y -= 450;
		close.x += 300;
		close.touchEnabled = true;
		close.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new WindowCloseEvent(WindowCloseEvent.NAME));
		}, this)

		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open("/Rank/GetRank/" + StaticData.openId, egret.HttpMethod.GET);
		request.send();
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			let b: string = request.response;
			if (b != "-2") {
				let rankTxt = RESHelpers.createTxt("您的当前排名:" + b + "位(只显示前100名)", 0xffe400);
				RESHelpers.addToParent(this, rankTxt, Align.center, AlignContainer.stage);
				rankTxt.y -= 350;
			}
		}, this);

		let rankListView = new RankListView();
		RESHelpers.addToParent(this, rankListView);
		rankListView.y = AlignHelpers.stageHeight / 2 - 210;
		rankListView.x += 90;
		rankListView.mask = new egret.Rectangle(0, -20, 530, 660);
	}
}