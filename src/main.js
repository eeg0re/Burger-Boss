// Name: Igor Bessa
// Title: Burger Boss
// Major components used: Camera, tweens, particles, tilemaps, Bitmap Text usage, animations with spritesheets/atlases

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [Load, Menu, Credits, Control, Level1, UI, GameWin, GameOver],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min:{   
            width: 800,
            height: 600

        }
    }
}

let game = new Phaser.Game(config);

let cursors;
let {height, width} = game.config;
let player_score = 0; 
let current_scene = 'menuScene';
let lvlSongPlaying = false;
let highScore = 0; 
let highScoreToDisplay = 0;
if(localStorage.getItem('burgerBossHighScore') != null){
    highScoreToDisplay = parseInt(localStorage.getItem("burgerBossHighScore"));
}