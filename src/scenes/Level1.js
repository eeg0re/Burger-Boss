class Level1 extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){

    }

    create(){
        this.add.bitmapText(game.config.width/2 , game.config.height/4, 'bold-pixel', 'WIP').setOrigin(0.5);

    }

    update(){
        
    }

}