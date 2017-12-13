// -----------------------------------------------SETUP---------------------------------------------------------
// Global Variables~~~~~~~~~~~~~~~~~~
// querySelector lets you grab CSS things on page
var canvas = document.querySelector('canvas'); // grabbing canvas from ddocument and turning it into javascrip obj
var ctx = canvas.getContext('2d'); // where you will be drawing (draw on the context of the canvas)
var r = 100;
var mouseX = 0;
var mouseY = 0;
  
// imgs are the images of the background (the frames that give the fake 3d panning perspective)
var imgs = ['images/L026.png','images/L025.png','images/L024.png','images/L023.png','images/L022.png',
'images/L021.png','images/L020.png','images/L019.png','images/L018.png','images/L017.png','images/L016.png',
'images/L015.png','images/L014.png','images/L013.png','images/L012.png','images/L011.png','images/L010.png',
'images/L009.png','images/L008.png','images/L007.png','images/L006.png','images/L005.png','images/L004.png',
'images/L003.png','images/L002.png','images/L001.png','images/000.png','images/001.png','images/002.png',
'images/003.png','images/004.png','images/005.png','images/006.png','images/007.png','images/008.png',
'images/009.png','images/010.png','images/011.png','images/012.png','images/013.png','images/014.png',
'images/015.png','images/016.png','images/017.png','images/018.png','images/019.png','images/020.png',
'images/021.png','images/022.png','images/023.png'];
var curIndex = 26;  // img 000.png (center)
var frontFull = new Image();
frontFull.src = imgs[curIndex];

// grabbing the video from the html
var video01 = document.querySelector('#netArtVid');

//Functions~~~~~~~~~~~~~~~~~~~~~~~~~~
// making the canvas the size of the browser window
function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function randX() {
  return Math.random() * canvas.width;
}

function randY() {
  return Math.random() * canvas.height;
}

function randColor() {
  var r = (Math.random() + 0.5) * 255;
  var g = (Math.random() + 0.5) * 255;
  var b = (Math.random() + 0.5) * 255;
  // return `rgb(${r}, ${g}, ${b})`; // ${variable} lets you inject variables into a string
  return 'rgba('+r+', '+g+', '+b+', 0.03)';
}

// e stands for event (the object the function calls; in this case the mouse's x and y values)
function updateMouseXY(e) {
  mouseX = e.x;
  mouseY = e.y;
}

// changeImg changes the background image based on the direction you want to view (right vs left arrow keys)
function changeImg(dir) {
  var vidLeft = netArtVid.style.left;
  if (curIndex + dir >= 0 && curIndex + dir < imgs.length - 1) {
    curIndex += dir;
    frontFull.src = imgs[curIndex];
    leftNum = Number(vidLeft);
    leftNum += dir;
    leftNumFin = leftNum.toString();
    vidLeft = leftNumFin;
    // get left value, change to num, += dir, change to string with px, assign

  }
}

// check to see if user is pressing the left or right arrow keys
function checkKey(e) {
  e = e || window.event;
  e.preventDefault();
  if (e.keyCode == '37') { //left arrow
    changeImg(-1);
  } else if (e.keyCode == '39') { // right arrow
    changeImg(1);
  }
}

// keeps the sparkles above/below cursor; supposed to let you 'draw' on video
function drawCuteFaces() {
  var x = canvas.width/2;
  var y = canvas.height/2;
  if (x == mouseX && y == mouseY) {
    x = 100;
    y = 100;
  }
  ctx.font = 'italic 15px Georgia';
  ctx.fillStyle = 'rgb(230, 70, 30)'; // fills anything with a fill
  ctx.strokeStyle = 'rgb(100,20,250)';
  ctx.fillText(' ◕*ﾟ✧', mouseX - 5, mouseY - 15);
  ctx.strokeText('✧･ﾟ', mouseX - 5, mouseY + 40);
}

// draw the text on the page (the little intro that says "hi, my name is muraokamika. nice to meet you."
function drawText() {
  var x = canvas.width/2 - 80;
  var y = canvas.height/2 + 18;
  ctx.font = 'italic 15px Georgia';
  ctx.fillStyle = 'white';
  ctx.fillText('こんにちは、村岡美佳と申します。宜しくお願いします。', x, y);
  for (i = 0; i < canvas.width; i++) {
    if (x == mouseX && y == mouseY) {
      x = x + i;
      y = y + i;
    }
  }
}

// EventListeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', updateMouseXY); // listening for the mouse movement
window.addEventListener('keydown', checkKey);

resizeCanvas();


// --------------------------------------------DRAWING----------------------------------------------------------
// fillText takes 3 properties: the string, x/y coord in 4th coord section

function draw() {
  var xMiddle = canvas.width/2;
  var yMiddle = canvas.height/2;

  ctx.drawImage(frontFull, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(230,200,245, 0.01)'; // a is for alpha (transparency)

  ctx.fillStyle = 'rgba(230,220,235, 0.1)';
  ctx.strokeStyle = 'rgba(230,220,235, 0.15)';
  ctx.beginPath();
  //var randStart = Math.random() * Math.PI;
  if (r < canvas.width) {
    r++;
    ctx.fillStyle = randColor();
    ctx.strokeStyle = 'rgba(0,0,255,.7)';
  } else if (r >= canvas.width) {
    r = 0;
    ctx.fillStyle = randColor();

  }

  drawCuteFaces();
  drawText();
  requestAnimationFrame(draw); // smarter timeout made specifically for animation
}

draw();
