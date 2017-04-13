class RESHelpers {


    static createImg(name: string, width: number = null, height: number = null): egret.Bitmap {
        let img = new egret.Bitmap(RES.getRes(name));

        img.visible = false;
        if (width) img.width = width;
        if (height) img.height = height;

        return img;
    }

    static createTxt(content: string, color: number = null, bgColor: number = null): egret.TextField {
        let txt = new egret.TextField();

        txt.visible = false;
        if (color) txt.textColor = color;
        if (bgColor) txt.backgroundColor = bgColor;
        txt.text = content;

        return txt;
    }

    static createShape(x: number, y: number, width: number, height: number, color: number, alpha: number): egret.Shape {
        let shape = new egret.Shape();
        shape.graphics.beginFill(color, alpha);
        shape.graphics.drawRect(x, y, width, height);
        shape.graphics.endFill();
        return shape;
    }

    static addToParent(
        parent: egret.DisplayObjectContainer,
        obj: egret.DisplayObject,
        align: Align = Align.left,
        alignContainer: AlignContainer = AlignContainer.parent,
        call: Function = null) {

        parent.addChild(obj);

        switch (align) {
            case Align.right:
                AlignHelpers.rightAlign(obj, alignContainer);
                break;
            case Align.rightCenterY:
                AlignHelpers.rightAlign(obj, alignContainer);
                AlignHelpers.centerY(obj, alignContainer);
                break;
            case Align.bottomCenter:
                AlignHelpers.bottomAlign(obj, alignContainer);
                AlignHelpers.centerX(obj, alignContainer);
                break;
            case Align.bottomLeft:
                AlignHelpers.bottomAlign(obj, alignContainer);
                break;
            case Align.bottomRight:
                AlignHelpers.bottomAlign(obj, alignContainer);
                AlignHelpers.rightAlign(obj, alignContainer);
                break;
            case Align.center:
                AlignHelpers.centerObj(obj, alignContainer);
                break;
            case Align.centerX:
                AlignHelpers.centerX(obj, alignContainer);
                break;
            case Align.centerY:
                AlignHelpers.centerY(obj, alignContainer);
                break;
        }

        if (call) call(obj);
        obj.visible = true;
    }


}