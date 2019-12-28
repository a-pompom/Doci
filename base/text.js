import { DrawConst } from '../const/drawingConst.js'

export default class Text {

    constructor(context, startX, startY) {

        this._context = context

        this._originTextDOM = document.getElementById('inputText')
        this._originText = ''

        this._x = startX
        this._y = startY

        this._width = 0 
        this._height = 0

        this._hasArea = false
        this._shapeType = DrawConst.shape.ShapeType.TEXT
    }

    /**
     * 自身を描画する際の前処理を行う
     */
    drawBase() {
        this.clear()
        this.drawStack()
    }

    /**
     * 既存の描画済みオブジェクトをキャンバスに描画
     */
    drawStack() {
        this._context.drawStack.draw()
    }

    /**
     * リサイズで伸縮した図形をキャンバス上に残さないよう、毎回画面をクリア
     */
    clear() {
        const canvasWidth = this._context.canvas.width
        const canvasHeight = this._context.canvas.height
        this._context.canvasContext.clearRect(0, 0, canvasWidth, canvasHeight)
    }

    /**
     * 属性値を設定 実装は各サブクラスに委譲
     */
    defineAttribute() {
    }

    //  ------------------------------------------------getter setter ----------------------------------------------------


    get x() {
        return this._x
    }
    set x(x) {
        this._x = x
    }
    get y() {
        return this._y
    }
    set y(y) {
        this._y = y
    }
    get width() { return this._width
    }
    set width(width) {
        this._width = width
    }
    get height() {
        return this._height
    }
    set height(height) {
        this._height = height
    }

    get hasArea() {
        return this._hasArea
    }

    get shapeType() {
        return this._shapeType
    }
}