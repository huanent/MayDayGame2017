// TypeScript file
class AlignHelpers {
    static stageWidth:number;
    static stageHeight:number;

    static rightAlign(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        if (obj.parent) {
            var containerWidth = align == AlignContainer.parent ? obj.parent.width : this.stageWidth;
            obj.x = containerWidth - obj.width;
        }
    }

    static bottomAlign(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        if (obj.parent) {
            var containerHeight = align == AlignContainer.parent ? obj.parent.height : this.stageHeight;
            obj.y = containerHeight - obj.height;
        }
    }

    static centerX(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.rightAlign(obj, align)
        obj.x = obj.x / 2
    }

    static centerY(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.bottomAlign(obj, align)
        obj.y = obj.y / 2
    }

    static centerObj(obj: egret.DisplayObject, align: AlignContainer = AlignContainer.parent): void {
        this.centerX(obj, align);
        this.centerY(obj, align);
    }


}