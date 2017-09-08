//14.1 Create a event listener that prevents keyboard letters from being pressed

var field = document.querySelector("input");

field.addEventListener("keypress", (event) => {
    console.log(event)
    switch(event.key.toUpperCase()) {
        case("Q"):  event.preventDefault();
        case("W"):  event.preventDefault();
        case("X"):  event.preventDefault();
    } 
});



//14.2 Create a mouse trail (not tail!)

document.body.addEventListener("mousemove", (event) => {
    function createDots() {
        let createdDotType = document.createElement("div");
        let makeDot = document.body.appendChild(createdDotType);
        makeDot.className = "trail";
        makeDot.style.left = event.x-3 + "px";
        makeDot.style.top = event.y-3 + "px";
        function deleteDot() {
            document.body.removeChild(document.querySelector(".trail"));
        }
        setTimeout(deleteDot, 200);
    }
    //createDots(); //commented out to complete part 3
});

//14.3 Create a tabbed interface

function asTabs(node) {
    let nodes = [];
    
    let originalChildrenSize = node.children.length;

    for (let i = originalChildrenSize-1; i >= 0; i--) {
        nodes.push(node.children[i]);
        node.removeChild(node.children[i]);
    }
    function createButtons(num) {
        for (let i = num; i <= num*2-1; i++) {
            let button = document.createElement("button");
            button.className = nodes[i-num].getAttribute("data-tabname");
            button.textContent = nodes[i-num].getAttribute("data-tabname");
            nodes.push(button);
        }
    }
    createButtons(originalChildrenSize);
    for (let i = nodes.length-1; i>=0; i--) {
        node.appendChild(nodes[i]);
    }

    let buttons = node.querySelectorAll("button");
    function tabSelected(name) {
       let contentTabs = node.querySelectorAll("div")
        for (let i = 0; i<contentTabs.length; i++) {
            if (contentTabs[i].getAttribute("data-tabname") === name) {
                contentTabs[i].style.display = "";
                buttons[i].style.background = "salmon";
            } else {
                contentTabs[i].style.display = "none";
                buttons[i].style.background = "white";
            }
        }
    }

    tabSelected("one"); //default tab

    for (let i = buttons.length-1; i>=0; i--) {
        buttons[i].addEventListener("click", (event) => {
            tabSelected(event.target.className);
        });
    }
}

asTabs(document.querySelector("#wrapper"));
