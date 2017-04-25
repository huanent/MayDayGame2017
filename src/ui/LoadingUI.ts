
class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private textField: egret.TextField;

    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 350;
        this.textField.width = 720;
        this.textField.height = 1155;
        this.textField.textAlign = "center";
    }

    public setProgress(current: number, total: number): void {
        let x = Math.floor(current / total * 100);
        this.textField.text = `Loading...${x}/100%`;
    }
}
