class RankView extends egret.Sprite {
	hei: number = 100;
	count: number;
	public constructor() {
		super()
		this.createView();
	}
	private createView(): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(StaticData.rankUrl+"/Rank/GetTop100Rank", egret.HttpMethod.GET);
		request.send();
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			let data: Array<RankViewModel> = JSON.parse(request.response);
			this.count = data.length;
			data.forEach(element => {
				this.createRow(element);
				let line = RESHelpers.createShape(0, 0, 530, 1, 0xffffff, 0.3)
				RESHelpers.addToParent(this, line);
				line.y = this.hei * (element.RankNum - 1) + 60;
			});
		}, this);

		// this.count = MockData.data.length;
		// MockData.data.forEach(element => {
		// 	this.createRow(element);
		// 	let line = RESHelpers.createShape(0, 0, 530, 1, 0xffffff, 0.3)
		// 	RESHelpers.addToParent(this, line);
		// 	line.y = this.hei * (element.RankNum - 1) + 60;
		// });
	}
	private createRow(row: RankViewModel): void {
		let height = this.hei;
		let rankNum = RESHelpers.createTxt("NO." + row.RankNum);
		RESHelpers.addToParent(this, rankNum);
		rankNum.y = height * (row.RankNum - 1)
		//加载图片资源
		RES.getResByUrl(row.HeadImgPath, function (texture: egret.Texture) {
			let img = new egret.Bitmap(texture);
			img.width = 50;
			img.height = 50;
			img.x = 130;
			img.y = height * (row.RankNum - 1) - 10;
			//将加载完的资源进行显示
			this.addChild(img);
		}, this, RES.ResourceItem.TYPE_IMAGE);
		let name = RESHelpers.createTxt(row.Name);
		RESHelpers.addToParent(this, name);
		name.y = height * (row.RankNum - 1)
		name.x = 220;
		let record = RESHelpers.createTxt(row.Record.toFixed(2));
		RESHelpers.addToParent(this, record);
		record.y = height * (row.RankNum - 1)
		record.x = 440;
	}
}