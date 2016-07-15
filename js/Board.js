function Board(rows, columns) {
	this.rows = rows;
	this.columns = columns;
	this.board = [[]];
	for(var i = 0; i < this.rows; i++) {
		this.board[i] = [];
		for(var j = 0; j<this.columns; j++) {
			this.board[i][j] = {};
			this.board[i][j].data = 0;
			this.board[i][j].color = "black";
		}
	}
}
Board.prototype.insertPiece = function() {
	var x = gameState.currentPieceObj.x;
	var y = gameState.currentPieceObj.y;
	var c = 0;
	piece = gameState.currentPieceObj.states[gameState.currentPieceObj.currentState];
	for(var i = 0; i<piece.length; i++) {
		for(var j = 0; j<piece[i].length; j++) {
			if(this.board[x+i][y+j].data==0) {
				this.board[x+i][y+j].data = piece[i][j];
				if(piece[i][j] == 1) {
					this.board[x+i][y+j].color = gameState.currentPieceObj.color;
				}
			}
		}
	}
	var i = piece.length - 1;
	while(i>=0) {
		c=0;
		for(var j = 0; j<this.columns;j++) {
			if(this.board[x+i][j].data==0) {
				c++;
			}
		}
		if(c==0) {
			this.clearRow(x+i);
			i++;
			gameState.lines+=1;
			$( "#score" ).replaceWith( "<h3 id='score'> Completed lines = "+gameState.lines+" </h3>" );
		}
		if(x==0) {
			gameState.isGameOver = true;
			update();
		}
		i--;
	}
	
}

Board.prototype.clearRow= function(row) {
	gameState.time -= 15;
	var size = gameState.size;
	for(var i = row; i>0; i--) {
		for(var j = 0; j<this.columns; j++) {
		   this.board[i][j].data = this.board[i-1][j].data;
		   this.board[i][j].color = this.board[i-1][j].color;
		   ctx.clearRect(j*size, i*size, size, size)
		   ctx.fillStyle = this.board[i-1][j].color;
           ctx.fillRect(j*size + 1, i*size + 1, size - 2, size - 2);
           //if(this.board[i-1][j].color!="black") {
			//ctx.strokeStyle="white";
           //} else {
           	ctx.strokeStyle="black";
           //}
           ctx.strokeRect(j*size + 1, i*size + 1, size - 2, size - 2);
		}
	}
};


















