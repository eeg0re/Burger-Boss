class Control extends Phaser.Scene{
    constructor(){
        super("controlScene");
    }
    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.bitmapText(width/3, height/4 + 64, 'bold-pixel', 'Jump').setOrigin(0.5).setScale(0.5);
        this.add.image(width/2 + 50, height/4 + 44, 'space')
        this.add.bitmapText(width/3, height/4 + 128, 'bold-pixel', 'Attack').setOrigin(0.5).setScale(0.5);
        this.add.image(width/2 + 50, height/4 + 118, 'shift');
        this.add.bitmapText(width/3, height/4 + 192, 'bold-pixel', 'Move').setOrigin(0.5).setScale(0.5);
        this.add.image(width/2 + 25, height/4 + 192, 'left');
        this.add.image(width/2+100, height/4 + 192, 'right');
        this.add.bitmapText(width/2, height-50, 'bold-pixel', 'Press Space to continue').setOrigin(0.5).setScale(0.5);
    }
    update(){
        if(this.cursors.space.isDown){
            player_score = 0;
            this.scene.start('level1Scene');
            this.sound.play('sfx-UI');
        }
    }
}