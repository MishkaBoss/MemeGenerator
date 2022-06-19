'use strict'

var gKeywordSearchCountMap = {
    'politics': 0,
    'man': 0,
    'kid': 0,
}
var gImgs = [
    {
        id: 1,
        url: '/imgaes/memes/1.jpg',
        keywords: [
            'politics'
        ]
    },
    {
        id: 18,
        url: '/imgaes/memes/18.jpg',
        keywords: [
            'movies',
            'toys'
        ]
    },
    {
        id: 17,
        url: '/imgaes/memes/17.jpg',
        keywords: [
            'politics'
        ]
    },
    {
        id: 15,
        url: '/imgaes/memes/15.jpg',
        keywords: [
            'man',
            'men',
            'one does not simply'
        ]
    },
    {
        id: 5,
        url: '/imgaes/memes/5.jpg',
        keywords: [
            'kid',
            'success kid'
        ]
    },
    {
        id: 6,
        url: '/imgaes/memes/6.jpg',
        keywords: [
            'men',
            'man',
            'alien'
        ]
    }, {
        id: 13,
        url: '/imgaes/memes/13.jpg',
        keywords: [
            'men',
            'man'
        ]
    }, {
        id: 8,
        url: '/imgaes/memes/8.jpg',
        keywords: [
            'tell me more'
        ]
    },
    {
        id: 9,
        url: '/imgaes/memes/9.jpg',
        keywords: [
            'kid'
        ]
    }
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'insert text here',
            size: 30,
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
}

// function getMeme(url) {
//     url.toString()
//     url.slice(21)

//     console.log(url);
//     return url

// }
function setColor(value) {
    gMeme.lines[gMeme.selectedLineIdx].color = value
    renderCanvas()
}
// function resizeCanvas() {
//     var elContainer = document.querySelector('.canvas-editor');
//     gCanvas.width = elContainer.offsetWidth - 700;

// }
function switchToEditor(id) {
    gMeme.selectedImgId = id
    var elEditor = document.querySelector('.canvas-editor')
    var elGallery = document.querySelector('.main-content')
    elEditor.style.display = 'block'
    elGallery.style.display = 'none'
    renderCanvas()
}
function switchToGallery() {
    var elEditor = document.querySelector('.canvas-editor')
    var elGallery = document.querySelector('.main-content')
    elEditor.style.display = 'none'
    elGallery.style.display = 'block'
}

function drawText(x = 50, y = 60) {
    if (gMeme.selectedLineIdx === 1) {
        x = 50
        y = 450

    }
    if (gMeme.selectedLineIdx === 2) {
        x = 50
        y = 250
    }
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gMeme.lines[gMeme.selectedLineIdx].color
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px impact`
    gCtx.fillText(gMeme.lines[gMeme.selectedLineIdx].txt, x, y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(gMeme.lines[gMeme.selectedLineIdx].txt, x, y);//Draws (strokes) a given text at the given (x, y) position.
    // debugger
    // console.log(gMeme.lines[gMeme.selectedLineIdx]);
    // console.log(gMeme.lines);
}

function getText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    console.log(gMeme.lines[gMeme.selectedLineIdx].txt);
    renderCanvas()

}

function renderCanvas() {
    drawImg()
    for (let i = 0; i <= gMeme.selectedLineIdx; i++) {
        console.log(gMeme.lines);
        drawText()

    }



}

function drawImg() {
    var base_image = new Image();
    base_image.src = `images/memes/${gMeme.selectedImgId}.jpg`
    gCtx.drawImage(base_image, 0, 0);
}
function deleteLine() {
    var elInput = document.querySelector('.text-input')
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    elInput.value = ''
    renderCanvas()
}
function addLine() {
    gMeme.selectedLineIdx++
    var newLine = {
        txt: 'Your text here',
        size: 30,
        align: 'left',
        color: 'white',
        font: 'impact',
    }
    gMeme.lines.push(newLine)
    var elInput = document.querySelector('.text-input')
    elInput.value = ''
    // console.log(gMeme);
    renderCanvas()

}
function fontBigger() {
    gMeme.lines[gMeme.selectedLineIdx].size++
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);
    renderCanvas()
}
function fontSmaller() {
    gMeme.lines[gMeme.selectedLineIdx].size--
    console.log(gMeme.lines[gMeme.selectedLineIdx].size);
    renderCanvas()
}
function alignRight() {
    drawText(300, 60)
    renderCanvas()
}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    console.log(elLink);
}
function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");// Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //Create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })

}
// asd
