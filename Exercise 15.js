//15.1 The old runGame function. Modify it to include player lives...
function runGame(plans, Display) {
    let startingLives = 2;
      function startLevel(n, playerLives) {
          if (playerLives > 0 ) {                 
              console.log("Lives left: " + playerLives);
              runLevel(new Level(plans[n]), Display, function (status) {
                  if (status == "lost") {
                      playerLives -= 1;
                      startLevel(n, playerLives);
                  }
                  else if (n < plans.length - 1)
                      startLevel(n + 1, playerLives);
                  else
                      console.log("You win!");
              });
          } else
              startLevel(0, startingLives);
      }
      startLevel(0, startingLives);
  }
  runGame(GAME_LEVELS, DOMDisplay);

//15.2 Implement a pause action mapped to the escape key
function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    let pause = false;
    addEventListener("keypress", (event) => {
        if (event.keyCode === 27) {
            event.preventDefault();
            if (pause) {
                pause = false;
            } else {pause = true;}
        }
    });
    
    runAnimation(function (step) {
        if (!pause) {
            level.animate(step, arrows);
            display.drawFrame(step);
            if (level.isFinished()) {
                display.clear();
                if (andThen)
                    andThen(level.status);
                return false;
            }
        }
    });
  }
  runGame(GAME_LEVELS, DOMDisplay);
