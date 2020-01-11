import DrawingUtil from '../drawingUtil.js'
import {DrawConst} from '../const/drawingConst.js'

/**
 * 図形の基本描画機能を格納したクラス
 */
export default class ShapeFuncion {

    constructor(context) {
        this._context = context
    }

    /**
     * キャンバス全体を再描画 各描画管理クラスから呼ばれるインタフェース部分としての役割を持つ
     */
    fullDraw() {
        this.drawBase()
    }

    /**
     * キャンバス全体の再描画の実装部分
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

        this.drawBackground()
    }

    /**
     * 背景を描画 
     * デスクトップのExcelアプリでは、透明なキャンバスをコピーすると、透明色である黒で塗りつぶされてしまっていたので、
     * セルを擬似的に描画しておくことで、Excelに配置しても違和感がないようにした
     */
    drawBackground() {

        this._context.canvasContext.fillStyle = DrawConst.excel.cellColors.background
        this._context.canvasContext.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height)

        let x = 0
        let y = 0

        this._context.canvasContext.strokeStyle = DrawConst.excel.cellColors.border

        // Excelのセルを画面全体に描画
        while(y < this._context.canvas.height) {

            this._context.canvasContext.beginPath()
            this._context.canvasContext.moveTo(0,y)
            this._context.canvasContext.lineTo(this._context.canvas.width, y)

            this._context.canvasContext.closePath()
            this._context.canvasContext.stroke()

            // 解像度の影響でキャンバスの大きさは変動しているので、PixelRatioを係数として乗算
            y+= DrawConst.excel.cellScale.y * DrawingUtil.getPixelRatio()
        }

        while(x < this._context.canvas.width) {

            this._context.canvasContext.beginPath()
            this._context.canvasContext.moveTo(x,0)
            this._context.canvasContext.lineTo(x, this._context.canvas.height)

            this._context.canvasContext.closePath()
            this._context.canvasContext.stroke()

            // 解像度の影響でキャンバスの大きさは変動しているので、PixelRatioを係数として乗算
            x+= DrawConst.excel.cellScale.x * DrawingUtil.getPixelRatio()
        }

        this._context.canvasContext.fillStyle = DrawConst.excel.cellColors.text
    }
}