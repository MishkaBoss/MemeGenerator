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