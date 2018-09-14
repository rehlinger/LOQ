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
    if (this.picture !== undefined) {
      let updateArr = [];
      this.picture.pixels.map( (px,i) => {
          if(px !== picture.pixels[i]) {} else {
            this.picture.pixels[i] = px;
            updateArr.push(i);
          }
      });
      drawPicture(this.picture, this.dom, scale, updateArr);
      this.picture = picture;
      updateArr = [];
    } else {
      this.picture = picture;
      drawPicture(this.picture, this.dom, scale);
    }
  };

  // You may want to use or change this as well
  function drawPicture(picture, canvas, scale, updateArr) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");
    if (updateArr !== undefined) {
      updateArr.map(px => {
        cx.fillStyle = picture.pixels[px];
        cx.fillRect((px-canvas.height*Math.floor(px/canvas.width)) * scale, Math.floor(px/canvas.height) * scale, scale, scale);
      });
    } else {
      for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
          cx.fillStyle = picture.pixel(x, y);
          cx.fillRect(x * scale, y * scale, scale, scale);
        }
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({})