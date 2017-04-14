// TypeScript file
class WindowCloseEvent extends egret.Event {
    static NAME = "WindowCloseEvent";

    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}