/**
 * フォーカス等のキャンバスに表れない描画要素を管理
 */
export default class MetaDrawing {

    constructor(context) {
        this._context = context
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

    mousemoveEvent(event) {
        if (this._context.isMousedown) {
            return
        }

        const shapeList = this._context.drawStack.stack

        const canvasRect = this._context.canvas.getBoundingClientRect();
        
        this._context.focus.inspectShapeFocus(shapeList, event.clientX - canvasRect.left, event.clientY - canvasRect.top)
    }

}