/**
 * キャンバス上に描画される図形を表す
 * @property {Object} context 描画用コンテキスト
 * 
 * @property {number} x 描画開始x座標
 * @property {number} y 描画開始y座標
 * @property {number} width 幅
 * @property {number} height 高さ
 * 
 * @property {number} originX 描画開始時点でのx座標 キャンバスで描画方向を反転させた場合にも滑らかに描画するために利用
 * @property {number} originY 描画開始時点でのy座標
 * @property {number} originWidth リサイズ前の幅 リサイズ時の動きを滑らかにするために利用
 * @property {number} originHeight リサイズ前の高さ
 * 
 * @property {ShapeType} shapeType 図形の種類
 * @property {boolean} hasArea 領域を持つか 領域を持たないものは、内側を図形とみなさないよう区別するために利用
 */
export default class Shape {

    constructor(context, startX, startY) {
        this._context = context

        this._x = startX
        this._y = startY

        this._width = 0 
        this._height = 0

        this._originX = startX
        this._originY = startY
        this._originWidth = 0
        this._originHeight = 0

        this._shapeType = null
        this._hasArea = false
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
     * リサイズ時に参照する元の図形の描画スケールを設定
     */
    setOriginPos() {
        this._originWidth = this._width
        this._originHeight = this._height
    }

    /**
     * 属性値を設定 実装は各サブクラスに委譲
     */
    defineAttribute() {
    }

    /**
     * 領域を有するかを取得
     */
    hasArea() {
        return this._hasArea
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

    get shapeType() {
        return this._shapeType
    }
}