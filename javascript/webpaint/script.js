
// press mouse
let isPenDown = false;
let undoArr = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    // begin path

    ctx.beginPath();
    // move to mouse pointers location
    let x = e.clientX;
    let y = e.clientY;
    let top = getLocation();
    y = Number(y) - top
    ctx.moveTo(x, y);
    console.log("Mouse down")
    isPenDown = true;
    // mouse down
    let mdp = {
        x,
        y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    undoArr.push(mdp);
    //  point => realtime draw
    socket.emit("md", mdp);
})
// on move
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        console.log("Mouse move")
        // lineTo
        let x = e.clientX;
        let y = e.clientY;
        let top = getLocation();
        y = Number(y) - top;
        ctx.lineTo(x, y);
        // stroke
        ctx.stroke();
        // mouse move
        let mmp = {
            x,
            y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        undoArr.push(mmp);
        socket.emit("mm", mmp);
    }
})
window.addEventListener("mouseup", function () {
    // close Path
    console.log("Mouse up")
    // ctx.closePath();
    isPenDown = false;
})
function getLocation() {
    let { top } = board.getBoundingClientRect();
    return top;
}
function undoLast() {
    //  pop the last point
    if (undoArr.length >= 2) {
        //  lines 
        console.log(undoArr);
        let tempArr = []
        for (let i = undoArr.length - 1; i >= 0; i--) {
            console.log(undoArr[i]);
            let id = undoArr[i].id;
            if (id == "md") {
                tempArr.unshift(undoArr.pop());
                break;
            } else {
                // undoArr.pop();
                tempArr.unshift(undoArr.pop());
            }
        }
        redoArr.push(tempArr);
        //  clear canvas=> 
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}
function redoLast() {
    if (redoArr.length > 0) {
        //  lines 
        let undoPath = redoArr.pop();
        for (let i = 0; i < undoPath.length; i++) {
            undoArr.push(undoPath[i]);
        }
        //  clear canvas=> 
        ctx.clearRect(0, 0, board.width, board.height);
        // redraw
        redraw();
    }
}
function redraw() {
    for (let i = 0; i < undoArr.length; i++) {
        let { x, y, id, color, width } = undoArr[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y)
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

let imgInput = document.querySelector("#acceptImg");
function uploadFile() {
    // dialog box
    imgInput.click();
    imgInput.addEventListener("change", function () {
        let imgObj = imgInput.files[0];
        // console.log(imgObj);
        // img => link 
        let imgLink = URL.createObjectURL(imgObj);
        let textBox = createBox();
        let img = document.createElement("img");
        img.setAttribute("class", "upload-img")
        img.src = imgLink;
        textBox.appendChild(img);
    })
}
function downloadBoard() {
    //  create an anchor
    // e.preventDefault();
    let a = document.createElement("a");
    //  set filename to it's download attribute
    a.download = "file.png";
    //  convert board to url 
    let url = board.toDataURL("image/png;base64");
    //  set as href of anchor
    a.href = url;
    // click the anchor
    a.click();
    //  reload behaviour does not get triggerd
    a.remove();

}

socket.on("rColorChange", function (color) {
    ctx.strokeStyle = color;
})
socket.on("onmd", function (point) {
    let { x, y, color, width } = point;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
})
socket.on("onmm", function (point) {
    let { x, y, color, width } = point;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(x, y);
    ctx.stroke();
})

function createSticky() {
    // create 
    let textBox = createBox();
    let textarea = document.createElement("textarea");
    textBox.appendChild(textarea);
}


ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.lineJoin = 'round';
let activeTool = 'pencil';
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
function handleTool(tool) {

    if (tool == "pencil") {
        if (activeTool == "pencil") {
            pencilOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "black";
            activeTool = "pencil";
            ctx.globalCompositionOperation="source-over";
            eraserOptions.classList.remove("show");
        }
    } else if (tool == "eraser") {
        if (activeTool == "eraser") {
            eraserOptions.classList.add("show");
        } else {
            ctx.strokeStyle = "white";
            activeTool = "eraser";
            ctx.globalCompositionOperation="destination-out";
            pencilOptions.classList.remove("show");
        }
    } else if (tool == "sticky") {
        createSticky();
    } else if (tool == "upload") {
        uploadFile();
    } else if (tool == "undo") {
        undoLast();
    } else if (tool == "redo") {
        redoLast();
    } else if (tool == "download") {
        downloadBoard();
    }
}
function changeColor(color) {
    ctx.strokeStyle = color;
    // send
    socket.emit("colorChange", color);
}
let sliders = document.querySelectorAll("input[type='range']");
for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("change", function () {
        let width = sliders[i].value;
        ctx.lineWidth = width;
    })
}

// let newArr = [...oldArr]; => values are copied
// let newArr = oldArr;=> address copy

function createBox() {
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let textbox = document.createElement("div");
    //    add classes
    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "nav-bar");
    close.setAttribute("class", "close");
    minimize.setAttribute("class", "minimize");
    textbox.setAttribute("class", "textbox");
    // create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(textbox);
    navBar.appendChild(minimize);
    navBar.appendChild(close);
    // add subtree to page
    document.body.appendChild(stickyPad);
    // close=> remove 
    close.addEventListener("click", function () {
        stickyPad.remove();
    })
    let isOpen = true
    // minimize=> 
    minimize.addEventListener("click", function () {
        if (isOpen) {
            textbox.style.display = "none";
        } else {
            textbox.style.display = "block";
        }
        isOpen = !isOpen;
    })
    //  move => draw
    let initialX = null;
    let initialY = null;
    let isStickyDown = false;
    navBar.addEventListener("mousedown", function (e) {
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true
    })
    navBar.addEventListener("mousemove", function (e) {
        if (isStickyDown == true) {
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dX = finalX - initialX;
            let dY = finalY - initialY;
            //  
            let { top, left } = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dY + "px";
            stickyPad.style.left = left + dX + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })
    //  navBar => mouse pointer up 
    navBar.addEventListener("mouseup", function (e) {
        isStickyDown = false
    })
    //  
    navBar.addEventListener("mouseleave", function (e) {
        isStickyDown = false
    })
    return textbox;
}