
import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import MetaShape from '../shape/metaShape.js'

/**
 * 図形の移動を描画
 * 
 * @property {number} moveStartX 移動開始地点のx座標
 * @property {number} moveStartY 移動開始地点のy座標
 */
export default class MoveDrawing extends BaseDrawing{

    constructor(context) {
        super(context)

        this._metaShape = new MetaShape(context)
    }
    

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 描画開始イベントを発火
     * @param {Event} event イベントオブジェクト
     */
    clickEvent(event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.DELETE)) {
            return
        }

        if (!this._context.focus.isFocused()) {
            return
        }

        this.delete()


    }

    /**
     * 現在フォーカスしている図形をキャンバス上から削除
     */
    delete() {

        const deleteTargetIndex = this._context.focus.focusedIndex

        // スタックでは、スタックの要素として除外するのみで、描画はしない
        this._context.drawStack.delete(deleteTargetIndex)

        this._context.focus.outFocus()

        // 削除された図形で再度描画するのは構造として不自然なので、メタ情報を管理する図形によって、スタック上のみの図形を再描画
        this._metaShape.draw(this._metaShape.drawBase, this._metaShape)
    }


}