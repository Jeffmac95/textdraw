const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const thick_stroke = document.querySelector("#thicc_stroke");
const eraser = document.querySelector("#eraser");
const text_area = document.querySelector("#txt");
const file_name = document.querySelector("#fileName");
const txt_button = document.querySelector("#save_txt_button");
const img_button = document.querySelector("#save_img_button");
const img_name = document.querySelector("#imgName");
const NUKE = document.querySelector("#nuke");

let brush_x = 0;
let brush_y = 0;
let is_thick_stroke = false;
let is_eraser = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
thick_stroke.addEventListener("click", toggleThiccDraw);
eraser.addEventListener("click", toggleEraser);
txt_button.addEventListener("click", saveFile);
img_button.addEventListener("click", saveCanvas);
NUKE.addEventListener("click", clearCanvas);

function start(e) {
    document.addEventListener("mousemove", draw);
    pos(e);
}

function pos(e) {
    const rect = canvas.getBoundingClientRect();
    brush_x = e.clientX - rect.left;
    brush_y = e.clientY - rect.top;
}

function stop() {
    document.removeEventListener("mousemove", draw);
}

function draw(e) {
    ctx.beginPath();
    ctx.lineWidth = is_thick_stroke ? 12 : 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = is_eraser ? "white" : "black";
    ctx.moveTo(brush_x, brush_y);
    pos(e);
    ctx.lineTo(brush_x, brush_y);
    ctx.stroke();
}

function toggleThiccDraw() {
    is_thick_stroke = !is_thick_stroke;

    thick_stroke.textContent = is_thick_stroke ? "THIN" : "THICC";
}

function toggleEraser() {
    is_eraser = !is_eraser;
}

function clearCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// Function to create a download link element
function createDownloadLink(data, fileName) {
    const link = document.createElement('a');
    link.href = data;
    link.download = fileName;
    return link;
}

function saveFile() {
    const textToSave = text_area.value;
    const blob = new Blob([textToSave], {
        type: "text/plain"
    });
    const fileName = file_name.value + ".txt";

    const downloadLink = createDownloadLink(URL.createObjectURL(blob), fileName);
    downloadLink.click();


    text_area.value = '';
    file_name.value = '';
}

function saveCanvas() {
    const imgData = canvas.toDataURL("image/png");
    const fileName = img_name.value + ".png";

    const downloadLink = createDownloadLink(imgData, fileName);
    downloadLink.click();

    clearCanvas();
}