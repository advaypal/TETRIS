
function PieceI(rows, columns) {
	this.state1=[[1],
				 [1],
				 [1],
				 [1]];
	this.state2= [[1,1,1,1]];
	this.states = [this.state1, this.state2];
	this.color = "red";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}

function PieceO(rows, columns) {
	this.states= [[[1,1],
	               [1,1]]]
	this.color="purple";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}

function PieceJ(rows, columns) {
	this.state1= [[1,1,1],
				  [0,0,1]];
	this.state2= [[1,0,0],
				  [1,1,1]];
	this.state3= [[1,1],
				  [1,0],
				  [1,0]];
	this.state4= [[0,1],
				  [0,1],
				  [1,1]];
	this.states = [this.state1, this.state4, this.state2, this.state3];
	this.color="yellow";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));

}

function PieceL(rows, columns) {
	this.state1= [[1,1,1],
				  [1,0,0]];
	this.state2= [[0,0,1],
				  [1,1,1]];
	this.state3= [[1,0],
				  [1,0],
				  [1,1]];
	this.state4= [[1,1],
				  [0,1],
				  [0,1]];
	this.states = [this.state1, this.state4, this.state2, this.state3];
	this.color="orange";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}
function PieceS(rows, columns) {
	this.state1=[[0,1,1],
				 [1,1,0]];
	this.state2=[[1,0],
				 [1,1],
				 [0,1]];
	this.states = [this.state1, this.state2];
	this.color="blue";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}

function PieceZ(rows, columns) {
	this.state1=[[1,1,0],
				 [0,1,1]];
	this.state2=[[0,1],
				 [1,1],
				 [1,0]];
	this.states = [this.state1, this.state2];
	this.color="grey";
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}


function PieceT(rows, columns) {
	this.state1=[[1,1,1],
				 [0,1,0]];
	this.state2=[[1,0],
				 [1,1],
				 [1,0]];
	this.state3=[[0,1,0],
				 [1,1,1]];
	this.state4=[[0,1],
				 [1,1],
				 [0,1]];
	this.states = [this.state1, this.state2, this.state3, this.state4];
	this.color="green"; 
	this.currentState = 0;
	this.x = -1;
	this.y = Math.floor(Math.random()*(columns-3));
}
