//5.1 Write a vector constructor that takes 2D vector inputs
/*
//Initial constructor with incorrect use of length getter
function Vector(x,y) {
    this.x = x;
    this.y = y;
    //Vector.prototype.length = Math.sqrt((this.x*this.x)+(this.y*this.y))
}
Vector.prototype.plus = function(vec2) {return new Vector(this.x+vec2.x, this.y+vec2.y);};
Vector.prototype.minus = function(vec2) {return new Vector(this.x-vec2.x, this.y-vec2.y);};
Object.defineProperty(Vector.prototype, "length", {get: function() {return Math.sqrt((this.x*this.x)+(this.y*this.y));}});

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log(new Vector(3, 4).length);

*///5.2 Implement a cell named StretchCell that conforms to table cell interface
//Givens-----v
/*
function TextCell(text) {
    this.text = text.split("\n");
}

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
      result += string;
    return result;
  }

TextCell.prototype.minHeight = function() {
    return this.text.length;
  };

TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
      return Math.max(width, line.length);
    }, 0);
  };

TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
      var line = this.text[i] || "";
      result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

//Ensures cells are greater than given values y,z and given constructor x
function StretchCell(con,y,z) {
  this.con = con;
  this.width = y;
  this.height = z;
};

StretchCell.prototype.minWidth = function() {return Math.max(this.width, this.con.minWidth());};
StretchCell.prototype.minHeight = function() {return Math.max(this.height, this.con.minHeight());};  
StretchCell.prototype.draw = function(e,f) {return this.con.draw(e,f);}; 

var sc = new StretchCell(new TextCell("abc\n\n\nff"), 1, 2);

console.log(sc.minWidth());
console.log(sc.minHeight());
console.log(sc.draw(1, 2));

*///5.3 Design an interface for an array argument
/*
//Initial try - Improper use of external object as assumed to use get/set methods.
  let iface = {
    limit: 0,
    obj: undefined,
    get logg() { 
      for (let i = 0; i < Math.min(this.obj.arr.length, this.obj.limit); i++) {
        console.log(this.obj.arr[i])}
      }
  }

  function logFive(con) {
    iface.obj = con;
    iface.obj.limit = 5;
    return iface.logg;
  }

  function ArraySeq(arr) {
    this.arr = arr;
  };

  function RangeSeq(num1, num2) {
    outArray = [];
    for (let i = num1; i<=num2 ; i++) {outArray.push(i);};
    this.arr = outArray;
  }

  logFive(new ArraySeq([1,2])); 
  logFive(new RangeSeq(100, 1000)); 
*///Second answer using no external object and using only prototype methods
/*
function ArraySeq(arr) {
  this.pos = -1;
  this.arr = arr;
}

ArraySeq.prototype.enum = function() {
  return this.arr[this.pos];
};

ArraySeq.prototype.next = function() {
  if (this.pos < this.arr.length - 1 ) {
    this.pos += 1;
    return false;
  } else {return true;}
};

function logFive(con) {
  for (let i = 0; i < 5; i++) {
    if (!con.next()) {
      console.log(con.enum());
    }
  }
}

logFive(new ArraySeq([1,2])); 

function RangeSeq(start, end) {
  this.pos = start - 1;
  this.end = end;
}

RangeSeq.prototype.enum = function() {
  return this.pos;
};

RangeSeq.prototype.next = function() {
  if (this.pos < this.end - 1 ) {
    this.pos += 1;
    return false;
  } else {return true;}
};

logFive(new RangeSeq(100, 1000));
*/