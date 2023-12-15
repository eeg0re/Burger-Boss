class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.bitmapText(width/2, height/4, 'bold-pixel', 'Visual assets by Igor Bessa').setOrigin(0.5).setScale(0.5);
        this.add.bitmapText(width/2, height/4+75, 'bold-pixel', 'Level music  by Fesliyan Studios').setOrigin(0.5).setScale(0.5);
        this.add.bitmapText(width/2, height-75, 'bold-pixel', 'press Space to return').setOrigin(0.5).setScale(0.25);
    }

    update(){
        if(this.cursors.space.isDown){
            player_score = 0;
            this.scene.start('menuScene');
            this.sound.play('sfx-UI');
        }
    }
}