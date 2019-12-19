/**
 * フォーカス等のキャンバスに表れない描画要素を管理
 */
export default class MetaDrawing {

    constructor(context) {
        this._context = context
    }

    mousemoveEvent(event) {
        if (this._context.isMousedown) {
            return
        }

        const shapeList = this._context.drawStack.stack

        const canvasRect = this._context.canvas.getBoundingClientRect();
        
        this._context.focus.inspectShapeFocus(shapeList, event.clientX - canvasRect.left, event.clientY - canvasRect.top)
        this._context.textFocus.inspectShapeFocus(shapeList, event.clientX - canvasRect.left, event.clientY - canvasRect.top)
    }

}