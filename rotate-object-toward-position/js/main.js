var game = new Phaser.Game(800, 600, Phaser.AUTO);

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
        text = game.add.text(0, 0, "Click anywhere to change the position of the coin, kenney will follow", style);
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.centerY,"kenney");
        speed = 1;
        kenney.anchor.setTo(0.5);
        
        //create coin
        coin = game.add.sprite(kenney.x + 100, kenney.y,"coin");

    },
    
    update: function(){
        
        
        //change position of the coin when mouse is clicked
        game.input.activePointer.leftButton.onDown.add(function(){
            coin.x = game.input.activePointer.x;
            coin.y = game.input.activePointer.y;
        },this);
        
        
        //rotate kenney toward the position of the coin
        x = coin.x;
        y = coin.y;
        
        angle = Math.atan2(y - kenney.y, x - kenney.x)*180 / Math.PI;
        if(angle == 0){ angle = 1};
        if(kenney.angle <= angle){ kenney.angle += speed};
        if(kenney.angle >= angle){ kenney.angle -= speed};
        
    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


