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
        this.load.image('newCityTiles', '/maps/new-city.png');
        this.load.tilemapTiledJSON('lvl1JSON', '/maps/BBlvl1.json');

        // load sprites
        this.load.image('tempChef', '/graphics/chef.png');
        this.load.image('tsChef', '/graphics/chef-title-screen.png');
        this.load.image('ketchup', '/graphics/new-ketchup1.png');
        this.load.image('mustard', '/graphics/new-mustard1.png')

        // load item sprites
        this.load.image('tomato', '/graphics/items/tomato.png');

        // load sound
        this.load.audio('sfx-UI', '/audio/coin-collect-retro-8-bit-sound-effect-145251.mp3');
        this.load.audio('sfx-jump', '/audio/sfx_jump_07-80241.mp3');

    }

    create(){
        this.scene.start('menuScene');
    }

    update(){
        
    }

}