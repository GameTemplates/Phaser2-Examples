var game = new Phaser.Game(800, 600, Phaser.AUTO);

var scene1 = {
    
    preload: function(){
        //load kenney image
        game.load.image('kenney', 'assets/p1_jump.png');

    },

    create: function(){
        
        //add text to display message
        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "Use the arrow keys to rotate kenney", style);
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.centerY,"kenney");
        speed = 1;
        kenney.anchor.setTo(0.5);
        
        //initialize keys
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    },
    
    update: function(){
        
        
        //if left key is down, decrese the angle of kenney by 1 pixel per frame
        if (leftKey.isDown){
            kenney.angle -= speed;
        }
        
        //if right key is down, increase the angle of kenney by 1 pixel per frame
        if (rightKey.isDown){
            kenney.angle += speed;
        }
        
    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


