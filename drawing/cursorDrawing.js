
import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

/**
 * カーソルの状態を描画
 * 
 * @property {Object} context 描画コンテキスト
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

        this.inspect()
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

    /**
     * カーソルを変化させるか監視
     */
    inspect() {

        /**
         * Text: テキストにフォーカスしたとき、カーソルをテキストに
         * Move: 移動可能な図形にフォーカスしたとき、カーソルを「掴む」に 移動中は「掴み中」に
         * Delete: 削除可能な図形にフォーカスしたとき、カーソルを「掴む」に
         * Resize: リサイズ可能なモードでリサイズ可能な図形にフォーカスしたとき、リサイズ可能な方向を表すカーソルに
         */
        const inspectEvents = [
            {event: 'Text', mode: DrawConst.menu.DrawMode.TEXT},
            {event: 'Move', mode: DrawConst.menu.DrawMode.MOVE},
            {event: 'Delete', mode: DrawConst.menu.DrawMode.DELETE},
            {event: 'Resize', mode: null},
        ]

        inspectEvents.forEach((element) => {

            if (element.mode !== null && this._context.menu.activeMode !== element.mode) {
                return
            }

            this[`inspect${element.event}`].call(this)
        })
    }

    /**
     * 条件を満たさない場合は通常時のカーソルをデフォルトとして設定
     */
    resetCursor() {
        this._context.canvas.style.cursor = "default"
    }

    /**
     * カーソルをテキストモードに変化させるかを監視
     */
    inspectText() {

        if (!this._context.focus.isFocused()) {
            return
        }

        const shape = this.getDrawingShape()

        if (this._context.focus.focusMode === DrawConst.focus.FocusMode.INSIDE && shape.canIncludeText) {

            this._context.canvas.style.cursor = "text"
            return
        }

        // テキスト・もしくはテキストを内包可能な図形の内部にフォーカスした場合にカーソルを変更
        if (shape.shapeType === DrawConst.shape.ShapeType.TEXT) {

            this._context.canvas.style.cursor = "text"

            return
        }
    }

    /**
     * カーソルを移動モードに変化させるか監視
     */
    inspectMove() {

        if (!this._context.focus.isFocused()) {
            return
        }

        // 掴み中
        if (this._context.isMousedown) {

            this._context.canvas.style.cursor = "grabbing"
            return
        }

        // 掴み始め
        this._context.canvas.style.cursor = "grab"

        return
    }

    /**
     * カーソルを削除モードに変化させるか監視
     */
    inspectDelete() {

        if (this._context.focus.isFocused()) {

            this._context.canvas.style.cursor = "grabbing"
            return
        }
    }

    /**
     * カーソルをリサイズモードに変化させるか監視
     * リサイズには、上下・左右・右上左下・左上右下と種類がある
     */
    inspectResize() {

        // リサイズ可能なモードでリサイズ対象の図形のリサイズ可能箇所にカーソルがない場合は処理しない
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

        // 複数方向のフォーカス
        this.inspectDualDirectionResize()

        // 単一方向のフォーカス
        this.inspectSingleDirectionResize()
    }

    /**
     * 単一方向のフォーカスを監視
     */
    inspectSingleDirectionResize() {
        
        if (this._context.focus.focusedAngle.length !== 1) {
            return
        }

        // 行方向
        const isRowResize = this.isDirectionFocused(DrawConst.focus.FocusAngle.TOP) || 
                            this.isDirectionFocused(DrawConst.focus.FocusAngle.BOTTOM)
                            
        // 列方向
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

    /**
     * 複数方向にフォーカスしている監視
     */
    inspectDualDirectionResize() {

        if (this._context.focus.focusedAngle.length !== 2) {
            return
        }

        // フォーカスの方向成分
        const isIncludeTopResize    = this.isDirectionFocused(DrawConst.focus.FocusAngle.TOP)
        const isIncludeBottomResize = this.isDirectionFocused(DrawConst.focus.FocusAngle.BOTTOM)
        const isIncludeLeftResize   = this.isDirectionFocused(DrawConst.focus.FocusAngle.LEFT)
        const isIncludeRightResize  = this.isDirectionFocused(DrawConst.focus.FocusAngle.RIGHT)

        // カーソルを双方向に切り替えるべき方向にフォーカスしているか
        const isTopLeftResize     = isIncludeTopResize && isIncludeLeftResize
        const isBottomRightResize = isIncludeBottomResize && isIncludeRightResize

        const isTopRightResize    = isIncludeTopResize && isIncludeRightResize
        const isBottomLeftResize  = isIncludeBottomResize && isIncludeLeftResize

        // 双方向にフォーカス
        if (isTopLeftResize || isBottomRightResize) {

            this._context.canvas.style.cursor = "nwse-resize"

            return
        }
        if (isTopRightResize || isBottomLeftResize) {

            this._context.canvas.style.cursor = "nesw-resize"

            return
        }
    }

    /**
     * 指定された方向にフォーカスしているか判定
     * 
     * @param {FocusAngle} focusedAngle 
     */
    isDirectionFocused(focusedAngle) {

        return this._context.focus.focusedAngle.includes(focusedAngle)
    }

}