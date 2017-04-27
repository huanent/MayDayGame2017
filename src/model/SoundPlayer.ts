class SoundPlayer {
	private sound: egret.Sound;
	private ctrl: egret.SoundChannel;
	isPlay: boolean;

	constructor(url: string, nextCall: Function) {
		this.sound = new egret.Sound();
		this.sound.load(url);
		this.sound.addEventListener(egret.Event.COMPLETE, () => {
			nextCall();
		}, this)
	}

	play() {
		this.ctrl = this.sound.play();
		this.isPlay = true;
	}

	stop() {
		this.ctrl.stop();
		this.isPlay = false;
	}
}