
function Course(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.bombs = bombs;
    this.totalSpace = this.width * this.height;
}

Course.prototype.createBoard = function() {

    this.spaces = [];
    var x, y;
    x = 1;
    y = 1;
    //run through each square and create a new space object which takes the coords as parameters
    for(x = 1; x <= this.width; x += 1) {
        this.spaces.push( new Space(x, y, false) );
        for(y = 1; y < this.height; y += 1 ) {
            this.spaces.push( new Space(x, y, false) );
        }
    }
    //console.log(this.spaces);
};

//create space markup

function Space(x, y, b) {
    this.x = x;
    this.y = y;
    this.b = b;
    //console.log('my coordinate is ' + x + ' ' + y + '. My armed status is ' + b);
}
//self invoke this when using
Space.prototype.createSpace = function() {
    var ls = document.createElement("div");
    ls.classList.add('space');
    var t = document.createTextNode(x);
    ls.appendChild(t);
    var box = document.getElementById("minefield");
    box.appendChild(ls);
};


Course.prototype.addBombs = function() {
    //randomly generate the two numbers here, assign them to the array - if the array has them then keep trying numbers
    bombX = Math.floor( ( (Math.random() * 10) + 1 ) );
    bombY = Math.floor( ( (Math.random() * 10) + 1 ) );

    this.armed = [];
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
Course.prototype.armBombs = function() {
    //console.log(this.spaces[40].x);
    //console.log(this.spaces[40].y);
    for(sp = 0; sp < this.spaces.length; sp++ ) {
        for (bm = 0; bm < this.armed.length; bm++ ) {
            if(this.spaces[sp].x === this.armed[bm][0] && this.spaces[sp].y === this.armed[bm][1]) {
                this.spaces[sp].b = true;
            }
        }
        if(this.spaces[sp].b === true ) {
            console.log(this.spaces[sp]);
        }
    }
    console.log(this.spaces);
};

x = new Course(10, 10, 33);
x.createBoard();
x.addBombs();
x.armBombs();




