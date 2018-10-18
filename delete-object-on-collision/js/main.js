var game = new Phaser.Game(800, 600, Phaser.AUTO);

//initialize variables
var nextFire = 0;
var fireRate = 250; //0.25 seconds

var scene1 = {
    
    preload: function(){
        //load kenney image
        game.load.image('kenney', 'assets/manBlue_machine.png');
        
        //load bullet image
        game.load.image('bullet', "assets/laserBlue07.png");
        
        //load barrel image
        game.load.image('barrel', "assets/barrelBlack_top.png");

    },

    create: function(){
        
        //initialize ARCADE physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //initialize keys
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        //create a group to store bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        //add bullets to the group
        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
         //create a group to store barrels
        barrels = game.add.group();
        barrels.enableBody = true;
        barrels.physicsBodyType = Phaser.Physics.ARCADE;
        
        //create a bunch of barrels at the top portion of the screen and add them to the barrels group
        for(var i = 0; i<= 50; i++){
            barrel = barrels.create(game.rnd.integerInRange(10, 750),game.rnd.integerInRange(10, 250),'barrel');
            barrel.anchor.setTo(0.5);
        }
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.height - 100,"kenney");
        speed = 1;
        kenney.anchor.setTo(0.5);

    },
    
    update: function(){
        
        //rotate kenney toward the position of the mouse
        x = game.input.activePointer.x;
        y = game.input.activePointer.y;
        
        angle = Math.atan2(y - kenney.y, x - kenney.x)*180 / Math.PI;
        kenney.angle = angle;
        
        //if left mouse button or space key is down, fire bullets
        if (game.input.activePointer.isDown || spaceKey.isDown)
        {
            this.fireBullets();
        }
        
        //delete the bullet and barrel sprite on collision NOTE: unfortunately the ARCADE physics body does not support rotation, as a result collision is not perfect.
        //in the future I may update this example using a different method to check collision between the two but at the moment this is the most simple way to do it
        game.physics.arcade.collide(bullets, barrels, function(bullet, barrel){
            bullet.kill();
            barrel.kill();
        }, null, this);
        
    },
    
    render: function(){
      game.debug.text('Press left mouse button or space key to fire bullets and destroy the barrels ', 32, 32);    
        
    },
    
    //function to create bullets every 0.25 seconds
    fireBullets: function(){
        if (game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(kenney.x - 8, kenney.y - 8);
            
            bullet.angle = kenney.angle;

            game.physics.arcade.moveToPointer(bullet, 300);
        }
    }
    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


