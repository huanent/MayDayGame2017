class RESHelpers {

	static createImg(name: string, width: number = null, height: number = null): egret.Bitmap {
		let img = new egret.Bitmap(RES.getRes(name));
		
		img.visible=false;
		if (width) img.width = width;
		if (height) img.height = height;

		return img;
	}

	static createTxt(content: string, color: number = null, bgColor: number = null): egret.TextField {
		let txt = new egret.TextField();

		txt.visible=false;
		if (color) txt.textColor = color;
		if (bgColor) txt.backgroundColor = bgColor;
		txt.text = content;

		return txt;
	}


}