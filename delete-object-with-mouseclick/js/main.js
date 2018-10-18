var game = new Phaser.Game(800, 600, Phaser.AUTO);

var scene1 = {
    
    preload: function(){
        //load coin image
        game.load.image('coin', 'assets/coinGold.png');

    },

    create: function(){
        
        //add text to display message
        var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(0, 0, "click a coin to delete it", style);
        
        //create a bunch of coins in random position all across the screen
        for(var i = 1; i <=30; i++){
           var coin = game.add.sprite( game.rnd.integerInRange(100, 700),game.rnd.integerInRange(100, 500),"coin");
            
           //enable input listener on coin
           coin.inputEnabled = true;

           //if coin is clicked, delete it
           coin.events.onInputDown.add(function(coin){
               coin.destroy();
           }, this);
            
        }

    },
     
    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


