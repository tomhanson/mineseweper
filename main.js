
function Course(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.totalSpace = this.width * this.height;
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
//create space markup
function Space(x, y, b) {
    this.x = x;
    this.y = y;
    this.b = b;
    //console.log('my coordinate is ' + x + ' ' + y + '. My armed status is ' + b);
}
//self invoke this when using
Space.prototype.createSpace = function(number) {
    var ls = document.createElement("div");
    var sp = document.createElement("div");
    ls.classList.add('space');
    ls.classList.add(this.b);
    var t = document.createTextNode(number + 1);
    var a = document.createTextNode(this.b);
    ls.appendChild(t);
    sp.appendChild(a);
    var box = document.getElementById("minefield");
    ls.appendChild(sp);
    box.appendChild(ls);
};
//make this a space prototype that takes spaces array as its parameter
Course.prototype.addBombs = function() {
    //randomly generate the two numbers here, assign them to the array - if the array has them then keep trying numbers
    bombX = Math.floor( ( (Math.random() * 10) + 1 ) );
    bombY = Math.floor( ( (Math.random() * 10) + 1 ) );
    //empty array which will hold the armed space coords.
    this.armed = [];
    //loop through the number of bombs and add a set of coords to the array - need to add a failsafe incase the same coords are chosen
    this.bombSpaces = function() {
        for (z = 1; z <= this.bombs; z++) {
            bombX = Math.floor( ( (Math.random() * 10) + 1 ) );
            bombY = Math.floor( ( (Math.random() * 10) + 1 ) );
            this.armed.push([bombX, bombY]);
            //console.log('Coords x:' + bombX + ' and y:' + bombY + ' are armed');
        }
    };
    this.bombSpaces();
};
//go through every space and check if its x & y coords match any of the ones in the armed coordinates array
Course.prototype.armBombs = function() {
    //console.log(this.spaces[40].x);
    //console.log(this.spaces[40].y);
    for(sp = 0; sp < this.spaces.length; sp++ ) {
        //for each space loop through each item and check the armed array for any matches, set armed to true if it does match
        for (bm = 0; bm < this.armed.length; bm++ ) {
            if(this.spaces[sp].x === this.armed[bm][0] && this.spaces[sp].y === this.armed[bm][1]) {
                this.spaces[sp].b = true;
            }
        }
        if(this.spaces[sp].b === true ) {
            console.log(this.spaces[sp]);
        }
    }
    for (cs = 0; cs < this.totalSpace; cs++ ) {
        this.spaces[cs].createSpace(cs);
    }
    console.log(this.spaces);
};

x = new Course(10, 10, 30);
x.createBoard();
x.addBombs();
x.armBombs();




