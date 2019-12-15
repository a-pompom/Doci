import MenuHandler from './menuHandler.js'

import FocusHandler from './focusHandler.js'
import DrawStack from './drawStack.js'

import MetaDrawing from './metaDrawing.js'
import TextDrawing from './textDrawing.js'
import RectangleDrawing from './rectangleDrawing.js'

/**
 * 描画機能を扱うハンドラ
 */
export default class DrawingHandler{

    constructor() {
        this._context = {
            canvas: document.getElementById('myCanvas'),
            canvasContext: document.getElementById('myCanvas').getContext('2d'),
            isMousedown: false,

            drawStack: new DrawStack(),
            menu: new MenuHandler(),
            focus: new FocusHandler(),
        }

        this._metaDrawing = new MetaDrawing(this._context)
        this._rectDrawing = new RectangleDrawing(this._context)
        this._textDrawing = new TextDrawing(this._context)

        this.init()
    }

    init() {

        const occurEvents = ['mousedown', 'mousemove', 'mouseup', 'keydown', 'click']
        const drawingList = [this._rectDrawing, this._textDrawing, this._metaDrawing]

        occurEvents.forEach((event) => {
            const targetEvents = []

            drawingList.forEach((drawing, index) => {
                if (typeof drawing[`${event}Event`] === 'function') {

                    targetEvents.push(index)
                }
            })

            this._context.canvas.addEventListener(event, (eventArg) => {

                targetEvents.forEach((targetIndex) => {
                    drawingList[targetIndex][`${event}Event`].call(drawingList[targetIndex],eventArg)
                })

            })

        })

    }

}