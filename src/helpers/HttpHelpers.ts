class HttpHelpers {
	static Get() {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(StaticData.rankUrl+"/Rank/GetRank/" + StaticData.userInfo.openId, egret.HttpMethod.GET);
		request.send();
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			let b: string = request.response;
			if (b != "-2") {
				let rankTxt = RESHelpers.createTxt("您的当前排名:" + b + "位(只显示前100名)", 0xffe400);
				RESHelpers.addToParent(this, rankTxt, Align.center, AlignContainer.stage);
				rankTxt.y -= 350;
			}
		}, this);
	}
}