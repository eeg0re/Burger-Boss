class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor(0x000000);
        this.add.bitmapText(width/2, height/4 + 75, 'bold-pixel', 'Press SPACE to play').setOrigin(0.5);
        this.add.bitmapText(width/2 , height/4, 'bold-pixel', 'BURGER BOSS').setOrigin(0.5);
        this.chef = this.add.image(width/2, height/2 + 100, 'tsChef').setScale(10);

        this.add.bitmapText(width/2, height-110, 'bold-pixel', `HIGH SCORE: ${highScoreToDisplay}`).setOrigin(0.5).setScale(0.5);

        this.add.bitmapText(width/2, height-75, 'bold-pixel', 'Press shift to view credits').setOrigin(0.5).setScale(0.5);
    }

    update(){
        if(this.cursors.space.isDown){
            let thisTween = this.tweens.add({
                targets: this.chef,
                scale: { from: 10, to: 0.5},
                ease: 'Sine.easeInOut',
                duration: 1000,
                onComplete:()=>{
                    player_score = 0;
                    this.sound.play('sfx-UI');
                    this.scene.start('controlScene');
                }
            });
        }
        if(this.cursors.shift.isDown){
            this.scene.start('creditScene');
            this.sound.play('sfx-UI');
        }
    }

}