

const TILE_SIZE = 32;    // Default Tile Size in pixels
const MAP_NUM_ROWS = 11; // Number of Rows
const MAP_NUM_COLS = 15; // Number of Columns 


const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;   
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;




class Map {     // The Map. 1 is Walls. 0 is empty space for player movement
    constructor()
    {
        this.grid = [

            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


        ];
    }


    hasWallAt(x, y)  // A simple check to see there is a wall at a certain location
    {   
        if ( x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT)
        {
            return true; 
        }


        var mapGridIndexX =   Math.floor(x / TILE_SIZE);
        var mapGridIndexY =   Math.floor(y / TILE_SIZE);

        return this.grid[mapGridIndexY][mapGridIndexX] != 0;



    }

    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) // If i is equal to 0 
        {

            for (var j = 0; j < MAP_NUM_COLS; j++) // 
            {
                var tileX = j * TILE_SIZE;  // Tile Size X
                var tileY = i * TILE_SIZE; // TILE SIZE Y
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tileColor);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}


class Player {    // Player class

    constructor()
    {
        this.x = WINDOW_WIDTH / 2;   // X location of player
        this.y = WINDOW_HEIGHT / 2;  // Y location of player
        this.radius = 3;            // Size of the player
        this.turnDirection = 0;  // - 1 if left, +1 if right
        this.walkDirection = 0;  // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;   
        this.moveSpeed = 2.0;       // Speed of the player
        this.rotationSpeed = 2 * (Math.PI / 180);


    }

    update() 
    {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;
        var moveStep = this.walkDirection * this.moveSpeed;

        var newPlayerX = this.x +  Math.cos(this.rotationAngle) * moveStep;
        var newPlayerY = this.y +  Math.sin(this.rotationAngle) * moveStep;
        // Only set new player position if it is not colliding with the map walls!
        if (!grid.hasWallAt(newPlayerX, newPlayerY)) {

            this.x = newPlayerX;
            this.y = newPlayerY;
        }

    }







    
    render() {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.rotationAngle) * 20, 
            this.y + Math.sin(this.rotationAngle) * 30,
             
             );
    }
}






var grid = new Map();
var player = new Player();

function keyPressed() {
    if (keyCode == UP_ARROW){
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = -1;
    }

}

function keyReleased() {
    if (keyCode == UP_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW){
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW){
        player.turnDirection = 0;
    }



}



function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update()
{
    player.update();
}


function draw() {

    update();
    grid.render();
    player.render();
}


