class SoundPlayer {
	sound: egret.Sound;
	ctrl:egret.SoundChannel;

	constructor(url: string, nextCall: Function) {
		this.sound = new egret.Sound();
		this.sound.load(url);
		this.sound.addEventListener(egret.Event.COMPLETE, () => {
			nextCall();
		}, this)
	}

	play(){
		this.ctrl=this.sound.play();
	}
	
	stop(){
		this.ctrl.stop();
	}
}