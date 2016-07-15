function Game() {
	var self= this;
	this.width = 320;
    this.height = 640;
    //size of box
    this.size = 32;
    this.rows = 20;
    this.columns = 10;
	this.arr = [];
	this.time = 250;
	this.timeInterval = this.time;
	this.currentTime= 0;
	this.prevTime = 0;
	this.isGameOver = false;
	this.lines = 0;
	this.canvasBoard = new Board(this.rows, this.columns);
	this.currentPieceObj = null;
	this.getRandomPiece();
    this.isPaused = false;
    $(document).keyup(function(e) { self.timeInterval = self.time;});
}
Game.prototype.getRandomPiece = function() {
	var result = Math.floor(Math.random()*7);
    var piece;
    switch(result) {
        case 0: 
            piece = new PieceI(this.rows, this.columns);           
        break;
        case 1: 
            piece = new PieceO(this.rows, this.columns);       
        break;
        case 2: 
            piece = new PieceJ(this.rows, this.columns);           
        break;
        case 3: 
            piece = new PieceL(this.rows, this.columns);           
        break;
        case 4: 
            piece = new PieceS(this.rows, this.columns);    
        break;
        case 5: 
            piece = new PieceZ(this.rows, this.columns);    
        break;
        case 6: 
            piece = new PieceT(this.rows, this.columns);        
        break;
    }   
    this.currentPieceObj= piece;
};


Game.prototype.drawPiece = function() {
    var c = 0;
    piece = this.currentPieceObj.states[this.currentPieceObj.currentState];
    var x = this.currentPieceObj.x;
    var y = this.currentPieceObj.y;
    var size = this.size;
     for(var i = 0; i<piece.length; i++) {
        for(var j = 0; j<piece[i].length; j++) {
            if(this.canvasBoard.board[x+i][y+j].data!=1 && piece[i][j]==1) {
                ctx.fillStyle = this.currentPieceObj.color;
                ctx.fillRect((y+j)*size + 1, (x+i)*size + 1, size - 2, size - 2);
                this.arr[c++] = [(y+j)*size, (x+i)*size];
                ctx.strokeStyle="black";
                ctx.strokeRect((y+j)*size + 1, (x+i)*size + 1, size - 2, size - 2);
            } else if(this.canvasBoard.board[x+i][y+j].data==1 && piece[i][j]==1) {
                this.isGameOver = true;
                update();
            }
        }
    }
};

Game.prototype.clear = function(x) {
    if(x==0) {
        this.undrawPiece();
    } 
};

Game.prototype.undrawPiece = function() {
    for(var i = 0; i<this.arr.length;i++) {
        ctx.clearRect(this.arr[i][0],this.arr[i][1], this.size, this.size);
    }
    this.arr = [];

};

Game.prototype.isValidMove = function(key) {
    piece = this.currentPieceObj.states[this.currentPieceObj.currentState];
    var piece1;
    var x = this.currentPieceObj.x;
    var y = this.currentPieceObj.y;
    switch(key) {
        case 1:
        if(y<=0) {
            return false;
        } else {
            for(var i = 0; i<piece.length;i++) {
                for(var j =0; j<piece[i].length;  j++) {
                   if(this.canvasBoard.board[x+i][y+j-1].data == 1 &&
                      piece[i][j] == 1) {
                    return false;
                    } 
                }
                
            }
            return true;
        }
        break;
        case 2:
        var midx = x + (piece.length)/2;
        var midy = y + (piece[0].length)/2;
        piece1 = this.currentPieceObj.states[(this.currentPieceObj.currentState+1)%(this.currentPieceObj.states.length)];
        var newx = midx - (piece1[0].length)/2;
        var newy = midy - (piece1.length)/2;
        if(newy + piece1[0].length - 1 >= this.columns|| newy <0) {
            return true;
        } else {
            for(var i = 0; i<piece1.length;i++) {
                for(var j =0; j<piece1[i].length;  j++) {
                   if(this.canvasBoard.board[newx+i][newy+j].data == 1) {
                    return false;
                    } 
                }
            }
            return true;
        }
        break;
        case 3:
        if(y+piece[0].length -1 >= this.columns-1) {
            return false;
        } else {
            for(var i = 0; i<piece.length;i++) {
                for(var j =0; j<piece[i].length;  j++) {
                   if(this.canvasBoard.board[x+i][y+j+1].data == 1 &&
                        piece[i][j]==1) {
                    return false;
                    } 
                }
                
            }
            return true;
        }
        break;

        default: return;

    }
};

Game.prototype.leftShiftValue = function() {
    piece = this.currentPieceObj.states[this.currentPieceObj.currentState];
    var y = this.currentPieceObj.y;
    if(y + piece[0].length - 1 >= this.columns) {
        return y + piece[0].length - this.columns;
    } else if(y <0) {
        return y;
    } else {
        return 0;
    }

}

Game.prototype.isEndOfBlock = function() {
    piece = this.currentPieceObj.states[this.currentPieceObj.currentState];
    if(this.currentPieceObj.x+piece.length==this.rows) {
        return true;
    } else if(this.currentPieceObj.x==-1) {
        return false;
    } else {
        for(var i = 0; i<piece.length;i++) {
            for(var j = 0; j<piece[i].length;j++) {
                if(this.canvasBoard.board[this.currentPieceObj.x+i+1][this.currentPieceObj.y+j].data == 1 &&
                    piece[i][j]==1) {
                    return true;
                }
            }
        }
        return false;
    }
};

