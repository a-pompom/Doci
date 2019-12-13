import PointRectangle from './pointRectangle.js'
import BoxText from './boxText.js'

import BaseHandler from './baseHandler.js'
import MenuHandler from './menuHandler.js'
import FocusHandler from './focusHandler.js'
import {DrawMode, FocusAngle} from './mode.js'
import DrawStack from './drawStack.js'

/**
 * 描画機能を扱うハンドラ
 */
export default class DrawingHandler{

    constructor() {
        this._context = {
            canvas: document.getElementById('myCanvas'),
            canvasContext: canvas.getContext('2d'),

            drawStack: new DrawStack(this._context),
            menu: new MenuHandler(),
            focus: new FocusHandler(),
        }

        this._rectDrawing = new RectangleDrawing(this._context)
        this._textDrawing = new this._textDrawing(this._text)

        this._isMousedown = false

        this.init()
    }

    init() {

        this._textDrawing.init()


        this._canvas.addEventListener('mousedown', (event) => {

            if (this._menuHandler.activeMode === DrawMode.RECTANGLE) {
                this._isMousedown = true

                if (this._focusHandler.isFocused()) {
                    this._drawStack.modifyCurrent(this._focusHandler.focusedIndex)
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

    initRectHandle() {

        this._canvas.addEventListener('mouseup', (event) => {
            this._drawStack.getCurrent().originY = this._drawStack.getCurrent().y
            this._focusHandler.outFocus()

            this._isMousedown = false
        })

        this._canvas.addEventListener('mousemove', (event) => {
            if (!this._isMousedown) {
                const shapeList = this._drawStack.stack

                const canvasRect = this._canvas.getBoundingClientRect();
                
                this._focusHandler.inspectShapeFocus(shapeList, event.clientX - canvasRect.left, event.clientY - canvasRect.top +30)
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