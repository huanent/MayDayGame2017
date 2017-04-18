
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    private welcomeUI: WelcomeUI;
    private gameUI: GameUI;
    private gameOverUI: GameOverUI;
    private isFirst: boolean = true;
    private music: MusicPlayer;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
            this.welcomeUI.enableBeginGameTap();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        AlignHelpers.stageWidth = this.stage.stageWidth;
        AlignHelpers.stageHeight = this.stage.stageHeight;
        this.addWelcomeUI();
    }

    private addWelcomeUI(): void {
        let welcomeUI = this.welcomeUI = new WelcomeUI();
        this.addChild(welcomeUI);
        if (this.isFirst) {
            RES.loadGroup("game");
            this.isFirst = false;
        } else {
            this.welcomeUI.enableBeginGameTap();
        }
        welcomeUI.addEventListener(WindowCloseEvent.NAME, () => {
            super.removeChild(welcomeUI);
            if (!this.music) this.music = new MusicPlayer();
            this.addGameUI();
        }, this)
    }

    private addGameUI(): void {
        this.gameUI = new GameUI(this.music);
        super.addChild(this.gameUI)
        this.gameUI.addEventListener(GameOverEvent.NAME, this.onGameOver, this)
    }

    private onGameOver(e: GameOverEvent): void {
        this.gameOverUI = new GameOverUI();
        super.addChild(this.gameOverUI);
        this.gameOverUI.addEventListener(WindowCloseEvent.NAME, () => {
            super.removeChild(this.gameUI);
            super.removeChild(this.gameOverUI);
            this.addWelcomeUI();
        }, this)
    }
}


