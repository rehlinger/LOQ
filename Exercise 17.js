//17.1 Fetch 3 resources from server using http
// let url = "http://eloquentjavascript.net/author";
// let resourceType = ["text/html", "text/paintext", "application/json", "application/rainbows+unicorns"];

// function getResource(url, type) {
//     let res = new XMLHttpRequest();
//     res.open("GET", url, false);
//     res.setRequestHeader("Accept", type);
//     res.send(null);
//     return res.responseText;
// };

// resourceType.map(type => {
//     try {
//         console.log("Fetching Resource type " + type + ":\n" + getResource(url, type) + "\n");
//     } catch (e) {
//         console.log("Error fetching " + type + ":\n" + e + "\n");
//     }
// });

//17.2 Construct a function that replaces the functionality of the Promise.all method

function all(promises) {
    return new Promise(function(success, fail) {
        let arrOut = [];
        promises.map(promise => {
            arrOut.push(success(promise.then()));
    });
}

//test code
all([]).then(function (array) {
    console.log("This should be []:", array);
});
function soon(val) {
    return new Promise(function (success) {
        setTimeout(function () { success(val); },
            Math.random() * 500);
    });
}
all([soon(1), soon(2), soon(3)]).then(function (array) {
    console.log("This should be [1, 2, 3]:", array);
});
function fail() {
    return new Promise(function (success, fail) {
        fail(new Error("boom"));
    });
}
all([soon(1), fail(), soon(3)]).then(function (array) {
    console.log("We should not get here");
}, function (error) {
    if (error.message != "boom")
        console.log("Unexpected failure:", error);
});