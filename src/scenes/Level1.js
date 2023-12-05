class Level1 extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){
        
    }

    create(){
        this.VEL = 100;
        //this.JUMPVELOCITY = -1000;

        // start placing the tilemap
        const map1 = this.add.tilemap('lvl1JSON');

        // connect to the image to the data
        // 1st parameter is name from tiled
        const tileset1 = map1.addTilesetImage('new-city', 'newCityTiles');

        // 1st parameter is layer name from tiled
        // add background layer
        const cityBG = map1.createLayer('background', tileset1, 0, 0);
        const platformLayer = map1.createLayer('platforms', tileset1, 0, 0);

        // spawn player
        const playerSpawn = map1.findObject('Spawns', obj => obj.name === 'player spawn');

        // set world gravity 
        this.physics.world.gravity.y = 1000;
        this.player = new Chef(this, playerSpawn.x, playerSpawn.y, 'tempChef', 0, 'right');
        
        // set world collision 
        this.player.body.setCollideWorldBounds(true);

        // set camera settings
        this.cameras.main.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);

        // set bounds for physics world
        this.physics.world.setBounds(0, 0, map1.widthInPixels, map1.heightInPixels);

        // collisions
        // set collision based on the property set in Tiled
        platformLayer.setCollisionByProperty({
            collision: true
        });
        this.physics.add.collider(this.player, platformLayer);

        // input
        this.keys = this.input.keyboard.createCursorKeys();
    }

    update(){
        // update the hero's state machine
        this.chefFSM.step();
    }

}