/**
 * 赤枠の四角を表すクラス
 * 位置・大きさ・色を状態として持ち、伸縮を可能とする
 */
export default class PointRectangle {

    constructor(startX, startY, context) {

        this._context = context

        this._originX = startX
        this._originY = startY

        this._x = startX
        this._y = startY

        this._width = 0
        this._height = 0

        this._color = '#FF0000'
    }

    draw() {
        this._context.strokeStyle = this._color
        this._context.strokeRect(this._x, this._y -30, this._width, this._height)
    }

    /**
     * リサイズによる幅・高さの変動を反映
     * @param {number} scaledX 
     * @param {number} scaledY 
     */
    modifyScale(scaledX, scaledY) {
        this._width = scaledX
        this._height = scaledY 
    }

    /**
     * 四角の描画開始位置を変更
     */
    updatePos(posX, posY) {
        this._x = posX
        this._y = posY
    }

    get originX() {
        return this._originX
    }
    get originY() {
        return this._originY
    }
    get x() {
        return this._x
    }
    get y() {
        return this._y
    }
    get width() {
        return this._width
    }
    get height() {
        return this._height
    }
    get color() {
        return this._color
    }
}