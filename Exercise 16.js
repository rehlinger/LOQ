//16.1 Draw given shapes
document.querySelector("body").style.margin = "0";
var cx = document.querySelector("canvas").getContext("2d");
let bb = document.querySelector("canvas");
bb.style.border = "15px solid Chocolate";
bb.style.backgroundColor = "rgba(220,230,220,1)";

function drawTrap(bottom,top,height) {
    cx.beginPath();
    cx.moveTo(0,height);
    cx.lineTo(bottom,height);
    cx.lineTo((bottom-top)/2+top,0);
    cx.lineTo((bottom-top)/2,0);
    cx.closePath();
    cx.stroke();
}

cx.translate(20,50);
drawTrap(200,100,100);

function drawDiamond(size) {
    cx.save();
    cx.beginPath();
    cx.translate(size/Math.sqrt(2),0);
    cx.rotate(Math.PI/4);
    cx.fillRect(0,0,size,size);
    cx.restore();
}

cx.translate(250,0);
drawDiamond(100);

function drawSpring(lines, width, dist) {
    cx.beginPath();
    cx.moveTo(0,0);
    for (let i = 1;i<=lines;i++) {
        if (i%2 === 0) 
            cx.lineTo(0,dist*i);
        else cx.lineTo(width,dist*i);
    }
    cx.stroke();    
}

cx.translate(200,0);
drawSpring(12,100,8);

//Spiral increases each interval by set amount each segment, equal length segments
function drawSpiral(growth, direction, startAngle) {
    let lineLength = 5;
    startAngle = startAngle*Math.PI/180;
    cx.beginPath();
    cx.moveTo(0,0);
    cx.moveTo(
        lineLength*Math.cos(startAngle), 
        lineLength*Math.sin(startAngle)
    );
    let firstAngle = startAngle+Math.acos((lineLength+growth)/(2*lineLength));
    if (direction === 1) 
        firstAngle = startAngle-Math.acos((lineLength+growth)/(2*lineLength));
    let firstSide = lineLength+growth*firstAngle/(2*Math.PI);
    cx.lineTo(
        (firstSide)*Math.cos(firstAngle), 
        (firstSide)*Math.sin(firstAngle)
    ); 
    for (let i=1; i<=99; i++) {
        firstSide = lineLength+growth*i;
        let secondSide = (lineLength+growth*(i+1));
        let secondAngle = Math.acos((secondSide*secondSide+firstSide*firstSide-lineLength*lineLength)/(2*secondSide*firstSide));
        if (direction === 1) 
            secondAngle = -secondAngle;
        let mainAngle = firstAngle + secondAngle;
        firstAngle = mainAngle;
        
        cx.lineTo(
            (secondSide)*Math.cos(mainAngle), 
            (secondSide)*Math.sin(mainAngle)
        );   
    }
    cx.stroke();
}

function drawSpiral2(resolution, scale, direction) {
    cx.beginPath();
    cx.moveTo(0, 0);
    for (let i = 0; i < (resolution); i+=resolution/99) {
        let newX = scale*i*Math.cos(i);
        if(direction === 1)
            newX = -newX;
        cx.lineTo(
            newX,
            scale*i*Math.sin(i)
        );
    }
    cx.stroke();
}

cx.translate(200,50);
drawSpiral(.6, 0, 90);

cx.translate(0,150);
drawSpiral2(30, 2, 1);

function drawStar(points, radius) {
    if (points < 3)
        return;
    cx.beginPath();
    let startAngle = -Math.PI/2,
        startX = radius*Math.cos(startAngle),
        startY = radius*Math.sin(startAngle),
        angleInt = Math.PI*2/points;    

    cx.moveTo(startX,startY);
    
    for (let i = 0; i<points; i++) {
        let newX = radius*Math.cos(startAngle+angleInt),
            newY = radius*Math.sin(startAngle+angleInt);
        cx.bezierCurveTo(startX/2,startY/2,newX/2,newY/2,newX,newY);
        startAngle = startAngle+angleInt;
        startX = newX;
        startY = newY;
    }
    cx.strokeStyle = "orange";
    cx.stroke(); 
    cx.fillStyle = "yellow";
    cx.fill();
}

cx.translate(150,-150);
drawStar(8, 60);

//16.2 