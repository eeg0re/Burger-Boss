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
        this.load.image('tsChef', '/graphics/chef-title-screen.png');
        this.load.spritesheet('chef', '/graphics/chef_spritesheet.png', {
            frameWidth: 32, 
            frameHeight: 38
        });

        // load enemies from atlas
        this.load.atlas('enemies', '/graphics/enemies.png', '/graphics/enemies.json');

        // load item sprites
        this.load.image('tomato', '/graphics/items/tomato.png');
        this.load.image('shake', '/graphics/items/shake.png');
        this.load.image('fries', '/graphics/items/fries.png');
        this.load.image('patty', '/graphics/items/patty.png');
        this.load.image('burger', '/graphics/items/burger.png');

        // load end goal sprite
        this.load.image('grill', '/graphics/grill.png');

        // load particle
         this.load.image('particle', '/graphics/1px-particle.png');

        // load key sprites for controls scene
        this.load.image('right', '/graphics/r-key.png');
        this.load.image('left', '/graphics/l-key.png');
        this.load.image('shift', '/graphics/shift-key.png');
        this.load.image('space', '/graphics/space-key.png');

        // load spatula for hitting animation
        this.load.image('spatula', '/graphics/spatula.png');

        // load sound
        this.load.audio('sfx-UI', '/audio/coin-collect-retro-8-bit-sound-effect-145251.mp3');
        this.load.audio('sfx-jump', '/audio/jump.wav', {
            volume: 0.25
        });
        this.load.audio('sfx-loss', '/audio/loss.wav');
        this.load.audio('sfx-item', '/audio/points.wav');
        this.load.audio('sfx-enemy-dead', '/audio/enemy.wav');
        this.load.audio('level music', '/audio/SLOWER2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3');

    }

    create(){
        // create all the animations we need
        this.anims.create({
            key: 'ketchup1-walk',
            frames: this.anims.generateFrameNames('enemies', {
                prefix: 'ketchup',
                start: 1,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'mustard1-walk',
            frames: this.anims.generateFrameNames('enemies', {
                prefix: 'mustard',
                start: 1,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'pickle1-walk',
            frames: this.anims.generateFrameNames('enemies', {
                prefix: 'pickle',
                start: 1,
                end: 2,
            }),
            frameRate: 3,
            repeat: -1
        });

        // chef animations
        this.anims.create({
            key: 'chef-idle',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('chef', {start: 0, end: 0})
        });
        this.anims.create({
            key: 'chef-walk',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('chef', {start: 0, end: 2}),
        });
        this.anims.create({
            key: 'chef-jump',
            frameRate: 6,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('chef', {
                frames: [ 3, 3, 3, 0]
            }),
        });
        this.anims.create({
            key: 'chef-death',
            frameRate: 12,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('chef', {start: 4, end: 6}),  
        });
        this.anims.create({
            key: 'chef-hit',
            frameRate: 10,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('chef', {
                frames: [7, 7, 7, 7]
            }),  
        });

        

        this.scene.start('menuScene');
    }

    update(){
        
    }

}