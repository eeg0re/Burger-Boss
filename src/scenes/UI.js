class UI extends Phaser.Scene{
    constructor(){
        super({key: "UIScene", active: false});
    }

    create(){
        this.itemPts = 500;
        this.enemyPts = 1000;
        this.score = this.add.bitmapText(game.config.width - (game.config.width/4), game.config.height/10, 'bold-pixel', 'SCORE: ').setOrigin(0.5).setScale(0.5);
        const gameScene = this.scene.get(current_scene);
        gameScene.events.on('addScoreItem', function(){
            player_score += this.itemPts;
        }, this);
        gameScene.events.on('addScoreEnemy', function(){
            player_score += this.enemyPts;
        });
    }

    update(){
        this.score.setText(`SCORE: ${player_score}`);
    }
}
