
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.js",
	"bin-debug/model/Rank.js",
	"bin-debug/events/GameOverEvent.js",
	"bin-debug/helpers/AlignHelpers.js",
	"bin-debug/helpers/Helpers.js",
	"bin-debug/helpers/RESHelpers.js",
	"bin-debug/helpers/StaticData.js",
	"bin-debug/helpers/WeChatApiHelper.js",
	"bin-debug/Main.js",
	"bin-debug/model/Align.js",
	"bin-debug/model/AlignContainer.js",
	"bin-debug/model/MockData.js",
	"bin-debug/model/MusicPlayer.js",
	"bin-debug/model/Point.js",
	"bin-debug/events/WindowCloseEvent.js",
	"bin-debug/model/RankViewModel.js",
	"bin-debug/ui/BarUI.js",
	"bin-debug/ui/EnemyUI.js",
	"bin-debug/ui/GameOverUI.js",
	"bin-debug/ui/GameUI.js",
	"bin-debug/ui/HelpUI.js",
	"bin-debug/ui/LoadingUI.js",
	"bin-debug/ui/MonkUI.js",
	"bin-debug/ui/RankListView.js",
	"bin-debug/ui/RankUI.js",
	"bin-debug/ui/RankView.js",
	"bin-debug/ui/WelcomeUI.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 720,
		contentHeight: 1155,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};