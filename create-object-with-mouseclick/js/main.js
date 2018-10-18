var game = new Phaser.Game(800, 600, Phaser.AUTO);

var scene1 = {
    
    preload: function(){
        //load phaser logo for background just because it cool
        game.load.image('logo', 'assets/phaser.png');
        //load coin image
        game.load.image('coin', 'assets/coinGold.png');

    },

    create: function(){
        
        //create phaser logo image
        var logo = game.add.image(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5);
        
        //add text to display message
        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "click anywhere to create a coin", style);

    },
    
    update: function(){
        
        //if left mouse button is clicked, createa a coin
        game.input.activePointer.leftButton.onDown.add(function(){
            var coin = game.add.sprite(game.input.activePointer.x, game.input.activePointer.y,"coin");
        },this);
    
    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


