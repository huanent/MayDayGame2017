class GameOverEvent extends egret.Event {
	static NAME = "GameOverEvent";
	time: number;
	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}