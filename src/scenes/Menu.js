class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // define cursors
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.bitmapText(game.config.width/2, game.config.height/4 + 75, 'bold-pixel', 'Press SPACE to play').setOrigin(0.5);
        this.add.bitmapText(game.config.width/2 , game.config.height/4, 'bold-pixel', 'BURGER BOSS').setOrigin(0.5);
    }

    update(){
        if(this.cursors.space.isDown){
            this.scene.start('level1Scene');
            this.sound.play('sfx-UI');
        }
    }

}