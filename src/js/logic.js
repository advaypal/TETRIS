var canvas = document.getElementById("board");
var ctx = this.canvas.getContext("2d");
var gameState;
$("#start").click(function() { onStart();});
$(document).keydown(function(e) { eventHandle(e);} );
var count = 0;

function onStart() {
    count = 0;
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, 320, 640);
    gameState = new Game();
    $( "#score" ).replaceWith( "<h3 id='score'> Completed lines = "+gameState.lines+" </h3>" );
    $("#gameover").replaceWith('<p id="gameover"> </p>');
    requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimFrame;
    requestAnimationFrame(update);


    
}
    
function update() {
    if(gameState.isGameOver) {
        if(count==0) {
            $("#gameover" ).replaceWith("<h2 id='gameover'> Game Over.</h2>" );
                count++;
            }
        return;
    }
    if(gameState.isPaused) {
        return;
    }
    gameState.currentTime = new Date().getTime();
    var c = 0;
    if(gameState.currentTime - gameState.prevTime > gameState.timeInterval) {
        // update the game piece
        if(!gameState.isEndOfBlock()) {
            gameState.currentPieceObj.x+=1;
        } else {
            gameState.canvasBoard.insertPiece();
            if(gameState.isGameOver) {
                return;
            }
            c++;
            gameState.arr = [];
            gameState.timeInterval = gameState.time;
            gameState.getRandomPiece();
            gameState.currentPieceObj.x +=1;
        }
        // update time
        gameState.prevTime = gameState.currentTime;
    }
    gameState.clear(c);
    var x = gameState.currentPieceObj.x;
    var y = gameState.currentPieceObj.y;
    var piece = gameState.currentPieceObj.states[gameState.currentPieceObj.currentState];
    gameState.drawPiece();
    requestAnimationFrame(update);
}

function eventHandle(e) {
    switch(e.which) {
        case 27:
        gameState.isPaused = !gameState.isPaused;
        update();
        break;
        case 37: // left
        if(gameState.isValidMove(1)) {
           gameState.currentPieceObj.y -=1;
           update();
        }
        break;
        case 38: // up
        if(gameState.isValidMove(2)) {
            gameState.currentPieceObj.currentState= (gameState.currentPieceObj.currentState+1)%gameState.currentPieceObj.states.length;
            update();
        }
        break;
        case 39: // right
        if(gameState.isValidMove(3)) {
            gameState.currentPieceObj.y +=1; 
            update();
        }
        break;
        case 40: // down
        gameState.timeInterval = gameState.time/4;    
        break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action
}


















