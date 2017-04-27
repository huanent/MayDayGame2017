class Helpers {
	/**
	 * 生成随机数0-9输入(0,9)
	 */
	static getRandomNum(min: number, max: number): number {
		max++;
		return Math.floor(min + Math.random() * (max - min));
	}

	static checkIsSub() {
		if (!StaticData.IsSub) {
			let qr = document.getElementById("qr");
			qr.style.visibility = "visible";
		}
	}

	static checkHavePlay(call: Function): void {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(StaticData.rankUrl + "/Rank/HavePlay/" + StaticData.openId, egret.HttpMethod.GET);
		request.send();
		request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
			let b: boolean = request.response;
			call(b);
		}, this);
	}
}