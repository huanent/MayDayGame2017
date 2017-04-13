// TypeScript file
class AlignHelpers {

    private static rightAlign(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        if (obj.parent) {
            var containerWidth = align == AlignContainer.parent ? obj.parent.width : obj.parent.stage.stageWidth;
            obj.x = containerWidth - obj.width;
        }
    }

    private static bottomAlign(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        if (obj.parent) {
            var containerHeight = align == AlignContainer.parent ? obj.parent.height : obj.parent.stage.stageHeight;
            obj.y = containerHeight - obj.height;
        }
    }

    private static centerX(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.rightAlign(obj, align)
        obj.x = obj.x / 2
    }

    private static centerY(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.bottomAlign(obj, align)
        obj.y = obj.y / 2
    }

    private static centerObj(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.centerX(obj, align);
        this.centerY(obj, align);
    }

    static addToParent(parent:egret.DisplayObjectContainer, obj: egret.DisplayObject, align: Align = Align.left, alignContainer: AlignContainer = AlignContainer.parent) {

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
        }

        obj.visible = true;
    }
}