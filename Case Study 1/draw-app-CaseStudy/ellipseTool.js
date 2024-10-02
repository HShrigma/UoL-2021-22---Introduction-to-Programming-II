function ellipseTool() {

    this.name = "ellipseTool";
    this.icon = "assets/ellipse.jpg";

    var startMouseX = -1;
    var startMouseY = -1;

    var drawing = false;

    this.draw = function () {
        if(mouseIsPressed){
			//check if startMouseX == -1 (will always execute on first frame of holding down mouse)
			if(startMouseX == -1){
				//set start values of MouseX, Y to current values of MouseX,Y
				startMouseX = mouseX;
				startMouseY = mouseY;

				//set drawing to true
				drawing = true;

				//use loadPixels function from p5.dom.js - read pixel data from the scene and fill up pixels array with it
				loadPixels();
			}
			//if this is not the first frame (as mouse cannot be at x position = -1)
			else{
				//updates scene with data from pixels array. 
				updatePixels();
				//draw ellipse from startMouseX,Y to current mouseX,Y
				ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
			}

		}
		//check if mouse is no longer pressed and drawing is set to true
		else if(drawing){
			//revert drawing, startMouseX,Y to initial values
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
    }
}