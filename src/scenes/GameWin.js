class GameWin extends Phaser.Scene{
    constructor(){
        super("gameWinScene");
    }
    create(){
        this.keys = this.input.keyboard.createCursorKeys();
        this.add.bitmapText(game.config.width/2, game.config.height/2, 'bold-pixel', 'YOU WIN').setOrigin(0.5).setCharacterTint(0, -1, true, 0xd1332e);
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 70, 'bold-pixel', `Your score: ${player_score}`).setOrigin(0.5).setScale(0.5).setCharacterTint(0, -1, true, 0xd1332e);
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 140, 'bold-pixel', `Press space to play again`).setOrigin(0.5).setScale(0.5);
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 210, 'bold-pixel', `Press shift for the main menu`).setOrigin(0.5).setScale(0.5);
    }

    update(){
        if(this.keys.space.isDown){
            player_score = 0;
            this.scene.start('level1Scene');
            this.sound.play('sfx-UI');
        }
        if(this.keys.shift.isDown){
            player_score = 0;
            this.scene.restart('menuScene');
            this.scene.start('menuScene');
            this.sound.play('sfx-UI');
        }
    }


}