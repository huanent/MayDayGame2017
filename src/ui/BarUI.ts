class BarUI extends egret.Sprite {
	timeTxt: egret.TextField;
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let timeTxt = this.timeTxt = RESHelpers.createTxt("0.0", )
		timeTxt.size = 50;
		RESHelpers.addToParent(this, timeTxt, Align.centerX, AlignContainer.stage, () => {
			timeTxt.y += 50;
		});
	}
	setTime(timeStr: number) {
		let timeTxt = this.timeTxt;
		timeTxt.text = timeStr.toFixed(1);
	}
}