
function Course(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.totalSpace = this.width * this.height;
    this.bombs = bombs || (this.totalSpace / 100) * 33;
    this.spaces = [];
}
//create a new space object for each space
Course.prototype.createBoard = function() {
    var x, y;
    y = 1;
    //run through each square and create a new space object which takes the coords as parameters
    for(x = 1; x <= this.width; x += 1) {
        this.spaces.push( new Space(x, y, false) );
        for(y = 1; y < this.height; y += 1 ) {
            this.spaces.push( new Space(x, y, false) );
        }
    }
};
//add bombs
Course.prototype.addBombs = function() {
    //loop through the number of bombs and add a set of coords to the array - need to add a failsafe incase the same coords are chosen
    this.bombSpaces = function() {
        for (z = this.bombs; z > 0; z--) {
            //var bombs = this.bombs;
            var bombSpace = Math.ceil( ( (Math.random() * 100) - 1 ) );
            if(this.spaces[bombSpace].b !== true ) {
                this.spaces[bombSpace].b = true;
                //set variables for all possible spaces around bombs
                var diagUpLeft = (bombSpace - this.width ) - 1;
                var up = bombSpace - this.width;
                var diagUpRight = (bombSpace - this.width) + 1;
                var back = bombSpace - 1;
                var forward = bombSpace + 1;
                var diagDownLeft = (bombSpace + this.width) - 1;
                var down = bombSpace + this.width;
                var diagDownRight = (bombSpace + this.width) + 1;
                //check each variable to test if it a valid item in the array
                if (typeof this.spaces[diagUpLeft] !="undefined") {
                    this.spaces[diagUpLeft].bombsNear +=1;
                }
                if (typeof this.spaces[up] !="undefined") {
                    this.spaces[up].bombsNear +=1;
                }
                if (typeof this.spaces[diagUpRight] !="undefined") {
                    this.spaces[diagUpRight].bombsNear +=1;
                }
                if (typeof this.spaces[back] !="undefined") {
                    this.spaces[back].bombsNear +=1;
                }
                if (typeof this.spaces[forward] !="undefined") {
                    this.spaces[forward].bombsNear +=1;
                }
                if (typeof this.spaces[diagDownLeft] !="undefined") {
                    this.spaces[diagDownLeft].bombsNear +=1;
                }
                if (typeof this.spaces[down] !="undefined") {
                    this.spaces[down].bombsNear +=1;
                }
                if (typeof this.spaces[diagDownRight] !="undefined") {
                    this.spaces[diagDownRight].bombsNear +=1;
                }

            } else {
                z++;
            }
            //this.armed.push([bombX, bombY]);
        }
        for (cs = 0; cs < this.totalSpace; cs++ ) {
            //create the space html
            this.spaces[cs].createSpace(cs);
        }
    };
    this.bombSpaces();
};
/*-------------------------------------------------------------------------------*/

//create space object
function Space(x, y, b) {
    this.x = x;
    this.y = y;
    this.b = b;
    this.bombsNear = 0;
}
Space.prototype.createSpace = function(number) {
    //create divs to hold info
    this.sp = document.createElement("div");
    this.sp.classList.add('space');
    this.sp.classList.add(this.b);
    this.ol = document.createElement("div");
    this.ol.classList.add('cover');
    //reference the container
    this.box = document.getElementById("minefield");
    //variables for how many bombs are nearby
    if(this.b !== true) {
        this.a = document.createTextNode(this.bombsNear);
    } else {
        this.a = document.createTextNode("Bomb!");
    }
    //stitch it all together
    this.sp.appendChild(this.a);
    this.sp.appendChild(this.ol);
    this.box.appendChild(this.sp);

};
Space.prototype.onClick = function() {
    console.log(this.sp);
    this.addEventListener = function() {
        console.log(this.sp);
    };
    //this.addEventListener();
    document.getElementById('minefield').onclick = function() {
        console.log('clicked');
    };
}();

x = new Course(10, 10, 30);
x.createBoard();
x.addBombs();





