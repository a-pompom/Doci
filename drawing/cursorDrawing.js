
import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

/**
 * カーソルの状態を描画
 * 
 */
export default class CursorDrawing extends BaseDrawing{

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

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
     mousemoveEvent(event) {

        this.resetCursor()

        this.inspectText()
        
        this.inspectMove()
        this.inspectDelete()

        this.inspectResize()
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

    resetCursor() {
        this._context.canvas.style.cursor = "default"
    }

    inspectResize() {

        if (this._context.focus.focusMode !== DrawConst.focus.FocusMode.BORDER) {
            return
        }

        if (!this._context.menu.activeResizable) {
            return
        }

        const resizeTargetShape = this.getDrawingShape()
        if (!resizeTargetShape.resizable) {
            return
        }

        this.inspectDualDirectionResize()

        this.inspectSingleDirectionResize()
    }

    inspectSingleDirectionResize() {
        
        if (this._context.focus.focusedAngle.length !== 1) {
            return
        }

        const isRowResize = this.isDirectionFocused(DrawConst.focus.FocusAngle.TOP) || 
                            this.isDirectionFocused(DrawConst.focus.FocusAngle.BOTTOM)
                            
        const isColResize = this.isDirectionFocused(DrawConst.focus.FocusAngle.LEFT) || 
                            this.isDirectionFocused(DrawConst.focus.FocusAngle.RIGHT)

        if (isRowResize) {
            
            this._context.canvas.style.cursor = "row-resize"

            return
        }

        if (isColResize) {
            
            this._context.canvas.style.cursor = "col-resize"

            return
        }
    }

    inspectDualDirectionResize() {

        if (this._context.focus.focusedAngle.length !== 2) {
            return
        }

        const isIncludeTopResize    = this.isDirectionFocused(DrawConst.focus.FocusAngle.TOP)
        const isIncludeBottomResize = this.isDirectionFocused(DrawConst.focus.FocusAngle.BOTTOM)
        const isIncludeLeftResize   = this.isDirectionFocused(DrawConst.focus.FocusAngle.LEFT)
        const isIncludeRightResize  = this.isDirectionFocused(DrawConst.focus.FocusAngle.RIGHT)

        const isTopLeftResize     = isIncludeTopResize && isIncludeLeftResize
        const isBottomRightResize = isIncludeBottomResize && isIncludeRightResize

        const isTopRightResize    = isIncludeTopResize && isIncludeRightResize
        const isBottomLeftResize  = isIncludeBottomResize && isIncludeLeftResize

        if (isTopLeftResize || isBottomRightResize) {

            this._context.canvas.style.cursor = "nwse-resize"

            return
        }
        if (isTopRightResize || isBottomLeftResize) {

            this._context.canvas.style.cursor = "nesw-resize"

            return
        }

    }


    inspectText() {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.TEXT) {
            return
        }

        if (this._context.focus.focusMode !== DrawConst.focus.FocusMode.INSIDE) {
            return
        }

        const shape = this.getDrawingShape()

        if (shape.shapeType === DrawConst.shape.ShapeType.TEXT) {

            this._context.canvas.style.cursor = "text"

            return
        }

        if (shape.canIncludeText) {
            
            this._context.canvas.style.cursor = "text"

            return
        }
    }

    inspectMove() {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.MOVE) {
            return
        }

        if (this._context.isMousedown && this._context.focus.isFocused()) {

            this._context.canvas.style.cursor = "grabbing"
            return
        }

        this._context.canvas.style.cursor = "grab"

        return
    }

    inspectDelete() {

        if (this._context.menu.activeMode !== DrawConst.menu.DrawMode.DELETE) {
            return
        }

        if (this._context.focus.isFocused()) {

            this._context.canvas.style.cursor = "grabbing"
            return
        }
    }

    isDirectionFocused(focusedAngle) {

        return this._context.focus.focusedAngle.includes(focusedAngle)
    }
}