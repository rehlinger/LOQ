//7.1 Write a function that wraps the given function and keeps retrying until a reply is given
/*
function MultiplicatorUnitFailure() {} //given

function primitiveMultiply(a, b) { //given
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new MultiplicatorUnitFailure();
}
let tries = 1;
function reliableMultiply(a, b) {
   try {
    return primitiveMultiply(a,b);
   } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
        tries += 1;
        return reliableMultiply(a,b);
    }
    throw (e);
   }
} 

console.log(reliableMultiply(8, 8));
console.log(tries);
*/
//7.2 Write a function that unlocks the box, runs the function, and relocks the box
/*
var box = { //given
    locked: true,
    unlock: function () { this.locked = false; },
    lock: function () { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if(box.locked) {
        box.unlock();
        try {
            return body();
        } catch (e) {
            //Remain Silent
        } finally {
            box.lock();
        }
    } else {
        return body();
    }
}

withBoxUnlocked(function () { //given
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function () { //given
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}

console.log(box.locked);
console.log(box);
*/