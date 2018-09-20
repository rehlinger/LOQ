//19.1 Add keyboard control to the div element of the app
  // The original PixelEditor class. Extend the constructor.
  class PixelEditor {
    constructor(state, config) {
      let {tools, controls, dispatch} = config;
      this.state = state;
      this.canvas = new PictureCanvas(state.picture, pos => {
        let tool = tools[this.state.tool];
        let onMove = tool(pos, this.state, dispatch);
        if (onMove) {
          return pos => onMove(pos, this.state, dispatch);
        }
      });
      this.controls = controls.map(
        Control => new Control(state, config));
      this.dom = elt("div", {
        //Inserting properties to add to the dom 
        tabIndex: 0,
        onkeydown: (event) => {
            if (event.key == "d") {
              dispatch(this.state.tool= "draw");
            }
            if (event.key == "f") {
              dispatch(this.state.tool= "fill");
            }
            if (event.key == "r") {
              dispatch(this.state.tool= "rectangle");
            }
            if (event.key == "p") {
              dispatch(this.state.tool= "pick");
            }
            if ((event.ctrlKey || event.metaKey) && event.key == "z") {
              dispatch({undo: true});
            }
        }
        //End of edit
      }, this.canvas.dom, elt("br"),
                     ...this.controls.reduce(
                       (a, c) => a.concat(" ", c.dom), []));
    }
    syncState(state) {
      this.state = state;
      this.canvas.syncState(state.picture);
      for (let ctrl of this.controls) ctrl.syncState(state);
    }
  }

//19.2 Improve the syncState method to only redraw pixels that are changing.
//----First idea is to create a diff array that will tell the drawing function what values change.
  // Change this method
  PictureCanvas.prototype.syncState = function(picture) {
    if (this.picture == picture) return;
    if(this.picture !== undefined) {
      	let modArr = [];
      	picture.pixels.map( (px,i) => {
          if (px !== this.picture.pixels[i]) {modArr.push([i,picture.pixels[i]]);}
        });
    	drawPicture(picture, this.dom, scale, modArr);
      this.picture = picture;
    } else {
		this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
    }
  };

  // You may want to use or change this as well
  function drawPicture(picture, canvas, scale, modArr) {
    function findY(px) {
        return Math.floor(px/picture.width);
    }
    function findX(px) {
        return px-findY(px)*picture.width
    }
    if (modArr !== undefined) {
      let cx = canvas.getContext("2d");
		  modArr.map( px => {
        console.log("x:", findX(px[0]), "y:", findY(px[0]), "color:", px[1]);
        let x = findX(px[0]);
        let y = findY(px[0]);
        cx.fillStyle = px[1];
        cx.fillRect(x * scale, y * scale, scale, scale);
      });
    } else {
      canvas.width = picture.width * scale;
      canvas.height = picture.height * scale;
      let cx = canvas.getContext("2d");
      for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
          cx.fillStyle = picture.pixel(x, y);
          cx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));

//19.3 Create a filled circle tool.
    function circle(pos, state, dispatch) {
      let currentPos = pos;
        function drawCircle(currentPos) {
          //console.log("start", start, "pos", pos);
          let xCenter = pos.x;
          let yCenter = pos.y;
          let radius = Math.sqrt((currentPos.x-xCenter) ** 2 + (currentPos.y-yCenter) ** 2);
          //console.log(state);
          let xStart = xCenter - Math.floor(radius);
          if(xStart < 0) xStart = 0;
          let yStart = yCenter - Math.floor(radius);
          if(yStart < 0) yStart = 0;
          let xEnd = xCenter + Math.floor(radius);
          if(xEnd >= state.picture.width) xEnd = state.picture.width-1;
          let yEnd = yCenter + Math.floor(radius);
          if(yEnd >= state.picture.height) yEnd = state.picture.height-1;
          console.log(xStart, yStart, xEnd, yEnd)
          let drawn = [];

          for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
              if (Math.sqrt(Math.abs(x-xCenter)**2+Math.abs(y-yCenter)**2) <= radius) {
                drawn.push({x, y, color: state.color});
              }
            }
          }
        dispatch({picture: state.picture.draw(drawn)});
        }
        drawCircle(currentPos)
        return drawCircle;
      }
    
    let dom = startPixelEditor({
      tools: Object.assign({}, baseTools, {circle})
    });
    document.querySelector("div").appendChild(dom);
    
