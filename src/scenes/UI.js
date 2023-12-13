class UI extends Phaser.Scene{
    constructor(){
        super({key: "UIScene", active: false});
    }
    preload(){
        this.load.bitmapFont('bold-pixel', '/assets/fonts/Pixel-bold.png', '/fonts/Pixel-bold.xml');
    }

    create(){
        this.score = this.add.bitmapText(game.config.width - (game.config.width/4), game.config.height/10, 'bold-pixel', 'SCORE: ').setOrigin(0.5).setScale(0.5);
        const gameScene = this.scene.get(current_scene);
        gameScene.events.on('addScoreItem', function(){
            player_score += itemPts;
        }, this);
        gameScene.events.on('addScoreEnemy', function(){
            player_score += enemyPts;
        });
    }

    update(){
        //console.log(this.pts);
        this.score.setText(`SCORE: ${player_score}`);
    }
}
