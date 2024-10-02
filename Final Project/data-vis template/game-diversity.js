function GameDiversity() {
  // Name for the visualisation to appear in the menu bar.
  this.name = 'Game Diversity';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'game-diversity';

  //text to display above the plot

  this.title = 'Gender Distribution in Video Games Industry: 2014-2021';

  //boolean values to determine if we are graphing out the whole chart
  //or looking at an individual year
  this.pieOrBar;
  this.clicked;
  //array for all bars, holds X and Y coordinates and whether bar is hovered
  this.bars = [];
  //selected object if one chooses to examine a pie chart
  this.pieYear;
  //pie chart object
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  // Layout object to store all common plot layout parameters and
  // methods.
  this.layout = {
    // Margin positions around the plot. Left and bottom margins are
    // bigger so there is space for axis and tick labels on the canvas.
    leftMargin: 130,
    rightMargin: width,
    topMargin: 30,
    bottomMargin: height,

    paddings: {
      top: 60,
      bottom: height - 20,
      left: 130,
      right: width - 220
    },
    plotWidth: function () {
      return this.rightMargin - this.leftMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,
  };
  // Middle of the plot: for 50% line.
  this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;

  // Default visualisation colours.
  this.femaleColour = color(255, 0, 0);
  this.maleColour = color(0, 0, 255);
  this.otherColour = color(0, 255, 0);

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.pieOrBar = false;
    this.data = loadTable(
      './data/games-diversity/games-diversity-data.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      });

  };


  this.setup = function () {
    // Font defaults.
    textSize(16);
  };
  this.draw = function () {

    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    this.selectPieOrBar();


    //when drawing bar chart
    if (this.pieOrBar == false) {
      //draw title
      this.drawTitle();
      //draw gender labels for pie/bar chart
      this.drawLabels();

      //graph out percentages with margin of 5%
      this.graphPercentages();

      //graph out chart to data
      this.graphBarChart();
    }

    //when drawing pie chart
    else {
      var pieTitle = 'Gender Distribution in Video Games Industry: ' + this.pieYear;
      var labels = ['- Male', '- Female', '- Other'];
      var colours = [this.maleColour, this.femaleColour, this.otherColour];
      var pieRow = this.data.findRow(this.pieYear, 'year');
      var pieData = [pieRow.getNum('percentage_male'), pieRow.getNum('percentage_female'), pieRow.getNum('percentage_other')];
      this.pie.draw(pieData, labels, colours, pieTitle);

    };

  };

  this.selectPieOrBar = function () {
    //check whether mouse is pressed
    window.addEventListener('mousedown', event => { this.clicked = true; });
    window.addEventListener('mouseup', event => { this.clicked = false; });

    //check if mouse is hovering a bar
    if (this.pieOrBar) {
      fill(255);
      stroke(0);
      var posX = this.layout.leftMargin;
      var posX1 = posX + 80;
      var posY = this.layout.topMargin;
      var posY1 = posY + 20;
      rect(posX,posY, 80,20);
      textAlign('center','center');
      textSize(16);
      fill(0);
      noStroke();
      text('Back',posX + 40,posY + 10);

      if(this.getMouseData(posX,posX1,posY,posY1) && this.clicked){
        this.pieOrBar = false;
        return;
      }
    }
    else {
      this.bars.forEach(element => {

        if (element.selected == true && this.clicked) {
          this.pieOrBar = true;
          this.pieYear = element.year;
          element.selected = false;
          return;
        }
      });
    }

  }

  this.drawLabels = function () {
    this.drawMaleLabels();
    this.drawFemaleLabels();
    this.drawOtherLabels();
  };

  this.drawMaleLabels = function () {
    fill(this.maleColour);
    textSize(16);

    noStroke();
    var posX = this.layout.rightMargin - 200;
    var posY = this.layout.topMargin + 20;
    var squareSize = 20;
    var offsetX = 5;
    var offsetY = 10;

    rect(posX, posY, squareSize, squareSize);
    fill(0);
    textAlign('left', 'left');
    text('- Male', posX + squareSize + offsetX, posY + offsetY);
  };

  this.drawFemaleLabels = function () {
    fill(this.femaleColour);
    textSize(16);

    noStroke();
    var posX = this.layout.rightMargin - 200;
    var posY = this.layout.topMargin + 70;
    var squareSize = 20;
    var offsetX = 5;
    var offsetY = 10;

    rect(posX, posY, squareSize, squareSize);
    fill(0);
    textAlign('left', 'left');
    text('- Female', posX + squareSize + offsetX, posY + offsetY);
  };

  this.drawOtherLabels = function () {
    fill(this.otherColour);
    textSize(16);
    noStroke();
    var posX = this.layout.rightMargin - 200;
    var posY = this.layout.topMargin + 120;
    var squareSize = 20;
    var offsetX = 5;
    var offsetY = 10;

    rect(posX, posY, squareSize, squareSize);
    fill(0);
    textAlign('left', 'left');
    text('- Other', posX + squareSize + offsetX, posY + offsetY);
  };


  this.graphPercentages = function () {
    var paddings = {
      top: this.layout.topMargin + 30,
      bottom: this.layout.bottomMargin,
      left: this.layout.leftMargin,
      right: this.layout.rightMargin - 220
    };
    //variables to space out lines on graph
    var diffX = 6.75;
    var diffY = 4.96;

    //variables to mark out year
    var yearCounter = 0;
    var years = this.data.getColumn('year');
    //create a variable to evenly divide all bars 
    var separator = Math.floor(100 / this.data.getRowCount());
    while (separator % 5 != 0) {
      separator--;
    }

    for (let i = 0; i <= 100; i += 5) {
      fill(0);
      stroke(1);

      //draw vertical
      line(this.layout.paddings.left + (i * diffX), this.layout.paddings.top,
        this.layout.paddings.left + (i * diffX), this.layout.bottomMargin - 20);

      //draw horizontal
      line(this.layout.paddings.left, this.layout.paddings.top + (i * diffY),
        this.layout.paddings.right, this.layout.paddings.top + (i * diffY));

      //label percentages
      noStroke();
      fill(150);
      textAlign('center', 'center');
      textSize(10);
      text(100 - i, paddings.left - 10, paddings.top + (i * diffY) + 4.5);

      //label years      
      if (i % separator == 0 && i != 0) {
        textSize(16);
        textAlign('center', 'center');
        var posX = this.layout.paddings.left + (i * diffX);
        var posY = this.layout.bottomMargin - 10;
        text(years[yearCounter], posX, posY);
        //add position of each bar in bar chart
        if (this.bars.length != this.data.getRowCount()) {
          this.bars.push({ posX: posX, posY: posY, selected: false, year: years[yearCounter] });
        };
        yearCounter++;
      };
    };
  };

  this.getMouseData = function (borderX, borderX1,borderY,borderY1) {
    if (
      mouseX >= borderX
      && mouseX <= borderX1
      && mouseY >= borderY
      && mouseY <= borderY1) {
      return true;
    };
    return false;
  };

  this.graphBarChart = function () {
    var years = this.data.getRowCount();
    var offsetX = 50;
    var diffY = 4.96;


    for (let i = 0; i < years; i++) {
      var percentage = {
        male: this.data.getRow(i).getNum('percentage_male'),
        female: this.data.getRow(i).getNum('percentage_female'),
        other: this.data.getRow(i).getNum('percentage_other')
      }

      var startX = this.bars[i].posX - offsetX;
      var barWidth = 90;


      //check for mouse Hovers and highlight hovered object
      if (this.getMouseData(startX, startX + barWidth,this.layout.paddings.top,this.layout.paddings.bottom) == true) {
        this.bars[i].selected = true;
        stroke(0, 255, 247, 255);
        strokeWeight(5);
        rect(startX, this.layout.paddings.top, barWidth, this.layout.paddings.bottom - 60);
        strokeWeight(1);
        noStroke();

      }

      else {
        this.bars[i].selected = false;
      };
      //graph male
      fill(this.maleColour);
      var topY = this.layout.paddings.bottom - (percentage.male * diffY);
      rect(startX, topY, barWidth, percentage.male * diffY);

      //graph female
      fill(this.femaleColour);
      topY -= (percentage.female * diffY);
      rect(startX, topY, barWidth, percentage.female * diffY);

      //graph other
      fill(this.otherColour);
      topY -= (percentage.other * diffY);
      rect(startX, topY, barWidth, percentage.other * diffY);
    };
  };

  //draw the title for the statistic
  this.drawTitle = function () {
    fill(0);
    textSize(26);
    textAlign('center', 'center');
    text(this.title, this.midX - this.layout.leftMargin, this.layout.topMargin);
  };

  this.destroy = function () {
  };

}