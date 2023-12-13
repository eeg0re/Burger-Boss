// Name: Igor Bessa
// Title: Burger Boss
// Credits

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [Load, Menu, Level1, UI, GameOver],
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
let itemPts = 500;
let enemyPts = 1000; 