import PointRectangle from './pointRectangle.js'
import BoxText from './boxText.js'

import BaseHandler from './baseHandler.js'
import MenuHandler from './menuHandler.js'
import FocusHandler from './focusHandler.js'
import {DrawMode, FocusAngle} from './mode.js'

export default class DrawingHandler extends BaseHandler{

    constructor() {
        super()

        this._isMousedown = false

        this._menuHandler = new MenuHandler()
        this._focusHandler = new FocusHandler()

        this.init()
    }

    init() {
        this._canvas.addEventListener('click', (event) => {
            if (this._menuHandler.activeMode === DrawMode.TEXT) {

                const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)
                this._drawStack.append(boxText)

            }

        })

        this._canvas.addEventListener('mousedown', (event) => {

            if (this._menuHandler.activeMode === DrawMode.RECTANGLE) {
                this._isMousedown = true

                if (this._focusHandler.isFocused()) {
                    this._drawStack.modifyCurrent(this.focusHandler.focusedIndex)
                    this._drawStack.getCurrent().setOriginHeight(this._drawStack.getCurrent().height)
                    return
                }

                const pointRectangle = new PointRectangle(event.clientX, event.clientY, this._context)

                this._drawStack.append(pointRectangle)
            }
        })

        this.initTextHandle()
        this.initRectHandle()


    }
    initTextHandle() {

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

    initRectHandle() {

        this._canvas.addEventListener('mouseup', (event) => {
            this._drawStack.getCurrent().originY = this._drawStack.getCurrent().y
            this._focusedIndex = -1
            this._isMousedown = false
        })

        this._canvas.addEventListener('mousemove', (event) => {
            if (!this._isMousedown) {
                this._focusHandler.inspectShapeFocus(event.clientX, event.clientY)
                return
            }

            if (this._menuHandler._activeMode !== DrawMode.RECTANGLE) {
                return
            }

            const pointRectangle = this._drawStack.getCurrent()

            let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
            let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

            pointRectangle.updatePos(posX, posY)

            pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY), this._focusHandler.focusedAngle)

            this.clearCanvas()

            this._drawStack.drawStack()
            pointRectangle.draw()
        })

    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

}