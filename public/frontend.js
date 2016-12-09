var socket = io();
var canvas = document.getElementById('the-canvas');
var ctx = canvas.getContext('2d');
//canDraw is a boolean value to determine if you can draw
var canDraw;


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
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.ellipse(mouseX, mouseY, 20 , 20 , 0, 0, Math.PI * 2);
  ctx.fill();
}

socket.on('draw', function(coords) {
  console.log(coords);
  console.log(coords[0]);
  console.log(coords[1]);
  draw(coords[0], coords[1]);
});

canvas.addEventListener('mousemove', function eventHandler(event) {


//If canDraw is true, you can draw on canvas
if(canDraw) {
  var mouseX = event.pageX - this.offsetLeft;
  // console.log(mouseX);
  var mouseY = event.pageY - this.offsetTop;
  // console.log(mouseY);
  draw(mouseX, mouseY);
  var coords = [mouseX, mouseY];
  socket.emit('draw', coords);


}

});

canvas.addEventListener('mouseup', function eventHandler(event) {
  //canDraw sets to false on mouseup to stop drawing
  canDraw = false;
});
