import PointRectangle from './pointRectangle.js'
import DrawingHandler from './drawingHandler.js'


const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const pastedImage = new Image()

const drawingHandler = new DrawingHandler(ctx)

document.addEventListener('paste', (event) => {

    const clipboardItem = event.clipboardData.items
    
    if (!clipboardItem) {
        return
    }

    let is_image = false

    for (let i = 0; i < clipboardItem.length; i++) {
        const blob = clipboardItem[i].getAsFile()
        const URLObj = window.URL 
        const source = URLObj.createObjectURL(blob)

        pastedImage.onload = () => {
            ctx.drawImage(pastedImage, 100, 100)
        }

        pastedImage.src = source

        is_image = true
    }

    if (is_image) {
        event.preventDefault()
    }



})

let isMouseDown = false
let testX = 0
let testY = 0


canvas.addEventListener('mousedown', (event) => {
    console.log('mouseDown')
    isMouseDown = true
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(pastedImage, 100, 100)
    const pointRectangle = new PointRectangle(event.clientX, event.clientY)
    testX = event.clientX
    testY = event.clientY

    drawingHandler.drawRectangle(pointRectangle)
})

canvas.addEventListener('mouseup', (event) => {
    console.log('mouse up...')
    isMouseDown = false
})

canvas.addEventListener('mousemove', (event) => {
    if (!isMouseDown) {
        return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(pastedImage, 100, 100)
    const pointRectangle = new PointRectangle(event.clientX, event.clientY)
    console.log('startX')
    console.log(testX)
    console.log('startY')
    console.log(testY)

    pointRectangle.modifyScale(Math.abs(testX - event.clientX), Math.abs(testY - event.clientY))

    drawingHandler.drawRectangle(pointRectangle)

})