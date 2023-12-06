class Chef extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // set custom chef properties
        this.chefVelocity = 300;
        this.direction = direction;
        this.ACCELERATION = 500;
        this.DRAG = 600;
        this.JUMPVELOCITY = -10000;
        this.MAX_X_VEL = 500;
        this.MAX_Y_VAL = 5000;
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VAL);
        
        // initialize state machine managing chef 
        scene.chefFSM = new StateMachine('idle', { 
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            hit: new HitState(),
            //death: new DeathState()
        }, [scene, this])
    }
}

// chef specific state classes
class IdleState extends State {
    enter(scene, chef){
        chef.body.setVelocityX(0);
        //chef.anims.play(`walk-${chef.direction}`);
        //chef.anims.stop();
    }

    execute(scene, chef){
        // use destructuring to make local copy of keyboard object
        const {left, right, space, shift} = scene.keys;
        
        // transition to move if pressing left or right
        if(left.isDown || right.isDown){
            this.stateMachine.transition('move');
            return;
        }

        // transition to jump if space is pressed
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('jump');
            return;
        }

        // transition to hit if shift is pressed
        if(Phaser.Input.Keyboard.JustDown(shift)){
            this.stateMachine.transition('hit')
        }
    }
}

class MoveState extends State{
    execute(scene, chef){
        // use destructuring to make local copy of keyboard object
        const {left, right, space, shift} = scene.keys;

        // transition to jump if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('jump');
            return;
        }

        // transition to hit if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)){
            this.stateMachine.transition('hit');
            return;
        }

        if(!(left.isDown || right.isDown)){
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0,0);
        if(left.isDown){
            moveDirection.x = -1;
            chef.direction = 'left';
        }
        else if (right.isDown){
            moveDirection.x = 1;
            chef.direction = 'right';
        }

        // normalize movement vector, update position, play animation 
        moveDirection.normalize();
        chef.body.setVelocityX(chef.chefVelocity * moveDirection.x);
        //chef.anims.play(`walk-&{chef.direction}`, true);
    }
}

class HitState extends State{
    enter(scene, chef){
        //chef.anims.play(`swing-${chef.direction}`);
        //chef.once(`animationcomplete`, ()=> {
            this.stateMachine.transition(`idle`);
        //})
    }
}

class JumpState extends State{
    enter(scene, chef){
            chef.body.setVelocityY(this.JUMPVELOCITY);
            scene.sound.play('sfx-jump');

            // REMOVE BELOW 
            console.log('jumping');
            // REMOVE ABOVE 
            //});
    }
    execute(scene, chef){
        const {left, right, space, shift} = scene.keys;
        // transition to move if left or right is pressed
        if(left.isDown || right.isDown){
            this.stateMachine.transition('move');
            return;
        }
        // transition to hit if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)){
            this.stateMachine.transition('hit');
            return;
        }
        if(Phaser.Input.Keyboard.JustDown(space)){
            this.stateMachine.transition('jump');
            return;
        }
    }

}