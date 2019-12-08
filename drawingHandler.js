import PointRectangle from './pointRectangle.js'
import BoxText from './boxText.js'
import DrawStack from './drawStack.js'

import MenuHandler from './menuHandler.js'
import {DrawMode} from './mode.js'

export default class DrawingHandler {

    constructor() {
        this._isMousedown = false

        this._canvas = document.getElementById('myCanvas')
        this._context = this._canvas.getContext('2d')
        this._drawStack = new DrawStack(this._context)

        this._menuHandler = new MenuHandler()

        this.init()
    }

    init() {

        this._canvas.addEventListener('click', (event) => {
            // クリックされた段階でモードに応じてオブジェクトを生成
            if (this._menuHandler.activeMode === DrawMode.TEXT) {

                const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)
                this._drawStack.append(boxText)
                this.inspectTextHandle(boxText)

            }

            if (this._menuHandler.activeMode === DrawMode.RECTANGLE) {

                const pointRectangle = new PointRectangle(event.clientX, event.clientY, this._context)
                this._drawStack.append(pointRectangle)
                this.inspectRectHandle(pointRectangle)

            }
        })


    }
    inspectTextHandle() {

        document.addEventListener('keydown', () => {
            if (this._menuHandler.activeMode !== DrawMode.TEXT) {
                return 
            }
            const boxText = this._drawStack.getCurrent()

            this.clearCanvas()

            this._drawStack.drawStack()
            boxText.update()
            boxText.draw()

        })
    }

    inspectRectHandle() {
        this._canvas.addEventListener('mousedown', (event) => {
            this._isMousedown = true

        })

        this._canvas.addEventListener('mouseup', (event) => {
            this._isMousedown = false
        })

        this._canvas.addEventListener('mousemove', (event) => {

            if (this._menuHandler._activeMode !== DrawMode.RECTANGLE) {
                return
            }

            if (!this._isMousedown) {
                return
            }

            const pointRectangle = this._drawStack.getCurrent()

            let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
            let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

            pointRectangle.updatePos(posX, posY)

            pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY))

            this.clearCanvas()

            this._drawStack.drawStack()
            pointRectangle.draw()
        })

    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

    drawImage(image) {
        this._context.drawImage(image, 100, 100)
    }
}