class UI extends Phaser.Scene{
    constructor(){
        super({key: "UIScene", active: false});
    }

    create(){
        this.player_score = 0;
        this.itemPts = 500;
        this.enemyPts = 1000;
        this.score = this.add.bitmapText(game.config.width - (game.config.width/4), game.config.height/10, 'bold-pixel', 'SCORE: ').setOrigin(0.5).setScale(0.5);
        const gameScene = this.scene.get(current_scene);
        gameScene.events.on('addScoreItem', function(){
            this.player_score += this.itemPts;
        }, this);
        gameScene.events.on('addScoreEnemy', function(){
            this.player_score += this.enemyPts;
        });
    }

    update(){
        player_score = this.player_score;
        this.score.setText(`SCORE: ${this.player_score}`);
    }
}
