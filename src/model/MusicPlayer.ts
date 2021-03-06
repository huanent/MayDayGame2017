class MusicPlayer {
	music: egret.Sound;
	ctrl: egret.SoundChannel;
	canPlay: boolean;
	isFirst: boolean = true;
	isplay: boolean;
	monkDie: egret.Sound;
	monkDieCtrl: egret.SoundChannel;
	public constructor() {
		this.music = new egret.Sound();
		this.music.load("resource/assets/bg.mp3");
		this.monkDie = new egret.Sound();
		this.monkDie.load("resource/assets/MonkDie.mp3");
		this.music.addEventListener(egret.Event.COMPLETE, () => {
			this.canPlay = true;
		}, this)
	}
	play(): void {
		if (this.canPlay) {
			this.ctrl = this.music.play(0, 0);
			this.isplay = true;
			this.isFirst = false;
		}
	}
	stop(): void {
		this.ctrl.stop();
		this.isplay = false;
	}
	monkDiePlay():void{
		this.monkDie.play(0,1);
	}
}