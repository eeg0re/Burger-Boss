class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction, camera, player){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // bind state machine to each instance of an enemy 
        this.enemyFSM = new StateMachine('inert', { 
            inert: new InertState(),
            chase: new ChaseState(),
        }, [scene, this, camera, player, frame])

        this.direction = direction;
        this.VELOCITY = 100;
        this.JUMPVEL = -400;
        this.points = 1000; 

        // adjust enemy hitbox
        this.setSize(20, 55).setOffset(0,15);

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
    execute(scene, enemy, camera, player, frame){
        let moveDirection = new Phaser.Math.Vector2(0,0);
        // pickle is facing the wrong way so we flip him differently
        if(frame != 'pickle1'){
            if(enemy.x < player.x){
                moveDirection.x = 1;
                enemy.resetFlip();
            }
            else if(enemy.x > player.x){
                moveDirection.x = -1;
                enemy.setFlip(true, false);
            }
        }
        else{
            if(enemy.x < player.x){
                moveDirection.x = 1;
                enemy.setFlip(true, false);
            }
            else if(enemy.x > player.x){
                moveDirection.x = -1;
                enemy.resetFlip();
            }
        }
        // if the enemy is blocked on its sides, make it jump 
        if ((enemy.body.blocked.left || enemy.body.blocked.right) && enemy.body.blocked.down ){
            enemy.body.setVelocityY(enemy.JUMPVEL);
        }
        enemy.anims.play(frame+'-walk', true);
        enemy.body.setVelocityX(enemy.VELOCITY * moveDirection.x);
    }
}