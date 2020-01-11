import BaseDrawing from '../base/baseDrawing.js'

/**
 * フォーカス等のキャンバスに表れない描画要素を管理
 */
export default class MetaDrawing extends BaseDrawing{

    constructor(context) {
        super(context)

    }

    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

        this[`${eventType}Event`].call(this,event)
    }

    /**
     * フォーカスイベントを監視
     * 
     * @param {Event} event 
     */
    mousemoveEvent(event) {
        if (this._context.isMousedown) {
            return
        }

        const shapeList = this._context.drawStack.stack

        this._context.focus.inspectShapeFocus(shapeList, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))
    }

}