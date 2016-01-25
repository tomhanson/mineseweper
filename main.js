
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

    //run through each square and create a new space object which takes the coords as parameters
    for(x = 1; x <= this.width; x += 1) {
        y = 1;
        for(y = 1; y <= this.height; y += 1 ) {
            this.spaces.push( new Space(x, y) );
        }
    }
    console.log(this.spaces);
};
//add bombs
Course.prototype.addBombs = function() {
    //loop through the number of bombs and add a set of coords to the array - need to add a failsafe incase the same coords are chosen
    this.bombSpaces = function() {
        for (z = this.bombs; z > 0; z--) {
            //var bombs = this.bombs;
            var bombSpace = Math.ceil( ( (Math.random() * this.totalSpace) - 1 ) );
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
                if (typeof this.spaces[diagUpLeft] !="undefined" && this.spaces[diagUpLeft].y != 10) {
                    this.spaces[diagUpLeft].bombsNear +=1;
                }
                if (typeof this.spaces[up] !="undefined" ) {
                    this.spaces[up].bombsNear +=1;
                }
                if (typeof this.spaces[diagUpRight] !="undefined" && this.spaces[diagUpRight].y != 1) {
                    this.spaces[diagUpRight].bombsNear +=1;
                }
                if (typeof this.spaces[back] !="undefined" && this.spaces[back].y != 10) {
                    this.spaces[back].bombsNear +=1;
                }
                if (typeof this.spaces[forward] !="undefined" && this.spaces[forward].y != 1) {
                    this.spaces[forward].bombsNear +=1;
                }
                if (typeof this.spaces[diagDownLeft] !="undefined" && this.spaces[diagDownLeft].y != 10) {
                    this.spaces[diagDownLeft].bombsNear +=1;
                }
                if (typeof this.spaces[down] !="undefined" ) {
                    this.spaces[down].bombsNear +=1;
                }
                if (typeof this.spaces[diagDownRight] !="undefined"  && this.spaces[diagDownRight].y != 1) {
                    this.spaces[diagDownRight].bombsNear +=1;
                }

            } else {
                z++;
            }
        }
        for (cs = 0; cs < this.totalSpace; cs++ ) {
            //create the space html
            this.spaces[cs].createSpace(cs);
            this.spaces[cs].clickEvent();
            console.log( this.spaces[cs].x );
            console.log( this.spaces[cs].y );
            console.log( 'my bomb status is ' + this.spaces[cs].b );
            console.log( 'square is ' + cs);
            console.log( '- - - - - - - - -' );
        }
    };
    //invoke the function above
    this.bombSpaces();
};
/*-------------------------------------------------------------------------------*/

//create space object
function Space(x, y) {
    this.x = x;
    this.y = y;
    this.b = false;
    this.bombsNear = 0;

}
Space.prototype.createSpace = function(number) {
    //console.log(this);
    //create divs to hold info
    this.sp = document.createElement("div");
    this.ol = document.createElement("div");
    this.spaceNumber = number;
    this.sp.classList.add('space');
    this.sp.classList.add(this.b);
    this.ol.classList.add('cover');
    //reference the container
    this.box = document.getElementById("minefield");
    //variables for how many bombs are nearby
    if(this.b !== true) {
        this.ap = document.createElement('p');
        var text = this.bombsNear.toString();
        this.a = document.createTextNode(text);
        this.ap.innerHTML = text;
        this.sp.appendChild(this.ap);
    } else {
        this.sp.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
        <g>\
            <path d="M218.255,131.197c16.958,0,33.379,2.285,48.987,6.542V91.448h-92.995v45.008 C188.357,133.027,203.091,131.197,218.255,131.197z"/>\
            <circle fill="#020202" cx="218.255" cy="316.947" r="171.502"/>\
            <path fill="none" stroke="#000000" stroke-width="10" stroke-miterlimit="10" d="M218.255,108.849c0,0-6.776-113.407,92.398-60 c79.104,42.599,117,17,117,17"/>\
            <polygon points="422.598,23.551 430.759,46.499 452.756,36.042 442.3,58.04 465.247,66.2 442.3,74.36 452.756,96.358 430.759,85.901 422.598,108.849 414.438,85.901 392.441,96.358 402.897,74.36 379.948,66.2 402.897,58.04 392.441,36.042 414.438,46.499 	"/>\
            </g>\
        </svg>';
    }
    //stitch it all together

    this.sp.appendChild(this.ol);
    this.box.appendChild(this.sp);

};
Space.prototype.clickEvent = function() {
    var cover = this.ol;
    this.sp.addEventListener("click", function(){
        cover.classList.remove('cover');
    });
};


x = new Course(10, 10, 15);
x.createBoard();
x.addBombs();





