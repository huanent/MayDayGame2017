class BarUI extends egret.Sprite {
	timeTxt: egret.TextField;
	public constructor() {
		super();
		this.createView();
	}
	private createView(): void {
		let timeTxt = this.timeTxt = RESHelpers.createTxt("0.0", )
		timeTxt.size = 60;
		RESHelpers.addToParent(this, timeTxt, Align.centerX, AlignContainer.stage, () => {
			timeTxt.y += 50;
		});

		let closeMusicBtn = RESHelpers.createImg("music-_close-@2x_png");
		RESHelpers.addToParent(this, closeMusicBtn, Align.right, null, () => {
			closeMusicBtn.y += 75;
			closeMusicBtn.anchorOffsetX = closeMusicBtn.width / 2;
			closeMusicBtn.anchorOffsetY = closeMusicBtn.height / 2;
			closeMusicBtn.touchEnabled = true;
		})

		let openMusicBtn = RESHelpers.createImg("music-@2x_png");
		RESHelpers.addToParent(this, openMusicBtn, Align.right, null, () => {
			openMusicBtn.y += 75;
			openMusicBtn.anchorOffsetX = openMusicBtn.width / 2;
			openMusicBtn.anchorOffsetY = openMusicBtn.height / 2;
			openMusicBtn.touchEnabled = true;
		})

		closeMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			closeMusicBtn.visible = false;
			openMusicBtn.visible = true;
			StaticData.bgMusic.play();
		}, this)
		openMusicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			openMusicBtn.visible = false;
			closeMusicBtn.visible = true;
			StaticData.bgMusic.stop();
		}, this)
		if (StaticData.bgMusic.isPlay) {
			closeMusicBtn.visible = false;
		}
		else {
			openMusicBtn.visible = false;
		}

		let openMusicBtnTimer = new egret.Timer(30, 0);
		openMusicBtnTimer.addEventListener(egret.TimerEvent.TIMER, () => {
			openMusicBtn.rotation = ++openMusicBtn.rotation % 360;
		}, this)
		openMusicBtnTimer.start();
	}
	setTime(timeStr: number) {
		let timeTxt = this.timeTxt;
		timeTxt.text = timeStr.toFixed(2);
	}
}