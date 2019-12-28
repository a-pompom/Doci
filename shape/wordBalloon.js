import { DrawConst } from '../const/drawingConst.js'
import Shape from '../base/shape.js'
/**
 * 赤枠の四角を表すクラス
 * 位置・大きさ・色を状態として持ち、伸縮を可能とする
 * 
 * @property {string} color 枠の色
 */
export default class WordBalloon extends Shape{

    constructor(context, startX, startY) {

        super(context, startX, startY)
        this.defineAttribute()

        this._color = '#FF0000'
        this._fillColor = '#FFFFFF'

        this._boxText = null
    }

    /**
     * キャンバス上のオブジェクト全体を描画
     * drawBaseではスタック内の全てのオブジェクトをdrawメソッドで描画しているので、
     * メソッドを分離
     */
    fullDraw() {
        super.drawBase()
        this.draw()
    }

    /**
     * 吹き出しをキャンバス上に描画
     */
    draw() {
        this._context.canvasContext.fillStyle = this._fillColor
        this._context.canvasContext.fillRect(this.x, this.y, this.width, this.height)

        this._context.canvasContext.strokeStyle = this._color
        this._context.canvasContext.strokeRect(this.x, this.y, this.width, this.height)

        this.drawTail()

        this._context.canvasContext.fillStyle = '#000000'

        if (this._boxText !== null) {

            this._boxText.draw()
        }
    }


    /**
     * 吹き出しのいわゆる「しっぽ」部分を描画
     * しっぽ部分は、今回は三角形として扱う。
     */
    drawTail() {

        // 各要素の乗数は、吹き出しのしっぽとして自然に見える感覚値を設定　
        const headX = this.x + (this.width) * 0.1
        const tailX = this.x + (this.width) * 0.3
        const headY = this.y + this.height
        const tailY = this.y + this.height + (this.height * 0.2)

        // 三角形部分
        this._context.canvasContext.beginPath()
        this._context.canvasContext.moveTo(headX, headY)
        this._context.canvasContext.lineTo(headX, tailY)
        this._context.canvasContext.moveTo(headX, tailY)
        this._context.canvasContext.lineTo(tailX, headY)
        this._context.canvasContext.moveTo(tailX, headY)
        this._context.canvasContext.closePath()
        this._context.canvasContext.stroke()

        // 吹き出しのしっぽ部分と四角の共通部分、すなわち、底辺部分の線は消しておく方が吹き出しとして自然なので、消去
        // 三角形の辺と同一の長さで描画すると、微細な隙間が生じてしまうので、少し幅を持たせる
        const DELTA_X = 2
        this._context.canvasContext.beginPath()
        this._context.canvasContext.globalCompositeOperation = 'destination-out'
        this._context.canvasContext.moveTo(headX, headY)
        this._context.canvasContext.lineTo(tailX - DELTA_X, headY)
        this._context.canvasContext.closePath()

        // destination-outでの上書きは、複数回行わないと色が薄まる程度になってしまうので、完全に消去される4回程度実行
        this._context.canvasContext.stroke()
        this._context.canvasContext.stroke()
        this._context.canvasContext.stroke()
        this._context.canvasContext.stroke()

        this._context.canvasContext.globalCompositeOperation = 'source-over'
    }

    /**
     * 属性を設定 文字列つきの図形で、領域を有する
     */
    defineAttribute() {
        this._shapeType = DrawConst.shape.ShapeType.BOX
        this._resizable = true
        this._hasArea = true
    }

    /**
     * 吹き出し内の文字列を更新
     */
    updateText() {
        this._boxText.update()
    }

    get boxText() {
        return this._boxText
    }

    set boxText(boxText) {
        this._boxText = boxText
    }

}