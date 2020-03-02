var e = new Engine(document.getElementById("mycan").getContext("2d"), 400, 400, 400);
var afr;
var mouse = new Vec3(0, 0, 4);


async function getObjString(path) {
    let res = await fetch(path);
    return await res.text();
}

class Segment {
    constructor(x, y, length, thickness = 4) {
        this.a = 0;
        this.v1 = new Vec2(x, y);
        this.v2 = new Vec2(0, 0);
        this.size = thickness;
        this.length = length;
        this.children = [];
        this.calcFront();
    }

    setDegs(angle) {
        this.a = angle * Math.PI / 180;
        // this.calcEnd();
    }

    trackPoints(x, y) {
        var dest = new Vec2(x, y);
        var delt = Vec2.sub(dest, this.v1);
        this.a = Math.atan2(delt.y, delt.x);

        delt.mag = this.length;
        delt.setScale(-1);
        this.v1 = Vec2.add(dest, delt);

        this.calcFront();
    }

    trackSeg(seg) {
        this.trackPoints(seg.v1.x, seg.v1.y);
    }

    track(xOrObj, y) {
        if(xOrObj instanceof Segment) this.trackSeg(xOrObj);
        else this.trackPoints(xOrObj, y);
    }

    calcFront() {
        this.v2.set((Math.cos(this.a) * this.length) + this.v1.x, (Math.sin(this.a) * this.length) + this.v1.y);
        // this.v1.set((Math.cos(this.a) * -this.length) + this.v2.x, (Math.sin(this.a) * -this.length) + this.v2.y);
    }
}

//from https://gist.github.com/mjackson/5311256
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

// from https://www.arduino.cc/reference/en/language/functions/math/map/
function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function lerp(x, v1, v2) {
    return Vec2.add(v1.scale(1 - x), v2.scale(x));
}

function drawPoint(x, y, r = 2) {
    var ctx = e.ctx;
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawSeg(seg) {
    var ctx = e.ctx;
    var temp = ctx.lineWidth;
    ctx.strokeStyle = "white";
    ctx.lineWidth = seg.size;
    ctx.beginPath();
    ctx.moveTo(seg.v1.x, seg.v1.y);
    ctx.lineTo(seg.v2.x, seg.v2.y);
    ctx.stroke();
    drawPoint(seg.v1.x, seg.v1.y, Math.floor(seg.size/2));
    drawPoint(seg.v2.x, seg.v2.y, Math.floor(seg.size/2));
    ctx.lineWidth = temp;
    for(var child of seg.children) {
        drawSeg(child);
    }
}

var offset = 0, step = 0.05;
var delta = 0, last = 0;
var snake = new Segment(25, 25, 1, 1);
for(var i = 250; i > 0; i--) {
    snake.children.push(new Segment(0, 0, 5, i * 0.1));
}

function loop(t) {
    delta = (t - last) / 1000;
    var i = 0;
    e.world.objects[0].children.sort((a, b)=>b.min.x-a.min.x);
    for(var c of e.world.objects[0].children) {
        var color = hsvToRgb(map(i + offset, 0, 13, 0, 1), 1, 1);
        c.color = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        i++;
    }

    var str = e.world.objects[0];
    str.rotation.x = (((mouse.y * 30) - 90) + 360) % 360;
    str.rotation.z = (((mouse.x * -30)) + 360) % 360;
    str.scale = mouse.z;
    e.update();
    e.render();


    snake.trackPoints((mouse.x * e.screen_width * 0.5) + (e.screen_width * 0.5), (mouse.y * e.screen_height * 0.5) + (e.screen_height * 0.5));

    var current = snake;
    for(var i of snake.children) {
        i.track(current);
        current = i;
    }

    drawSeg(snake);
    offset += step;
    last = t;
    afr = requestAnimationFrame(loop);
}

getObjString("./obj/birthday2.obj")
.then(str=>{
    e.loadObjFile(str.trim());
    afr = requestAnimationFrame(loop);
});

addEventListener("mousemove", e=>{
    mouse.x = (e.x - (document.documentElement.clientWidth / 2)) / (document.documentElement.clientWidth / 2);
    mouse.y = (e.y - (document.documentElement.clientHeight / 2)) / (document.documentElement.clientHeight / 2);
});

addEventListener("mousewheel", e=>{
    mouse.z -= e.deltaY * 0.001;
});
