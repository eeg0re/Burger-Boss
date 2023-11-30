class Level1 extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){
        
    }

    create(){
        this.VEL = 100;
        //this.add.bitmapText(game.config.width/2 , game.config.height/4, 'bold-pixel', 'WIP').setOrigin(0.5);
        // start placing the tilemap
        const map1 = this.add.tilemap('lvl1JSON');
        // connect to the image to the data
        // 1st parameter is name from tiled
        const tileset1 = map1.addTilesetImage('city', 'cityTilesImage');
        // 1st parameter is layer name from tiled
        // add background layer
        const cityBG = map1.createLayer('Background', tileset1, 0, 0);
        const platformLayer = map1.createLayer('platforms', tileset1, 0, 0);

        // spawn player
        const playerSpawn = map1.findObject('spawns', obj => obj.name === 'player spawn');
        this.player = this.add.rectangle(playerSpawn.x, playerSpawn.y, 32, 32, 0xebb734);
        this.physics.add.existing(this.player);
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
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.direction.x = 1
        }

        if(this.cursors.up.isDown) {
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.direction.y = 1
        }

        this.direction.normalize()
        this.player.body.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }

}