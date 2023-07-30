const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const brush_width = 10;
const brush_height = 10;
let brush_x = 0;
let brush_y = 0;

function draw_brush() {
    // ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.rect(brush_x, brush_y, brush_width, brush_height);
    ctx.fillStyle = "black";
    ctx.fill();
}

function brush_pos(e) {
    const rect = canvas.getBoundingClientRect();
    mouse_x = e.clientX - rect.left;
    mouse_y = e.clientY - rect.top;

    if (mouse_x >= 0 && mouse_x < WIDTH &&
        mouse_y >= 0 && mouse_y < HEIGHT) {
        brush_x = mouse_x - brush_width / 2;
        brush_y = mouse_y - brush_height / 2;
    }

    draw_brush();
}

canvas.addEventListener("mousedown", brush_pos);
// canvas.addEventListener("mouseout", () => {
//     ctx.clearRect(0, 0, WIDTH, HEIGHT)
// });
