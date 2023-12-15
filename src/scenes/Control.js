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
        
        // create a chef for tweens 
        this.chef = new Chef(this, -64, height-90, 'chef', 0, 'right').setScale(4);
        this.chef.anims.play('chef-walk');
    }
    update(){
        if(this.cursors.space.isDown){
            this.chefTween = this.tweens.add({
                targets: this.chef,
                ease: 'Sine.easeInOut',
                duration: 2000,
                x: width+32,
                stepX: 10,
                onComplete: ()=>{
                    player_score = 0;
                    this.scene.start('level1Scene');
                    this.sound.play('sfx-UI');
                }
            });
        }
    }
}