//19.4 Create a line tool that will create a line between two points. 
//Then, change the draw tool to account for the gaps that occur when drawing.

function draw(pos, state, dispatch) {
  let first = pos;
  let drawn = [];

  function drawPixel(pos) {
    console.log("PIX:", pos, "from", first)
    let delta = { x: pos.x - first.x, y: pos.y - first.y }
    if (Math.abs(delta.x) > 1 || Math.abs(delta.y) > 1) {
      lineRecur(first, first, pos, drawn, state);
    } else {
      drawn.push({ x: first.x, y: first.y, color: state.color });
      drawn.push({ x: pos.x, y: pos.y, color: state.color });
    }
    first = pos;
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawPixel(pos);

  return drawPixel;
}

function line(pos, state, dispatch) {
  let start = pos;
  function drawLine(end) {
    //console.log(startPos, currentPos);
    let drawn = [];
    drawn.push({ x: end.x, y: end.y, color: state.color });

    lineRecur(start, start, end, drawn, state);

    console.log("----------start", start, "end", end, "state:", state, drawn)

    dispatch({ picture: state.picture.draw(drawn) })
  }
  drawLine(pos)
  return drawLine
}

function lineRecur(start, cur, end, drawn, state) {
  console.log("---RECUR:", start, cur, end, drawn, state)
  let delta = { x: end.x - cur.x, y: end.y - cur.y };
  if (delta.x === 0 && delta.y === 0) return
  drawn.push({ x: cur.x, y: cur.y, color: state.color });
  let slope = (end.y - start.y) / (end.x - start.x);
  //console.log("Slope:",slope)
  if (cur.x === end.x || cur.y === end.y) { return straightConnect(cur, end); }
  function straightConnect(start, end) {
    let len = 0;
    //console.log("straight:",start, end)
    if (end.x - start.x > 1 || end.x - start.x < 1) {
      len = end.x - start.x;
      for (let i = 1; i < Math.abs(len); i += 1) {
        let fillDir = len <= 1 ? -i : i;
        drawn.push({ x: start.x + fillDir, y: start.y, color: state.color });
      }
    }
    if (end.y - start.y > 1 || end.y - start.y < 1) {
      len = end.y - start.y;
      for (let i = 1; i < Math.abs(len); i += 1) {
        let fillDir = len <= 1 ? -i : i;
        drawn.push({ x: start.x, y: start.y + fillDir, color: state.color });
      }
    }
  }
  let availableMoves = [{ x: end.x - start.x > 0 ? 1 : -1, y: end.y - start.y > 0 ? 1 : -1 },
  { x: end.x - start.x > 0 ? 1 : -1, y: 0 },
  { x: 0, y: end.y - start.y > 0 ? 1 : -1 }];
  function findOffset(point) {
    let pointInt = point.x - start.x === 0 ? point.y - start.y : (point.y - start.y) - ((point.x - start.x) / -slope);//?
    let xVal = pointInt / (slope - (1 / (-slope)));//?
    let yVal = slope * xVal;//?
    return Math.sqrt(((point.x - start.x) - xVal) ** 2 + ((point.y - start.y) - yVal) ** 2)
  }
  //console.log("MOVES",availableMoves)
  let bestMove = availableMoves.reduce((col, a) => {
    let offset = findOffset({ x: a.x + cur.x, y: a.y + cur.y });
    if (offset < findOffset({ x: col.x + cur.x, y: col.y + cur.y })) {
      col = a;
    }
    return col;
  });
  lineRecur(start, { x: cur.x + bestMove.x, y: cur.y + bestMove.y }, end, drawn, state)
}