import MenuHandler from './menuHandler.js'
import FocusHandler from './focusHandler.js'
import DrawStack from './drawStack.js'

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

            drawStack: new DrawStack(),
            menu: new MenuHandler(),
            focus: new FocusHandler(),
        }

        this._rectDrawing = new RectangleDrawing(this._context)
        this._textDrawing = new TextDrawing(this._context)

        this._isMousedown = false

        this.init()
    }

    init() {

        this._textDrawing.init()

        this._rectDrawing.init()
    }

}