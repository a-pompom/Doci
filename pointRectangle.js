import Shape from './shape.js'
import {FocusAngle} from './mode.js'
/**
 * 赤枠の四角を表すクラス
 * 位置・大きさ・色を状態として持ち、伸縮を可能とする
 */
export default class PointRectangle extends Shape{

    constructor(context, startX, startY) {

        super(context)

        this._originX = startX
        this._originY = startY

        this._x = startX
        this._y = startY

        this._width = 0
        this._height = 0
        this._originHeight = 0
        

        this._color = '#FF0000'

    }
    fullDraw() {
        super.drawBase()
        this.draw()
    }

    draw() {

        this._context.canvasContext.strokeStyle = this._color
        this._context.canvasContext.strokeRect(this._x, this._y -30, this._width, this._height)
    }

    /**
     * リサイズによる幅・高さの変動を反映
     * @param {number} scaledX 
     * @param {number} scaledY 
     */
    modifyScale(scaledX, scaledY, focusAngle) {
        if (focusAngle === FocusAngle.NONE) {
            this._width = scaledX
            this._height = scaledY 

        }
        if (focusAngle === FocusAngle.BOTTOM) {
            this._height = scaledY + 30
        }

        if (focusAngle === FocusAngle.TOP) {
            if (this._y === this._originY) {
                console.log('same')
                console.log('scaledY' + scaledY)
                if (scaledY > this._originHeight) {
                    this._y = this._originY + this._originHeight
                    this._height = scaledY - this._originHeight

                }
                else {
                    this._y = this._originY + scaledY
                    this._height = this._originHeight - scaledY

                }
            }
            else {
                this._height = scaledY + this._originHeight
            }
        }
    }

    /**
     * 四角の描画開始位置を変更
     */
    updatePos(posX, posY) {
        this._x = posX
        this._y = posY
    }

    changeFocusedAngle(modifier) {
        this._focusAngle = modifier
    }
    setOriginHeight(originHeight) {
        this._originHeight = originHeight
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
    set originX(value) {
        this._originX = value
    }
    set originY(value) {
        this._originY = value
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