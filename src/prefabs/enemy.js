class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction, camera, player){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // bind state machine to each instance of an enemy 
        this.enemyFSM = new StateMachine('inert', { 
            inert: new InertState(),
            chase: new ChaseState(),
        }, [scene, this, camera, player])

        this.direction = direction;
        this.VELOCITY = 100;
        this.JUMPVEL = -400;
        this.points = 1000; 

    }

    update(){
        // update this enemy's state machine
        this.enemyFSM.step();
    }
}

class InertState extends State {
    enter(scene, enemy, camera){

    }
    execute(scene, enemy, camera){
        if((enemy.x >= camera.worldView.x && enemy.x <= (camera.worldView.x + width)) &&  (enemy.y >= camera.worldView.y && enemy.y <= (camera.worldView.y + height))){
            this.stateMachine.transition('chase')
        }
    }
}

class ChaseState extends State {
    enter(scene, enemy, camera, player){
        
    }
    execute(scene, enemy, camera, player){
        let moveDirection = new Phaser.Math.Vector2(0,0);
        if(enemy.x < player.x){
            moveDirection.x = 1;
            enemy.resetFlip();
        }
        else if(enemy.x > player.x){
            moveDirection.x = -1;
            enemy.setFlip(true, false);
        }
        if ((enemy.body.blocked.left || enemy.body.blocked.right) && enemy.body.blocked.down ){
            enemy.body.setVelocityY(enemy.JUMPVEL);
        }
        enemy.body.setVelocityX(enemy.VELOCITY * moveDirection.x);
    }
}