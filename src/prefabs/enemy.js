class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction, camera, player){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.enemyFSM = new StateMachine('inert', { 
            inert: new InertState(),
            chase: new ChaseState(),
        }, [scene, this, camera, player])
    }
}

class InertState extends State {
    enter(scene, enemy, camera){

    }
    execute(scene, enemy, camera){

    }
}

class ChaseState extends State {
    enter(scene, enemy, camera, player){

    }
    execute(scene, enemy, camera, player){

    }
}