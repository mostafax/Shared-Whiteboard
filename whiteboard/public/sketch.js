var socket;
let brushSize;
let brushColor;


function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');

	socket = io.connect();

	//events sent from sever for other boards
	socket.on('draw',onOtherDraw);
	socket.on('clear',Clear);

	brushColor=color('red'); //default brush color
	brushSize=30; //default brush size

}

function onOtherDraw(data)
{
	console.log("recieved " + data.brushColor.levels);
	noStroke();

	fill(data.brushColor.levels);
	ellipse(data.x*windowHeight,data.y*windowWidth,data.brushSize,data.brushSize);
}

function Clear(){
	console.log("clearr");
		background('white');
}

function mouseDragged(){
	console.log(mouseX,mouseY);
	noStroke();
	fill(brushColor);
	ellipse(mouseX,mouseY,brushSize,brushSize);

	var data={
		x:mouseX/windowHeight,
		y:mouseY/windowWidth,
		brushColor:brushColor,
		brushSize:brushSize
	}

	socket.emit('draw',data);
	console.log("sent "+data);
}

function mouseClicked(){
	console.log(mouseX,mouseY);
	noStroke();
	fill(brushColor);
	ellipse(mouseX,mouseY,brushSize,brushSize);

	var data={
		x:mouseX/windowHeight,
		y:mouseY/windowWidth,
		brushColor:brushColor,
		brushSize:brushSize
	}

	socket.emit('draw',data);
	console.log("sent "+data);
}

function draw() {

}

function keyPressed() {
	console.log(key);
	if( key == 'R')
	{
		brushColor = color('red');
	}
	if(key == 'G')
	{
		brushColor = color('green');
	}
	if(key == 'B')
	{
		brushColor = color('blue');
	}
	if(key == 'Y')
	{
		brushColor = color('yellow');
	}
	if(key == 'C')
	{
		brushColor = color('cyan');
	}
	if(key == 'M')
	{
		brushColor = color('magenta');
	}
	if(key == 'K')
	{
		brushColor = color('black');
	}
	if(key == 'E')
	{
		brushColor = color('white');
	}
	if(keyCode == ESCAPE)
	{
		console.log("clearr");
		background('white');
		socket.emit('clear');
	}
	if(keyCode == UP_ARROW)
	{
		brushSize+=3;
	}
	if(keyCode == DOWN_ARROW)
	{
		brushSize-=3;
	}
}

function toGreen() {
	brushColor = color('green');
}
function toRed() {
	brushColor = color('red');
}
function toWhite() {
	brushColor = color('white');
}
function inc(){
	brushSize += 3;
}
function dec(){
	brushSize -= 3;
}
