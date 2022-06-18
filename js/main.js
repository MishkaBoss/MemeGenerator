'use strict'

var gImgs = [
    {
        id: 1,
        url: '/imgaes/memes/1.jpg'
    },
    {
        id: 18,
        url: '/imgaes/memes/18.jpg'
    },
    {
        id: 17,
        url: '/imgaes/memes/17.jpg'
    },
    {
        id: 15,
        url: '/imgaes/memes/15.jpg'
    },
    {
        id: 5,
        url: '/imgaes/memes/5.jpg'
    },
    {
        id: 6,
        url: '/imgaes/memes/6.jpg'
    }, {
        id: 13,
        url: '/imgaes/memes/13.jpg'
    }, {
        id: 8,
        url: '/imgaes/memes/8.jpg'
    },
    {
        id: 9,
        url: '/imgaes/memes/9.jpg'
    }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'insert text here',
            size: 20,
            align: 'left',
            color: 'white'
        }
    ]
}
var gCurrColor
var gCanvas
var gCtx


function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    // window.addEventListener('resize', resizeCanvas)

}
function renderMeme(imgId) {
    var elGallery = document.querySelector('.canvas-editor')
    if (elGallery.style.display = 'block') {
        switchToEditor()
    }
    var base_image = new Image();
    base_image.src = `/images/memes/${imgId}.jpg`

    gCtx.drawImage(base_image, 0, 0);
    drawText(getText(), 50, 60)

}
function getMeme(url) {
    url.toString()
    url.slice(21)

    console.log(url);
    return url

}
function setColor(value) {
    gCurrColor = value
    console.log(value);
}
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-editor');
    gCanvas.width = elContainer.offsetWidth - 700;

}
function switchToEditor() {
    var elEditor = document.querySelector('.canvas-editor')
    var elGallery = document.querySelector('.main-content')
    elEditor.style.display = 'block'
    elGallery.style.display = 'none'
}
function switchToGallery() {
    var elEditor = document.querySelector('.canvas-editor')
    var elGallery = document.querySelector('.main-content')
    elEditor.style.display = 'none'
    elGallery.style.display = 'block'
}

function drawText(text, x = 50, y = 60) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px impact';
    gCtx.fillText(text, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y);//Draws (strokes) a given text at the given (x, y) position.

    // renderMeme()
}

function getText(txt) {
    var txt = document.querySelector('.text-input').value
    return txt

}

var inputBox = document.getElementById('text-input')
var currText = document.getElementById('text-input').value
inputBox.onkeyup = function () {
    console.log('hi');

    drawText(inputBox.value)
    document.getElementById('my-canvas').innerHTML = inputBox.value;
}

