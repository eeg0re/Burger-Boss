class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.bitmapText(width/2, height/4 + 75, 'bold-pixel', 'Press SPACE to play').setOrigin(0.5);
        this.add.bitmapText(width/2 , height/4, 'bold-pixel', 'BURGER BOSS').setOrigin(0.5);
        this.add.image(width/2, height/2 + 100, 'tsChef').setScale(10);

        this.add.bitmapText(width/2, height-75, 'bold-pixel', 'Press shift to view credits').setOrigin(0.5).setScale(0.5);
    }

    update(){
        if(this.cursors.space.isDown){
            player_score = 0;
            this.scene.start('controlScene');
            this.sound.play('sfx-UI');
        }
        if(this.cursors.shift.isDown){
            this.scene.start('creditScene');
            this.sound.play('sfx-UI');
        }
    }

}