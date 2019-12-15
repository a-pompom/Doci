/**
 * キャンバス上に描画される図形を表す
 */
export default class Shape {

    constructor(context, startX, startY) {
        this._context = context
        this._Direction = {
            FORWARD: Symbol('forward'),
            BETWEEN: Symbol('between'),
            REVERSE: Symbol('reverse')
        }

        this._originX = startX
        this._originY = startY

        this._x = startX
        this._y = startY

        this._width = 0 
        this._height = 0
        this._originWidth = 0
        this._originHeight = 0

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

    setOriginPos() {
        this._originWidth = this._width
        this._originHeight = this._height
    }

    get Direction() {
        return this._Direction
    }
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
    get originX() {
        return this._originX
    }
    get originY() {
        return this._originY
    }
    set originX(originX) {
        this._originX = originX
    }
    set originY(originY) {
        this._originY = originY
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
    get originWidth() {
        return this._originWidth
    }
    get originHeight() {
        return this._originHeight
    }
    
    get color() {
        return this._color
    }
}