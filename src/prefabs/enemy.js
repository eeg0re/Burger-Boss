class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.enemyFSM = new StateMachine('idle', { 
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
        }, [scene, this])
    }

}