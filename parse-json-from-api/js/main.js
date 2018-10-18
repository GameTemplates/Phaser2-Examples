var game = new Phaser.Game(800, 600, Phaser.AUTO);
var person = "";
var planet = "";
var num = "";
var mouseDown = 0;
var keyDown = 0;


var scene1 = {
    
    preload: function(){
        //load star wars logo image
        var image = game.load.image('logo', 'assets/sw.png');

        //get a random character from SWAPI
        get_character_fromAPI();

    },

    create: function(){

        //allow mouse input
        game.input.mouse.capture = true;
        game.input.keyboard.capture = true;

        //create logo
        sprite = game.add.sprite(game.world.centerX, 100,"logo");
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        //creating text to display character information
        var style = { font: "30px Play", fill: "#FBEF42", boundsAlignH: "center", boundsAlignV: "middle" };
        text = game.add.text(250, 200, "placeholder", style);
        text.size = 16;

        //creating text to display message on the bottom
        var style2 = { font: "20px Play", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" };
        message = game.add.text(40, 570, "Press any key or left mouse button to get a random character from the SWAPI", style2);
        message.size = 16;

    },
    
    update: function(){

        //update text to display person info
        if(person.name !=="" && person.name != null){
            text.text = `NAME: ${person.name} \nGENDER: ${person.gender} \nHOMEWORLD: ${planet.name}`;
        }else{
            text.text = "sending request to API...";
        }

        //if left mouse button is down, get new person from the API
        if(game.input.activePointer.leftButton.isDown && mouseDown == 0){
            get_character_fromAPI()
            mouseDown = 1;
        }

        //if any key is pressed, get new person from the API
        game.input.keyboard.onPressCallback = function(){
            if(keyDown == 0){
                get_character_fromAPI();
                keyDown = 1;
            }
        }


        //if mouse button is up, reset mouseDown so we can click again
        if(mouseDown == 1){
            if(game.input.activePointer.leftButton.isUp){mouseDown = 0}
        }

        //if all keyboard button is up, reset keyDown so we can press any key again
        if(keyDown == 1){
            game.input.keyboard.onUpCallback = function(){
                keyDown = 0;
            }
        }
        
    }
        
    
}

//add scene to state and start the state
game.state.add('scene1', scene1);
game.state.start("scene1");


//-------------------------FUNCTIONS---------------------------------

//function to get a random character form the SWAPI
function get_character_fromAPI(){
    person.name="";
    num = 1 + Math.floor(Math.random() * 61);
        //get a random person from swapi
        person = fetch(`https://swapi.co/api/people/${num}/`)
            .then((data) => data.json())
            .then((json) => person = json); 

        //get a random planet from swapi
        planet = fetch(`https://swapi.co/api/planets/${num}/`)
            .then((data) => data.json())
            .then((json) => planet = json); 
}


