class WeChatApiHelper {

	static getOpenId(call: Function): void {
		let openid = this.getQueryString("openid");
		let subscribe: string = this.getQueryString("subscribe");
		let name: string = decodeURI(this.getQueryString("nickname"));
		let headImgPath: string = this.getQueryString("headimgurl");
		if (openid == null) {
			let companyCode = "guzhiwei";
			let callUrl = window.location.href;
			let url = "http://app.guzhiwei.com/wxis/Auth?companyCode=" + companyCode + "&UserInfo=true&scope=snsapi_userinfo&RedirectUrl=" + callUrl;
			window.location.href = url;
		}
		StaticData.userInfo = new UserInfo(
			subscribe == "1",
			name,
			headImgPath,
			openid
		);
		call();
	}

	static getQueryString(name): string {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURI(r[2]); return null;
	}

}