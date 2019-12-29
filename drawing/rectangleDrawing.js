import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import PointRectangle from '../shape/pointRectangle.js'
import WordBalloon from '../shape/WordBalloon.js'

import ResizeService from '../service/resizeService.js'

/**
 * 四角の描画を管理
 * @property {Object} context 描画コンテキスト
 * @property {ResizeService} resizeService リサイズ機能を扱うサービス
 */
export default class RetangleDrawing extends BaseDrawing{
    constructor(context) {
        super(context)

        this._resizeService = new ResizeService(context)
    }

    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

        if (!this.isRectangleActive()) {
            return
        }

        // フォーカス中の場合、対象の図形がリサイズ可能でないなら描画しない
        if (this._context.focus.isFocused()) {

            const focusedShape = this.getDrawingShape()
            if (!focusedShape.resizable) {
                return
            }
        }
        
        this[`${eventType}Event`].call(this,event)
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousedownEvent(event) {

        this._context.isMousedown = true

        // 新規描画
        if (!this._context.focus.isFocused()) {

            const rectangle = this.getRectangle(this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

            this._context.drawStack.append(rectangle)

            return
        }

        // リサイズ
        this._resizeService.initResizeEvent(this.getDrawingShape())
    }

    /**
     * マウスを動かしたときの処理 マウス押下中は描画中の図形のリサイズイベントを発火
     * @param {Event} event イベントオブジェクト
     */
    mousemoveEvent(event) {

        // マウス押下中でない場合、描画・リサイズは不要
        if (!this._context.isMousedown) {
            return
        }

        const shape = this.getDrawingShape()

        // リサイズした後、画面上に図形を描画
        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)
        this._resizeService.resize(shape, x, y)

        shape.fullDraw()
    }
    
    /**
     * マウスを離したときの処理 フォーカス終了イベントを発火 
     */
    mouseupEvent() {

        this._context.focus.outFocus()

        this._context.isMousedown = false
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

    /**
     * 描画モードで四角が選択されているか判定
     */
    isRectangleActive() {
        return this._context.menu.activeType === DrawConst.menu.DrawType.RECTANGLE
    }

    /**
     * 描画対象となる四角を取得
     * 
     * @param {number} x 描画開始x座標
     * @param {number} y 描画開始y座標
     */
    getRectangle(x, y) {
        if (this._context.menu.activeMode === DrawConst.menu.DrawMode.RECTANGLE) {
            return new PointRectangle(this._context, x, y)
        }

        if (this._context.menu.activeMode === DrawConst.menu.DrawMode.WORD_BALLOON) {
            return new WordBalloon(this._context, x, y)
        }

        return
    }
}