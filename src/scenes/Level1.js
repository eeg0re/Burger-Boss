class Level1 extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){
        
    }

    create(){
        //this.add.bitmapText(game.config.width/2 , game.config.height/4, 'bold-pixel', 'WIP').setOrigin(0.5);
        // start placing the tilemap
        const map1 = this.add.tilemap('lvl1JSON');
        // connect to the image to the data
        // 1st parameter is name from tiled
        const tileset1 = map1.addTilesetImage('city', 'cityTilesImage');
        // 1st parameter is layer name from tiled
        // add background layer
        const cityBG = map.createLayer('Background', tileset1, 0, 0);
        const platformLayer = map.createLayer('platforms', tileset1, 0, 0);

        // spawn player
        const playerSpawn = map1.findObject('spawns', obj => obj.name === 'player spawn');
        this.player = this.add.rectangle(playerSpawn.x, playerSpawn.y, 32, 32, 0xebb734);
        this.physics.add.existing(this.player);

    }

    update(){
        
    }

}