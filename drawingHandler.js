import PointRectangle from './pointRectangle.js'
import TextBox from './textBox.js'
import DrawStack from './drawStack.js'

export default class DrawingHandler {

    constructor() {
        this._isMousedown = false
        this._canvas = document.getElementById('myCanvas')
        this._context = this._canvas.getContext('2d')
        this._drawStack = new DrawStack()

        this.init()
    }

    init() {
        this._canvas.addEventListener('mousedown', (event) => {
            this._isMousedown = true

            const pointRectangle = new PointRectangle(event.clientX, event.clientY)
            
            this._drawStack.append(pointRectangle)

            this.drawRectangle(pointRectangle)
        })

        this._canvas.addEventListener('mouseup', (event) => {
            this._isMousedown = false
        })

        this._canvas.addEventListener('mousemove', (event) => {
            if (!this._isMousedown) {
                return
            }

            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
            const pointRectangle = this._drawStack.getCurrent()

            let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
            let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

            pointRectangle.updatePos(posX, posY)


            pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY))
            this._drawStack.drawStack.forEach((rect) => {
                this.drawRectangle(rect)
            })

        })
        const textbox = document.getElementById('inputText')
        textbox.focus()

        document.addEventListener('keydown', (event) => {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
            
            console.log('key pressed!!')
            console.log(textbox.value)
            this._context.fillText(textbox.value, 100, 100)
        })
    }

    drawImage(image) {
        this._context.drawImage(image, 100, 100)
    }

    /**
     * 赤枠の四角を描画
     * 
     * @param {PointRectangle} rect 描画対象の赤枠四角
     */
    drawRectangle(rect) {

        this._context.strokeStyle = rect.color
        this._context.strokeRect(rect.x, rect.y -30, rect.width, rect.height)
        

    }
    
}