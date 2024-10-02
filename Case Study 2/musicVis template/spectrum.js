const { readyException } = require("jquery");

function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		fill(0,255,0)
		for (var i = 0; i< spectrum.length; i++){
			/*
			var x = map(i, 0, spectrum.length, 0, width);
		    var h = -height + map(spectrum[i], 0, 255, height, 0);
		    rect(x, height, width / spectrum.length, h );
			*/
			var x = map(spectrum[i], 0, 255, 0, width);
			var h = map(i, 0, spectrum.length, 0, height);
			var fillGreen = map(spectrum[i],0,255,255,0);
			var fillRed = spectrum[i];
			// - An amplitude value of 0 the colour values are R:0, G:255 and B:0.
			// - An amplitude value of 127 colour values are R:127, G:127 and B:0
			// - An amplitude value of 255 colour values are R:255, G:0 and B: 0
			fill(fillRed,fillGreen,0);
			rect(0,h,x, height/spectrum.length);
		}
	
		pop();
	};
}
