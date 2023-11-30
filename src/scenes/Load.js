class Load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    preload(){
        // loading bar code provided by Prof. Nathan Altice
        // code from Asset Bonanza repo on Github
        // set up loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loading = this.add.graphics();
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
        this.load.on('progress', (value)=> {
            loading.clear();                            // reset fill/line style
            loading.fillStyle(0x911C1C, 1);             // (color, alpha)
            loading.fillRect(30, 300, game.config.width*value, 15);  // (x, y, width, height)
        });
        this.load.on('complete', ()=> {
            loading.destroy();
        });

        // set the load path
        this.load.path = './assets'
        this.load.bitmapFont('bold-pixel', '/fonts/Pixel-bold.png', '/fonts/Pixel-bold.xml');

        // load tilemaps 
        this.load.image('cityTilesImage', '/maps/city-tiles.png' );
        this.load.tilemapTiledJSON('lvl1JSON', '/BBlvl1.json');
        

    }

    create(){
        this.scene.start('menuScene');
    }

    update(){
        
    }

}