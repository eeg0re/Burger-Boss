class Level1 extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){
        
    }

    create(){
        player_score = 0; 
        current_scene = "level1Scene";
        this.scene.launch('UIScene');
        // add UI
        //this.scene.run('UIScene');
        
        this.VEL = 100;

        // start placing the tilemap
        const map1 = this.add.tilemap('lvl1JSON');

        // connect to the image to the data
        // 1st parameter is name from tiled
        const tileset1 = map1.addTilesetImage('new-city', 'newCityTiles');

        // 1st parameter is layer name from tiled
        // add background layer
        const cityBG = map1.createLayer('background', tileset1, 0, 0);
        const platformLayer = map1.createLayer('platforms', tileset1, 0, 0);

        // grab spawn coords from the map
        // player spawn
        const playerSpawn = map1.findObject('Spawns', obj => obj.name === 'player spawn');
        // enemy spawns 
        const ketchupSpawn = map1.findObject('Spawns', obj => obj.name === 'enemy 1');
        const mustardSpawn = map1.findObject('Spawns', obj => obj.name === 'enemy 2');
        const pickleSpawn = map1.findObject('Spawns', obj => obj.name === 'enemy 3');
        // item spawns
        const tomatoSpawn = map1.findObject('items', obj => obj.name === 'tomato spawn');
        const shakeSpawn = map1.findObject('items', obj => obj.name === 'shake spawn');
        const frySpawn = map1.findObject('items', obj => obj.name === 'fry spawn')

        // set world gravity 
        this.physics.world.gravity.y = 1000;
        

        // spawn player
        this.player = new Chef(this, playerSpawn.x, playerSpawn.y, 'chef', 0, 'right');

        // spawn items 
        this.tomato = this.physics.add.sprite(tomatoSpawn.x, tomatoSpawn.y, 'tomato');
        this.tomato.body.setAllowGravity(false);
        this.shake = this.physics.add.sprite(shakeSpawn.x, shakeSpawn.y, 'shake');
        this.shake.body.setAllowGravity(false);
        this.fries = this.physics.add.sprite(frySpawn.x, frySpawn.y, 'fries');
        this.fries.body.setAllowGravity(false);


        // spawn enemies
        this.ketchup = new Enemy(this, ketchupSpawn.x, ketchupSpawn.y, 'enemies', 'ketchup1', 'left', this.cameras.main, this.player);
        this.mustard = new Enemy(this, mustardSpawn.x, mustardSpawn.y, 'enemies', 'mustard1', 'right', this.cameras.main, this.player)
        this.pickle = new Enemy(this, pickleSpawn.x, pickleSpawn.y, 'enemies', 'pickle1', 'right', this.cameras.main, this.player); 

        // add enemies to group
        this.enemies = this.add.group({
            collideWorldBounds: true        // each enemy in the group will collide with world bounds

        });
        this.enemies.add(this.ketchup);
        this.enemies.add(this.mustard);
        this.enemies.add(this.pickle);

        // add enemies to an array 
        // use this array to know if any enemy's update function should be called
        this.enemy_array = [];
        this.enemy_array.push(this.ketchup);
        this.enemy_array.push(this.mustard);
        this.enemy_array.push(this.pickle);

        // add items to group
        this.items = this.add.group();
        this.items.add(this.tomato);
        this.items.add(this.shake);
        this.items.add(this.fries);
        
        // set world collision for the player
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
        this.physics.add.collider(this.enemies, platformLayer);

        // collisions between items and players
        this.physics.add.collider(this.player, this.items, (player, item)=> {
            item.destroy();
            this.sound.play('sfx-item');
            this.events.emit('addScoreItem');
        });

        // collisions between enemies and players
        this.physics.add.collider(this.player, this.enemies, ()=>{
            this.player.anims.play('chef-death');
            this.sound.play('sfx-loss');
            this.cameras.main.fadeOut(500);
            this.scene.stop('UIscene');
            this.time.delayedCall(500, ()=>{
                this.scene.pause();
                this.scene.start('GameOverScene');
            });
        });

        // input
        this.keys = this.input.keyboard.createCursorKeys();

        //create the level music
        this.levelSong = this.sound.add('level music'); 
        this.levelSong.loop = true;
        if(lvlSongPlaying == false){
            lvlSongPlaying = true;
            this.levelSong.play();
        }

    }

    update(){
        // update the hero's state machine
        this.player.update();
        this.chefFSM.step();
        this.enemy_array.forEach((enemy) => {
            enemy.update();
        });
    }

}