
import { DrawConst } from '../const/drawingConst.js'
import BaseDrawing from '../base/baseDrawing.js'

import MetaShape from '../shape/metaShape.js'

/**
 * 図形の削除を描画
 * 
 * @property {Object} context 描画コンテキスト
 * @property {MetaShape} metaShape 削除済みを描画するためのメタ図形
 * 
 */
export default class DeleteDrawing extends BaseDrawing{

    constructor(context) {
        super(context)

        this._metaShape = new MetaShape(context)
    }
    
    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

        if (!this.isTheModeActive(DrawConst.menu.DrawMode.DELETE)) {
            return
        }

        if (!this._context.focus.isFocused()) {
            return
        }
        
        this[`${eventType}Event`].call(this,event)
    }

    // ----------------------------------------------- イベント処理 ----------------------------------------------- 

    /**
     * マウス押下時の処理 削除処理を発火
     * @param {Event} event イベントオブジェクト
     */
    clickEvent(event) {

        this.delete()
    }

    // ----------------------------------------------- メソッド ----------------------------------------------- 

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