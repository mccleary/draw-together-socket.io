#Draw Together

You will build a collaborative drawing app where multiple people on different devices can draw on the same canvas at the same time. You may use jQuery if you wish, but the instructions here assume you are using the native DOM API.

##Setup

Set up an Express + Socket.IO app.

1. make a directory for your app, and cd into it in your terminal.
2. use npm init to create a package.json file.
3. Install express and socket.io. Use the --save option for npm install so it goes into the dependencies section of your package.json file.
4. Create a backend.js file, in it set up express and socket.io to work together.
5. Create a public directory where you'll put your HTML files and JS files, and serve it up using express.static: app.use(express.static('public'));
6. Create an index.html in the public directory. Put a <canvas> element in it, make sure you give it a specific height and width.
7. Create a frontend.js file in the public directory and use a script tag in the index.html file to link to it. You now have a project where there is both client-side JS and server-side JS, it's important to keep them separate in your mind.
8. Run your backend.js: node-dev backend.js and see that it serves up your index.html on http://localhost:8000

##Add Drawing Capabilities

Allow the user to draw on the canvas by clicking on it and dragging around. Whenever mouse is down, it will leave a trail on the canvas. To do this, you can use a boolean variable to store the state of whether or not the user is currently holding his mouse down. You can update this variable when the events mousedown and mouseup occur on the canvas element. When the mouse moves (hear this via the mousemove event), you will draw on the canvas if mouseDown is true.

To register for a mousedown event on the canvas element:

canvas.addEventListener('mousedown', function eventHandler(event) {
  // do stuff in response to mouse being clicked down
});

Similarly for mouseup and mousemove. You can get the location of the mouse via event.clientX and event.clientY where event is the first parameter in the event handler function.

You may need to offset the mouse location by the top and left offsets of the canvas position, which can be gotten by canvas.offsetLeft, and canvas.offsetTop.

##Collaborative Drawing

You will now make this drawing canvas remote-simultanous-editable.

1. Setup the socket.io client-side JavaScript file if you haven't already: <script src="/socket.io/socket.io.js"></script>
2. Create a socket by simply calling the io function: var socket = io()
3. On the server-side (backend.js), set up a connection event handler (triggered when a socket.io client connects to the server) for socket.io. io.on('connection', function(socket) { ... }). Print out a message when a client connects.
4. Whenever a dot is drawn on the canvas on the frontend, send a "draw" message to the server using socket.emit(...). The message data parameter needs to contain the x and y coordinates of the location where a dot was draw.
5. In your server side (backend.js), set up socket.io to relay that "draw" message to other clients using socket.broadcast.emit("draw", ...).
6. In your frontend.js, set up an event listener for the "draw" message to listen for dots being drawn by other users. When a "draw" message is received, draw a dot on the canvas based on the location that's transmitted.
7. You should now have a collaborative drawing app. Try opening 2 browsers and drawing on either one. Better yet, try connecting to the server from 2 different computers.

##Improve Drawing

Now you will improve the drawing experience by making it it draw connected lines instead of disconnected dots. To do this, you will need to draw line segments as you go instead of drawing dots as you go. This also changes the message body you send over to other clients because you will send over the information required to represent a line segment - two points, as opposed to just one point. Also, you will need to remember the last point where the mouse moved, vs where it is now, in order to draw a line between the two points. To do this, you will use a new variable lastMousePosition to remember the last x and y mouse positions as reported by the mousemove event, it would be an object containing properties x and y like { x: 43, y: 93 }. You will need to write code to update the value of lastMousePosition at the end the event handler of each mousemove event occurrence.

1. In the client-side, create a variable called lastMousePosition.
2. In the mousemove event handler, perform this refactoring step: consolidate the x and y positions you were using to draw the dot into an object, and store it into the variable mousePosition.
3. In the last part of the mousemove event handler, save the value of mousePosition into lastMousePosition.
For drawing, replace the code for drawing the dot with the code for drawing a line segment starting from the last mouse position to the current position. To prevent an undefined error initually, you will only draw if lastMousePosition exists.
5. Drawing on the canvas now should yield smooth lines. But collaborative drawing is now broken - as it it doesn't yield smooth lines on other connected clients.

##Fix Collaborative Drawing

We now want to update collaborative drawing so that line segments are draw on all clients simultaneously

1. Frontend: update the body of the "draw" message to contain two points, not just one. The message body might now look like: { startPoint: { x: 124, y: 111 }, endPoint: { x: 312, y: 189 } }
2. Frontend: update the event listener for the "draw" message to draw line segments as well, not dots.

##Changing Colors

Add the ability to change colors. You have 2 options:

1. Make a group of buttons. Each button selects a specific color. Register a click event handler for each color button.
2. Create a color input:
. Register a change event handler for the color picker and you can access its value property to get the currently selected color.

##Changing pen thickness

Add the ability to change thickness of the pen.

1. Make a group of buttons for different thicknesses.
2. Make a number input:
 and let the user select a line thickness.

##Eraser

Add the ability to erase.

#Bonus challenges

Here are some bonus challenge ideas, you may choose which one(s) to go after.

1. Add the ability to restore the previous state of the drawing for new comers to the drawing. Meaning: historical strokes should restore for any new user coming to the drawing.
2. Persist the state of the drawings either into a database or to files so that they can be restored even after a server restart.
3. Turn this app into Pictionary.
4. Use socket.io's rooms feature to allow different groups of drawers to draw on different paintings. A drawer will initially asked to be "joined" to a specific room, and there will be one painting for each room.
