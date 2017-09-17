//16.1 Draw given shapes
document.querySelector("body").style.margin = "0";
let cx = document.querySelector("canvas").getContext("2d");
let bg = document.querySelector("canvas");
bg.style.border = "15px solid Chocolate";
bg.style.backgroundColor = "rgba(220,230,220,1)";

//Create a trapazoid
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

//Create a diamond
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

//Create a spring 
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

//Create a star
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

//16.2 Create a text overlay to the pie chart function
var results = [
    {name: "Satisfied", count: 800, color: "lightblue"},
    {name: "Neutral", count: 563, color: "lightgreen"},
    {name: "Unsatisfied", count: 120, color: "pink"},
    {name: "No comment", count: 151, color: "silver"}
  ];

var cx2 = document.getElementById("part2").getContext("2d");
var total = results.reduce(function(sum, choice) {
  return sum + choice.count;
}, 0);

var currentAngle = -0.5 * Math.PI;
var centerX = 300, centerY = 150;

results.forEach(function(result) {
  var sliceAngle = (result.count / total) * 2 * Math.PI;
  cx2.beginPath();
  cx2.arc(centerX, centerY, 100,
         currentAngle, currentAngle + sliceAngle);
  cx2.lineTo(centerX, centerY);
  cx2.fillStyle = result.color;
  cx2.fill();
  //start of text leader
  cx2.beginPath();
  let textAngle = currentAngle + sliceAngle/2;
  cx2.moveTo(
      centerX + 100 * Math.cos(textAngle),
      centerY + 100 * Math.sin(textAngle)
  );
  cx2.lineTo(
      centerX + 110 * Math.cos(textAngle),
      centerY + 110 * Math.sin(textAngle)
  );
  cx2.strokeStyle = "gray";
  cx2.stroke();
  cx2.textAlign = "center";
  cx2.fillStyle = "black";  
  cx2.textBaseline = "middle";
  cx2.fillText(result.count, centerX + 120 * Math.cos(textAngle),centerY + 120 * Math.sin(textAngle));
  currentAngle += sliceAngle;
});

//16.3 Create a bouncing ball within a canvas element
document.getElementById("part3").style.border = "4px solid gray";
var cx3 = document.getElementById("part3").getContext("2d");
var lastTime = null;
function frame(time) {
    if (lastTime != null)
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
let pos1x = document.getElementById("part3").getAttribute("width")/2,
    pos1y = document.getElementById("part3").getAttribute("height")/2,
    ballAngle = Math.random()*2*Math.PI;
function updateAnimation(step) {
    cx3.clearRect(0, 0, document.getElementById("part3").getAttribute("width"), 
                        document.getElementById("part3").getAttribute("height"));
    cx3.beginPath();
    let speed = 200,
        ballRadius = 10,
        canvasHeight = document.getElementById("part3").getAttribute("height"),
        canvasWidth = document.getElementById("part3").getAttribute("width"),
        pos2x = pos1x + speed * step * Math.cos(ballAngle),
        pos2y = pos1y + speed * step * Math.sin(ballAngle);
    if (pos2x+ballRadius > canvasWidth) {
        pos2x = (canvasWidth-ballRadius) - (pos2x - (canvasWidth-ballRadius));
        ballAngle = Math.PI-ballAngle;
    }
    if (pos2x-ballRadius < 0) {
        pos2x = ballRadius + (ballRadius - pos2x);
        ballAngle = Math.PI-ballAngle;
    }
    if (pos2y+ballRadius > canvasHeight) {
        pos2y = (canvasHeight-ballRadius) - (pos2y - (canvasHeight-ballRadius));
        ballAngle = -ballAngle;
    }
    if ((pos2y-ballRadius) < 0) {
        pos2y = ballRadius + (ballRadius - pos2y);
        ballAngle = -ballAngle;   
    }
    cx3.arc(pos2x, pos2y, ballRadius, 0, 2 * Math.PI);
    cx3.fill();
    cx3.fillStyle = "green";
    pos1x = pos2x;
    pos1y = pos2y;
  }

