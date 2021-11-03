var socket;

var textfield;
var output;
var submit;
var keys = [];
let words = [];
let word_count = {};
let font;
var counts= {};

function preload() {
  font = loadFont('font/LLPIXEL3.ttf');

}

function setup(){

  ///////////////////////////////////////

  createCanvas(windowWidth, windowHeight);
  let colors = [color(255, 0, 11),
    color(255, 254, 59)]
    background (colors[floor(random(colors.length))]);
    frameRate(1);
    // textfield = createInput("text predictive");
    textfield = select("#txt");
    output = select('#output');
    submit = select("#submit");
    submit.mousePressed(newText)

///////////////////////////////////////

  socket = io.connect('http://localhost:3000');
  socket.on('textsending', textReceived);
}

function textReceived(data){
  textAlign(CENTER, CENTER);
  textFont('courier');
  var words = textfield.value();
  let alpha = 256;
  let colors = [color(255, 0, 11, alpha),
    color(255, 254, 59, alpha)]
  for(let i = 0; i <1; i++){
    var xpos=random(10, width - 10)
    var ypos=random(10, height - 10)
    let bbox = font.textBounds(words, xpos, ypos, 50);

    rectMode(CENTER);
    fill(colors[floor(random(colors.length))]);
    noStroke();
    rect(bbox.x+10,ypos+7, random(1000), random(200));
    textFont(font);
    textSize(50);
    fill('black');
    text((data.x), xpos, ypos);

  }

  }


function newText() {
    }

function draw() {

  textAlign(CENTER, CENTER);
  textFont('courier');
  var words = textfield.value();
  let alpha = 256;
  let colors = [color(255, 0, 11, alpha),
    color(255, 254, 59, alpha)]
    for(let i = 0; i <1; i++){
      var xpos=random(10, width - 10)
      var ypos=random(10, height - 10)
      let bbox = font.textBounds(words, xpos, ypos, 50);

      rectMode(CENTER);
      fill(colors[floor(random(colors.length))]);
      noStroke();
      rect(bbox.x+10,ypos+7, random(1000), random(200));
      textFont(font);
      textSize(50);
      fill('black');
      text((words), xpos, ypos);

    }

    console.log('Sending' + ' : '  + textfield.value());

    var data = {
      x : textfield.value()
    }
    socket.emit('textsending',data);

// console.log (textsending);


  }
