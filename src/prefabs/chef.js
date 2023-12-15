class Chef extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // adjust the chef's hitbox
        this.body.setSize(20, 28).setOffset(1, 10);

        // set custom chef properties
        this.chefVelocity = 300;
        this.direction = direction;
        this.ACCELERATION = 700;
        this.DRAG = 1100;
        this.JUMPVELOCITY = -400;
        this.MAX_X_VEL = 300;
        this.MAX_Y_VAL = 5000;

        this.spatula; 
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
    update(){
        if(this.spatula){
            this.spatula.x = this.direction == 'left' ? this.x-20 : this.x+20
            this.spatula.y = this.y;
        }
    }
}

// chef specific state classes
class IdleState extends State {
    enter(scene, chef){
        chef.body.setAccelerationX(0);
        chef.body.setDragX(chef.DRAG);
        chef.anims.play(`chef-idle`);
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
        if(Phaser.Input.Keyboard.JustDown(space) && chef.body.blocked.down){
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
        if(Phaser.Input.Keyboard.JustDown(space) && chef.body.blocked.down){
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
            chef.setFlip(true, false);
        }
        else if (right.isDown){
            moveDirection.x = 1;
            chef.direction = 'right';
            chef.resetFlip();
        }

        // normalize movement vector, update position, play animation 
        moveDirection.normalize();
        chef.body.setAccelerationX(moveDirection.x * chef.ACCELERATION);
        chef.anims.play(`chef-walk`, true);
    }
}


class HitState extends State{
    enter(scene, chef){
        chef.anims.play(`chef-hit`);
        if(chef.direction == 'left'){
            chef.spatula = scene.physics.add.sprite(chef.x-20, chef.y, 'spatula');
            chef.spatula.setFlip(true, false);
        }
        else{
            chef.spatula = scene.physics.add.sprite(chef.x+20, chef.y, 'spatula');
            chef.spatula.resetFlip();
        }
        chef.spatula.body.setAllowGravity(false);
        chef.spatula.body.setSize(32, 12).setOffset(15,20);

        // add a collider between the spatula and enemies
        scene.physics.add.collider(chef.spatula, scene.enemies, (spatula, enemy)=> {
            enemy.destroy();
            delete scene.enemy_array[scene.enemy_array.indexOf(enemy)];
            scene.events.emit('addScoreEnemy');
            scene.sound.play('sfx-enemy-dead');
            scene.emitter2 = scene.add.particles(enemy.x, enemy.y, 'particle', {
                speed: 250,
                lifespan: 2000,
                scale: {start: 1, end: 0},
                gravityY: 150,
                blendMode: 'ADD',
                emitting: false
            });
            scene.emitter2.explode(30);
        });

        chef.once(`animationcomplete`, ()=> {
            this.stateMachine.transition(`idle`);
            chef.spatula.destroy();
        })
    }
}

class JumpState extends State{
    enter(scene, chef){
            chef.body.setVelocityY(chef.JUMPVELOCITY);
            scene.sound.play('sfx-jump');
            chef.anims.play('chef-jump', true);
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
        if(Phaser.Input.Keyboard.JustDown(space) && chef.body.blocked.down){
            this.stateMachine.transition('jump');
            return;
        }
    }

}