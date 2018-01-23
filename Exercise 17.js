//17.1 Fetch 3 resources from server using http

let url = "http://eloquentjavascript.net/author";
let resourceType = ["text/html", "text/paintext", "application/json","application/rainbows+unicorns"];

function getResource(url, type) {
    let res = new XMLHttpRequest();
    res.open("GET",url,false);
    res.setRequestHeader("Accept",type);
    res.send(null);
    return res.responseText;
};

resourceType.map( type => {
    try {
        console.log("Fetching Resource type "+type+":\n"+getResource(url, type)+"\n");
    } catch (e) {
        console.log("Error fetching "+type+":\n"+e+"\n");
    }

});