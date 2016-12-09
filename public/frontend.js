var socket = io();
var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');
//canDraw is a boolean value to determine if you can draw
var canDraw;
var startXPosition;
var startYPosition;


// ctx.beginPath();
// ctx.fillStyle = "red";
// ctx.ellipse(200, 200, 50 , 50 , 0, 0, Math.PI * 2);
// ctx.fill();

canvas.addEventListener('mousedown', function eventHandler(event) {
  //canDraw set to true on mousedown to allow drawing
  canDraw = true;

});

//Actual drawing function
function draw(mouseX, mouseY) {
  ctx.strokeStyle = 'red';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;

  ctx.beginPath();
  ctx.moveTo = (100, 150);
  // ctx.lineTo(mouseX, mouseY, 20 , 20 , 0, 0, Math.PI * 2);
  ctx.lineTo(200, 200);
  ctx.closePath();
  ctx.stroke();
}


function drawLine(obj){
  ctx.strokeStyle = 'red';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 5;
  console.log('obj', obj);

  ctx.beginPath();
  // console.log(obj.startPoint.x);
  // console.log(obj.endPoint.x);

  ctx.moveTo(obj.startPoint.x, obj.startPoint.y);
  // ctx.lineTo(mouseX, mouseY, 20 , 20 , 0, 0, Math.PI * 2);
  ctx.lineTo(obj.endPoint.x,obj.endPoint.y);
  ctx.closePath();
  ctx.stroke();
}
socket.on('draw', function(coords) {
  console.log(coords);
  drawLine(coords);
});

canvas.addEventListener('mousemove', function eventHandler(event) {


  //If canDraw is true, you can draw on canvas
  if(canDraw) {

    var coords = {'startPoint' : { 'x' : startXPosition, 'y' : startYPosition}, 'endPoint' : {'x' : event.pageX - this.offsetLeft, 'y' : event.pageY - this.offsetTop}};
    // console.log('drawing');
    if(startXPosition && startYPosition){
      // console.log('draw line');
      drawLine(coords);
      socket.emit('draw', coords);
    }
  }
  startXPosition = event.pageX - this.offsetLeft;
  startYPosition = event.pageY - this.offsetTop;

});

canvas.addEventListener('mouseup', function eventHandler(event) {
  //canDraw sets to false on mouseup to stop drawing
  canDraw = false;
});
