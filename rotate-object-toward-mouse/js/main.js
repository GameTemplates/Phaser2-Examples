var game = new Phaser.Game(800, 600, Phaser.AUTO);

var scene1 = {
    
    preload: function(){
        //load kenney image
        game.load.image('kenney', 'assets/manBlue_machine.png');

    },

    create: function(){
        
        //create kenney
        kenney = game.add.sprite(game.world.centerX, game.world.centerY,"kenney");
        speed = 1;
        kenney.anchor.setTo(0.5);

    },
    
    update: function(){
        
        //rotate kenney toward the position of the mouse
        x = game.input.activePointer.x;
        y = game.input.activePointer.y;
        
        angle = Math.atan2(y - kenney.y, x - kenney.x)*180 / Math.PI;
        kenney.angle = angle;
        
    }

    
}

game.state.add('scene1', scene1);
game.state.start("scene1");


