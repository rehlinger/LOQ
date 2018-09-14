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
      let start = pos;
        function drawCircle(start) {
          //console.log("start", start, "pos", pos);
          let xCenter = pos.x;
          let yCenter = pos.y;
          let radius = Math.floor(Math.sqrt((start.x-xCenter) ** 2 + (start.y-yCenter) ** 2));
          //console.log(state);
          let xStart = xCenter - radius;
          if(xStart < 0) xStart = 0;
          let yStart = yCenter - radius;
          if(yStart < 0) yStart = 0;
          let xEnd = xCenter + radius;
          if(xEnd >= state.picture.width) xEnd = state.picture.width-1;
          let yEnd = yCenter + radius;
          if(yEnd >= state.picture.height) yEnd = state.picture.height-1;
          console.log(xStart, yStart, xEnd, yEnd)
          let drawn = [];
          for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
              if (Math.sqrt(Math.abs(x-xCenter)**2+Math.abs(y-yCenter)**2) <= radius) {
                drawn.push({x, y, color: state.color});
                console.log(x,y)
              }
            }
          }
        dispatch({picture: state.picture.draw(drawn)});
        }
        drawCircle(start)
        return drawCircle;
      }
    
    let dom = startPixelEditor({
      tools: Object.assign({}, baseTools, {circle})
    });
    document.querySelector("div").appendChild(dom);
    