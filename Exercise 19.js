//Add keyboard control to the div element of the app
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
              this.state.tool = "draw";
              this.syncState(this.state);
            }
            if (event.key == "f") {
              this.state.tool = "fill";
              this.syncState(this.state);
            }
            if (event.key == "r") {
              this.state.tool = "rectangle";
              this.syncState(this.state);
            }
            if (event.key == "p") {
              this.state.tool = "pick";
              this.syncState(this.state);
            }
            if ((event.ctrlKey || event.metaKey) && event.key == "z") {
              dispatch({undo: true});
              this.syncState(this.state);
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

//   document.querySelector("div")
//     .appendChild(startPixelEditor({}));

