var game = new Phaser.Game(800, 600, Phaser.AUTO,'container');

var scene1 = {
    
    preload: function(){
        //load kenney image
        game.load.image('kenney', 'assets/p1_jump.png');
        //load coin image
        game.load.image('coin', 'assets/coinGold.png');

    },

    create: function(){
        
        //add text to display message
        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "Click anywhere or use the arrow keys to move kenney around", style);
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.centerY,"kenney");
        speed = 2;
        kenney.anchor.setTo(0.5);
    
        //create coin
        coin = game.add.sprite(kenney.x + 100, kenney.y,"coin");
        coin.anchor.setTo(0.5);
        coin_count = 1;
        
         //initialize keys
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    },
    
    
    update: function(){
        
        
        //when mouse button is clicked
        game.input.activePointer.leftButton.onDown.add(function(){
            //if there is a coin, change coin position to the position of the pointer
            if(coin_count == 1){
                coin.x = game.input.activePointer.x;
                coin.y = game.input.activePointer.y;   
            }else{
                //if there is no coin, create one
                coin = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y,"coin");
                coin.anchor.setTo(0.5);
                coin_count = 1;
            }
        },this);
        
        
        
        //if there is a coin
        if(coin_count == 1){
            
            //if no key is pressed move kenney toward the coin
            if(this.noKeyIsPressed()){this.moveTowardPosition(coin.x, coin.y, kenney.x, kenney.y)}; 
          
            //if kenney and coin is overlapping, delete coin
            if(this.checkOverlap(kenney, coin)){
                coin.destroy();
                coin_count = 0;
            }
        }
        
        //move kenney with the arrow keys
        this.moveWithArrowKeys(kenney);
        
    },
    
    
    //function to move a sprite toward position
    moveTowardPosition: function(x1,y1,x2,y2){
        
        angle = Math.atan2(y1 - y2, x1 - x2);
        
        forceX = Math.cos(angle) * speed;
        forceY = Math.sin(angle) * speed;
    
        kenney.x += forceX;
        kenney.y += forceY;
    
    },
    
    //function to check if two sprite is overlaping or not
    checkOverlap: function(sprite1, sprite2){
        var boundsA = sprite1.getBounds();
        var boundsB = sprite2.getBounds();
        
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },
    
    //function to move sprite with the arrow keys
    moveWithArrowKeys: function(sprite){
        //if left key is down, decrese the position of kenney on the X axis at speed 2 pixels per frame
        if (leftKey.isDown){
            sprite.x -= speed;
        }
        
        //if right key is down, increase the position of kenney on the X axis at speed 2 pixels per frame
        if (rightKey.isDown){
            sprite.x += speed;
        }
        
        //if up key is down, decrese the position of kenney on the Y axis at speed 2 pixels per frame
        if (upKey.isDown){
            sprite.y -= speed;
        }
        
        //if left key is down, increase the position of kenney on the X axis at speed 2 pixels per frame
        if (downKey.isDown){
            sprite.y += speed;
        }
    },
    
    //function to check if none of the keys are pressed
    noKeyIsPressed: function(){
        if(leftKey.isUp && rightKey.isUp && upKey.isUp && downKey.isUp){
            a = true;
        } else{
            a = false;
        }
        
        return a;

    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


