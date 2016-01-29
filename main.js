
function Course(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.totalSpace = this.width * this.height;
    this.bombs = bombs || (this.totalSpace / 100) * 33;
    this.spaces = [];
}
//create a new space object for each space
Course.prototype.createBoard = function() {
    var x, y, s, css;
    //run through each square and create a new space object which takes the coords as parameters
    s = 0;
    for(x = 1; x <= this.width; x++ ) {
        for(y = 1; y <= this.height; y++ ) {
            this.spaces.push( new Space(s, x, y) );
            s++;
        }
    }
    for (css = 0; css < this.totalSpace; css++ ) {
        var diagUpLeft = this.spaces[ (css - this.width ) - 1 ];
        var up = this.spaces[ css - this.width ];
        var diagUpRight = this.spaces[ (css - this.width) + 1 ];
        var back = this.spaces[ css - 1 ];
        var forward = this.spaces[ css + 1 ];
        var diagDownLeft = this.spaces[ (css + this.width) - 1 ];
        var down = this.spaces[ css + this.width ];
        var diagDownRight = this.spaces[ (css + this.width) + 1 ];
        //add these to an array in each space for easy access
        this.spaces[css].neighbours.push(diagUpLeft, up, diagUpRight, back, forward, diagDownLeft, down, diagDownRight);
    }
    console.log(this.spaces);
};
//add bombs
Course.prototype.addBombs = function() {
    //loop through the number of bombs, random number from 0 - width * height (the -1 is so it matches the array starting at 0) and assign that space object in the array a bomb
    this.bombSpaces = function() {
        var cs, th, z;
        for (z = this.bombs; z > 0; z--) {
            var bombSpace = Math.ceil( ( (Math.random() * this.totalSpace) - 1 ) );
            if(this.spaces[bombSpace].b !== true ) {
                this.spaces[bombSpace].b = true;
                //setup a for loop to run through the spaces around each bomb space
                for(th=0; th < this.spaces[bombSpace].neighbours.length; th++ ) {
                    //variable to hold the current array item of the neighbours array
                    var currentSquare = this.spaces[bombSpace].neighbours[th];

                    //if current square is undefined then skip it as its not valid in the array
                    if( typeof currentSquare != "undefined" ) {
                        switch (th) {
                            case 0:
                                if ( currentSquare.y != 10 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                            case 1:
                                currentSquare.bombsNear +=1;
                                break;
                            case 2:
                                if ( currentSquare.y != 1 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                            case 3:
                                if ( currentSquare.y != 10 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                            case 4:
                                if ( currentSquare.y != 1 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                            case 5:
                                if ( currentSquare.y != 10 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                            case  6:
                                currentSquare.bombsNear +=1;
                                break;
                            case  7:
                                if ( currentSquare.y != 1 ) {
                                    currentSquare.bombsNear +=1;
                                } else {
                                    currentSquare = undefined;
                                }
                                break;
                        }
                    }
                }
            } else {
                z++;
            }
        }
        for (cs = 0; cs < this.totalSpace; cs++ ) {
            //create the space html
            this.spaces[cs].createSpace(cs);
            this.spaces[cs].clickEvent();
        }
    };
    //invoke the function above
    this.bombSpaces();
};
/*-------------------------------------------------------------------------------*/

//create space object
function Space(space, x, y) {
    self = this;
    //set its space on the board
    self.space = space;
    self.x = x;
    self.y = y;
    self.b = false;
    self.bombsNear = 0;
    self.neighbours = [];
    self.revealed = false;
}

Space.prototype.createSpace = function() {
    //create divs to hold info
    this.sp = document.createElement("div");
    this.ol = document.createElement("div");
    this.sp.classList.add('space');
    this.sp.classList.add(this.b);
    this.ol.classList.add('cover');
    //reference the container
    this.box = document.getElementById("minefield");
    //variables for how many bombs are nearby
    if(this.b !== true) {
        //if it is not a bomb space then print out the number of bombs around that space
        this.ap = document.createElement('p');
        var text = this.bombsNear.toString();
        this.a = document.createTextNode(text);
        this.ap.innerHTML = text;
        this.sp.appendChild(this.ap);
    } else {
        //if it is a bomb space put an SVG bomb in
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
    var self = this;
    var cover = this.ol;
    //variable sets up the number your space is
    var mySpace = this.neighbours[3] + 1;
    //function to run through each space check if it has zero bombs near and then check all of its spaces around until it finishes
    var spaceCheck = function(space) {
        //check if the given space falls within the parameters of the board
        if( typeof space !== "undefined" ) {
            //set a variable to hold how many bombs are near the current space
            var bombsNear = space.bombsNear;
            //if that variable is 0 then move on
            if(bombsNear === 0 ) {
                //start a for loop to run through each item in the neighbours array(spaces around current space)
                for(ch=0; ch < space.neighbours.length; ch++ ) {
                    //variable to hold the current space as an integer
                    var currentSpace = space.neighbours[ch];
                    //if that space is defined and it doesnt have a bomb
                    if( typeof currentSpace !== "undefined" ) {
                        if( currentSpace.b !== true && currentSpace.revealed !== true && currentSpace.bombsNear === 0 ) {
                            currentSpace.ol.classList.remove('cover');
                            currentSpace.revealed = true;
                            //recursively run the function(it takes an integer parameter) until it returns false.
                            spaceCheck(currentSpace);
                        } else if( currentSpace.b !== true && currentSpace.revealed !== true && currentSpace.bombsNear !== 0 ) {
                            currentSpace.ol.classList.remove('cover');
                            currentSpace.revealed = true;
                        }
                    }
                }
            }
        }
    };
    this.sp.addEventListener("click", function() {
        cover.classList.remove('cover');
        if(self.revealed !== true ) {
            self.revealed = true;
            spaceCheck(self);

        } else {
            return false;
        }
    });
};


x = new Course(10, 10, 15);
x.createBoard();
x.addBombs();



//detect a right click
function doSomething(e) {
    var rightclick;
    if (!e) var e = window.event;
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);
    alert('Rightclick: ' + rightclick); // true or false
}

