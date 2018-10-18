var game = new Phaser.Game(800, 600, Phaser.AUTO);

var scene1 = {
    
    preload: function(){
        //load kenney image
        game.load.image('kenney', 'assets/p1_jump.png');

    },

    create: function(){
        
        //add text to display message
        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "click anywhere or use the arrow keys to change position of kenney", style);
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.centerY,"kenney");
        speed = 2;
        
        //initialize keys
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    },
    
    update: function(){
        
        //if left mouse button is clicked, change position of kenney to the position of the pointer
        game.input.activePointer.leftButton.onDown.add(function(){
            kenney.x = game.input.activePointer.x;
            kenney.y = game.input.activePointer.y;
        },this);
        
        //if left key is down, decrese the position of kenney on the X axis at speed 2 pixels per frame
        if (leftKey.isDown){
            kenney.x -= speed;
        }
        
        //if right key is down, increase the position of kenney on the X axis at speed 2 pixels per frame
        if (rightKey.isDown){
            kenney.x += speed;
        }
        
        //if up key is down, decrese the position of kenney on the Y axis at speed 2 pixels per frame
        if (upKey.isDown){
            kenney.y -= speed;
        }
        
        //if left key is down, increase the position of kenney on the X axis at speed 2 pixels per frame
        if (downKey.isDown){
            kenney.y += speed;
        }
    
    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


