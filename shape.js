/**
 * キャンバス上に描画される図形を表す
 */
export default class Shape {

    constructor(context) {
        this._context = context
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
}