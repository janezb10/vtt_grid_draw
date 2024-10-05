# vtt-grid-draw

A real-time SVG drawing VTT where multiple users can draw, erase, drag, chat. All actions are synchronized across connected clients in real time using Socket.IO.

## Features
- Draw: Users can draw lines on an SVG canvas.
- Erase: Users can erase any part of the drawing.
- Drag: Users can drag lines to reposition them.
- Pan & Zoom: Users can pan and zoom on the canvas.
- Color Picker: Change the drawing color.
- Clear All: Clear the entire drawing for all users.
- Chat: Simple chat -> needs to be improved
- Dice roller: simple dice roller (if you send chat starts with "/d ", eg "/d 3d20") -> needs to be improved  
  
## Usage
Toolbar Options:  
Pan: Click the "Pan" button to drag the canvas around.  
Draw: Click the "Draw" button to start drawing. You can change the color using the color picker.  
Erase: Click the "Erase" button to erase parts of the drawing.  
Drag: Click the "Drag" button to move drawn lines around.  
Clear All: Click the "Clear All" button to remove all drawings from the canvas.  

## How to start the App
- via Docker 
  - ``docker compose up``
- via node 
  - ``npm install``
  - ``node server.js  

  
## Mobile Support  
The app is designed to be responsive and mobile-friendly.   
You can:  
Draw, erase, and drag using touch gestures.  
Zoom in/out by pinching the screen.  
Switch between modes using the buttons in the toolbar.  

## License  
This project is licensed under the MIT License.  

## Contributing  
Feel free to contribute to the project by submitting pull requests or reporting issues. If you find any bugs or want to improve the functionality, your contributions are welcome!  

Thank You for Using the vtt-grid-draw!
