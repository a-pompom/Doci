import BaseDrawing from '../base/baseDrawing.js'

import MetaShape from '../shape/metaShape.js'

export default class CellDrawing extends BaseDrawing{

    constructor(context) {

        super(context)

        this._cellWidthDOM = document.getElementById('cellWidth')
        this._cellHeightDOM = document.getElementById('cellHeight')

        this._metaShape = new MetaShape(context)

        this.init()
    }

    init() {

        this._cellWidthDOM.addEventListener('blur', () => {
            this.validateValue
            this._metaShape.draw(this._metaShape.drawBase, this._metaShape)
        })
        this._cellHeightDOM.addEventListener('blur', () => {
            this.validateValue
            this._metaShape.draw(this._metaShape.drawBase, this._metaShape)
        })
    }

    /**
     * イベントの前処理を実行 主に描画モードの判定で利用
     * 
     * @param {string} eventType 実行されるイベントの種類
     * @param {Event} event イベントオブジェクト
     */
    setupEvent(eventType, event) {

    }

    validateValue() {

        const cellWidthValue = this._cellWidthDOM.value
        const cellHeightValue = this._cellHeightDOM.value

        // 空の場合は更新の必要なし
        if (cellWidthValue === '' || cellHeightValue === '') {

            return
        }

        // 数値形式か
        if (!isNaN(parseFloat(n)) && isFinite(n)) {
            return
        }

        this._cellWidthDOM.value = ''
        this._cellHeightDOM.value = ''
    }
}