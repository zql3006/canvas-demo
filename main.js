var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth=2;
autoSetCanvasSize(canvas)

listenToUser(canvas)


var eraserEnabled = false
pen.onclick=function(){
  eraserEnabled=false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick=function(){
  eraserEnabled=true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
black.onclick=function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
}
red.onclick=function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
yellow.onclick=function(){
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  red.classList.remove('active')
  yellow.classList.add('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
orange.onclick=function(){
  context.fillStyle = 'orange'
  context.strokeStyle = 'orange'
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
green.onclick=function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick=function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
  cyan.classList.remove('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
cyan.onclick=function(){
  context.fillStyle = 'cyan'
  context.strokeStyle = 'cyan'
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.add('active')
  purple.classList.remove('active')
  black.classList.remove('active')
}
purple.onclick=function(){
  context.fillStyle = 'purple'
  context.strokeStyle = 'purple'
  red.classList.remove('active')
  yellow.classList.remove('active')
  orange.classList.remove('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  cyan.classList.remove('active')
  purple.classList.add('active')
  black.classList.remove('active')
}
  thin.onclick=function(){
    lineWidth=2
  }
  medium.onclick=function(){
    lineWidth=6
  }
  thick.onclick=function(){
    lineWidth=10
  }
  clear.onclick=function(){
    context.clearRect(0,0,canvas.width,canvas.height)
  }
  save.onclick=function(){
    var url=canvas.toDataURL("image/png")
    var a=document.createElement('a')
    document.body.appendChild(a)
    a.href=url
    a.download='我的画'
    a.target='_blank'
    a.click()
  }
/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}



function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function drawCircle(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  //特性检测
  if (document.body.ontouchstart === undefined) {
    //非触屏设备
    canvas.onmousedown = function(a) {
      var x = a.clientX;
      var y = a.clientY;
      using = true;
      if (eraserEnabled) {
        clearRect(x, y);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };
    canvas.onmousemove = function(a) {
      var x = a.clientX;
      var y = a.clientY;
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        clearRect(x, y);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawCircle(x, y, lineWidth / 2);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.onmouseup = function() {
      using = false;
    };
  } else {
    //触屏设备
    canvas.ontouchstart = function(a) {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        clearRect(x, y);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };
    canvas.ontouchmove = function(a) {
      var x = a.touches[0].clientX;
      var y = a.touches[0].clientY;
      if (!using) {
        return;
      }
      if (eraserEnabled) {
        clearRect(x, y);
      } else {
        var newPoint = {
          x: x,
          y: y
        };
        drawCircle(x, y, lineWidth / 2);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
      }
    };
    canvas.ontouchend = function() {
      using = false;
    };
  }
}
