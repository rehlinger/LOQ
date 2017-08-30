//13.1 Create a function that builds a table from a array of objects
var MOUNTAINS = [
    { name: "Kilimanjaro", height: 5895, country: "Tanzania" },
    { name: "Everest", height: 8848, country: "Nepal" },
    { name: "Mount Fuji", height: 3776, country: "Japan" },
    { name: "Mont Blanc", height: 4808, country: "Italy/France" },
    { name: "Vaalserberg", height: 323, country: "Netherlands" },
    { name: "Denali", height: 6168, country: "United States" },
    { name: "Popocatepetl", height: 5465, country: "Mexico" },
];

function buildTable(data) {
    let tableRoot = document.createElement("table");
    let headerNames = [];
    data.map(x => {
        for (let key in x) {
            if (headerNames.indexOf(key) === -1)
                headerNames.push(key);
        }
    });
    let header = tableRoot.appendChild(document.createElement("tr"));
    headerNames.map(x => header.appendChild(document.createElement("th"))
            .appendChild(document
                .createTextNode(x.split(' ')
                .map(([a, ...z]) => a.toUpperCase() + z.join("").toLowerCase())
                .join(" "))
            )
        );
    data.map(x => {
        let dataRows = tableRoot.appendChild(document.createElement("tr"));
        return headerNames
            .map(y => dataRows.appendChild(document.createElement("td"))
                .appendChild(document.createTextNode(x[y]))
            );
    }
    );
    let dataStyles = tableRoot.getElementsByTagName("td");
    for (let i = dataStyles.length - 1; i >= 0; i--) {
        if (!isNaN(dataStyles[i].innerText)) {
            dataStyles[i].style.textAlign = "right";
        }
    }
    return tableRoot;
}

document.body.appendChild(buildTable(MOUNTAINS));

//13.2 Recreate the function getElementsByTagName using tagName property

function byTagName(node, tagName) {
    let array = [];
    function trial(node, tagName) {
        for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];
            if (child.nodeName.toLowerCase() === tagName.toLowerCase()) {
                array.push(child);
            };
            if (child.children.length > 0) {
                trial(child, tagName);
            };
        };
    };
    trial(node, tagName);
    return array;
}
console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);

var para = document.querySelector("p");
console.log(byTagName(para, "span").length);

//13.3 Animate the cats hat to do something interesting (hat encircles the cat)

var cat = document.querySelector("#cat");
var hat = document.querySelector("#hat");
var catAngle = 0, hatAngle = 0, lastTimeCat = null, lastTimeHat = null;
function animate(time) {
    if (lastTimeCat != null)
        catAngle += (time - lastTimeCat) * 0.001;
    if (lastTimeHat != null)
        hatAngle += (time - lastTimeHat) * 0.005;
    lastTimeCat = time;
    lastTimeHat = time;
    catOffsetTop = 450 + (Math.sin(catAngle) * 40) ;
    catOffsetLeft = 250 + (Math.cos(catAngle) * 100) ;
    cat.style.top = catOffsetTop + "px";
    cat.style.left = catOffsetLeft + "px";
    hatOffsetTop = catOffsetTop + (cat.height / 2) - (hat.height / 2);
    hatOffsetLeft = catOffsetLeft + (cat.width / 2) - (hat.width / 2);
    hat.style.top = hatOffsetTop + (Math.sin(hatAngle) * 100) + "px";
    hat.style.left = hatOffsetLeft + (Math.cos(hatAngle) * 100) + "px";
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
