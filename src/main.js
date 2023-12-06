// Name: Igor Bessa
// Title: Burger Boss
// Credits

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scene: [Load, Menu, Level1, GameOver],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

let cursors;
let {height, width} = game.config;
let player_score = 0; 