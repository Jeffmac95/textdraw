const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let brush_x = 0;
let brush_y = 0;

document.addEventListener('mousedown', start);
document.addEventListener('mouseup', stop);

function start(e) {
    document.addEventListener('mousemove', draw);
    pos(e);
}

function pos(e) {
    const rect = canvas.getBoundingClientRect();
    brush_x = e.clientX - rect.left;
    brush_y = e.clientY - rect.top;
}

function stop() {
    document.removeEventListener('mousemove', draw)
}

function draw(e) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.moveTo(brush_x, brush_y);
    pos(e);
    ctx.lineTo(brush_x, brush_y);
    ctx.stroke();
    
}