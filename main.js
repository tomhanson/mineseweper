
function Course(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.totalSpace = this.width * this.height;
    this.bombs = bombs || (this.totalSpace / 100) * 33;

}
//create a new space object for each space
Course.prototype.createBoard = function() {
    this.spaces = [];
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
                console.log('duplicate');
            }
            //this.armed.push([bombX, bombY]);
        }
        for (cs = 0; cs < this.totalSpace; cs++ ) {
            //create the space html
            this.spaces[cs].createSpace(cs);
        }
        console.log(this.spaces);
    };
    this.bombSpaces();
};
//go through every space and check if its x & y coords match any of the ones in the armed coordinates array
/*Course.prototype.armBombs = function() {
    for(sp = 0; sp < this.spaces.length; sp++ ) {
        //for each space loop through each item and check the armed array for any matches, set armed to true if it does match
        for (bm = 0; bm < this.armed.length; bm++ ) {
            if(this.spaces[sp].x === this.armed[bm][0] && this.spaces[sp].y === this.armed[bm][1]) {
                this.spaces[sp].b = true;

                this.spaces[sp-1].bombsNear += 1;
                this.spaces[sp+1].bombsNear += 1;
            }
        }
    }
    for (cs = 0; cs < this.totalSpace; cs++ ) {
        //create the space html
        this.spaces[cs].createSpace(cs);
    }
    //check how many bombs are around the space
    this.awareness(this.spaces);
};
//prototyype to figure out how many bombs are next to the space
Course.prototype.awareness = function(param) {
    for(a = 0; a < param.length; a++) {
        if(param[a].b !== true ) {
            //console.log('I am space ' + a + '. I am not armed, check my bomb awareness');
            var diagUpLeft = (a - this.width ) - 1;
            var up = a - this.width;
            var diagUpRight = (a - this.width) + 1;
            var back = a - 1;
            var forward = a + 1;
            var diagDownLeft = (a + this.width) - 1;
            var down = a + this.width;
            var diagDownRight = (a + this.width) + 1;





            if( a - this.width >= 0 && a + this.width < this.totalSpace ) {

                if(param[up].b == true ); {
                    param[a].bombsNear += 1;
                }
            }
        }
    }
    //console.log(this.spaces);
};*/

/*-------------------------------------------------------------------------------*/

//create space object
function Space(x, y, b) {
    this.x = x;
    this.y = y;
    this.b = b;
    this.bombsNear = 0;
}
//self invoke this when using
Space.prototype.createSpace = function(number) {
    //create divs to hold info
    var sp = document.createElement("div");
    var ol = document.createElement("div");
    //reference the container
    var box = document.getElementById("minefield");
    //variables for how many bombs are nearby
    if(this.b !== true) {
        var a = document.createTextNode(this.bombsNear);
    } else {
        var a = document.createTextNode("Bomb!");
    }
    //add classes to the divs
    ol.classList.add('cover');
    sp.classList.add('space');
    sp.classList.add(this.b);
    sp.appendChild(a);
    sp.appendChild(ol);
    box.appendChild(sp);
};


x = new Course(10, 10, 30);
x.createBoard();
x.addBombs();
//x.armBombs();




