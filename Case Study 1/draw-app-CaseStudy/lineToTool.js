function LineToTool(){
	//icon variable - takes "lineTo" JPG image from assets folder 
	this.icon = "assets/lineTo.jpg";
	//icon variable - string
	this.name = "LineTo";

	//integers for strating values of mouseX and mouseY
	var startMouseX = -1;
	var startMouseY = -1;
	//bool if we are currently drawing (mouse is held down)
	var drawing = false;
	//function for drawing
	this.draw = function(){
		//check if mouse is Pressed
		if(mouseIsPressed){
			//check if startMouseX == -1 (will always execute on first frame of holding down mouse)
			if(startMouseX == -1){
				//set start values of MouseX, Y to current values of MouseX,Y
				startMouseX = mouseX;
				startMouseY = mouseY;

				//set drawing to true
				drawing = true;

				//use loadPixels function from p5.dom.js - read pixel data from the scene and fill up pixels array with it
				//IMPORTANT: This is done as to save the current setting and any changes done to it before the draw function
				loadPixels();
			}
			//if this is not the first frame (as mouse cannot be at x position = -1)
			else{
				//updates scene with data from pixels array. 
				//IMPORTANT: This is done as to only draw one line on screen
				updatePixels();
				//draw line from startMouseX,Y to current mouseX,Y
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}
		//check if mouse is no longer pressed and drawing is set to true
		else if(drawing){
			//revert drawing, startMouseX,Y to initial values
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
