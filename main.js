const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const THICC_STROKE = document.querySelector("#thicc_stroke");
const ERASER = document.querySelector("#eraser");
const TEXT_AREA = document.querySelector("#txt");
const FILE_NAME = document.querySelector("#fileName");
const TXT_BUTTON = document.querySelector("#save_txt_button");
const IMG_BUTTON = document.querySelector("#save_img_button");
const IMG_NAME = document.querySelector("#imgName");
const NUKE = document.querySelector("#nuke");

let brush_x = 0;
let brush_y = 0;
let isThiccStroke = false;
let isEraser = false;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
THICC_STROKE.addEventListener("click", toggleThiccDraw);
ERASER.addEventListener("click", toggleEraser);
TXT_BUTTON.addEventListener("click", saveFile);
IMG_BUTTON.addEventListener("click", saveCanvas);
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
    ctx.lineWidth = isThiccStroke ? 12 : 5;
    ctx.lineCap = "round";
    ctx.strokeStyle =  isEraser ? "white" : "black";
    ctx.moveTo(brush_x, brush_y);
    pos(e);
    ctx.lineTo(brush_x, brush_y);
    ctx.stroke();
}

function toggleThiccDraw() {
    isThiccStroke = !isThiccStroke;

    THICC_STROKE.textContent = isThiccStroke ? "THIN" : "THICC";
}

function toggleEraser() {
    isEraser = !isEraser;
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
    const textToSave = TEXT_AREA.value;
    const blob = new Blob([textToSave], {
        type: "text/plain"
    });
    const fileName = FILE_NAME.value + ".txt";

    const downloadLink = createDownloadLink(URL.createObjectURL(blob), fileName);
    downloadLink.click();


    TEXT_AREA.value = '';
    FILE_NAME.value = '';
}

function saveCanvas() {
    const imgData = canvas.toDataURL("image/png");
    const fileName = IMG_NAME.value + ".png";

    const downloadLink = createDownloadLink(imgData, fileName);
    downloadLink.click();

    clearCanvas();
}

const day = new Date();
console.log(`[INFO]: ${day}`);