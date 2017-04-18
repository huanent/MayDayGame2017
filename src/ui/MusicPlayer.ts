class MusicPlayer {
	private music: egret.Sound;
	private ctrl: egret.SoundChannel;
	canPlay: boolean;
	isFirst: boolean = true;
	isplay: boolean;
	public constructor() {
		this.music = new egret.Sound();
		this.music.load("/resource/assets/bg.mp3");
		this.music.addEventListener(egret.Event.COMPLETE, () => {
			this.canPlay = true;
			this.ctrl = this.music.play(0, 0);
			this.isplay = true;
		}, this)
	}
	play(): void {
		if (this.canPlay) {
			this.ctrl = this.music.play(0, 0);
			this.isplay = true;
		}
	}
	stop(): void {
		this.ctrl.stop();
		this.isplay = false;
	}
}