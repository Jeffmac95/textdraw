const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const TEXT_AREA = document.querySelector("#txt");
const FILE_NAME = document.querySelector("#fileName");
const TXT_BUTTON = document.querySelector("#save_txt_button");

let brush_x = 0;
let brush_y = 0;

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
TXT_BUTTON.addEventListener("click", saveFile);

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
    document.removeEventListener("mousemove", draw)
}

function draw(e) {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.moveTo(brush_x, brush_y);
    pos(e);
    ctx.lineTo(brush_x, brush_y);
    ctx.stroke();
    
}

function saveFile() {
    const textToSave = TEXT_AREA.value;
    const blob = new Blob([textToSave], {
        type: "text/plain"
    });
    const fileName = FILE_NAME.value + '.txt';

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();

    URL.revokeObjectURL(downloadLink.href);
}