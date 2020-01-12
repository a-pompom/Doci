import BaseDrawing from '../base/baseDrawing.js'
import MetaShape from '../shape/metaShape.js'

/**
 * Excelのセルに擬態するため、セルを描画するクラス
 * 入力値に応じて幅・高さを切り替え可能とする
 * 
 * @property {DOM} cellWidthDOM セル幅のDOM要素
 * @property {DOM} cellHeightDOM セル高さのDOM要素
 * @property {MetaShape} metaShape セル幅・高さ変更後に画面に反映させるためのメタ図形
 */
export default class CellDrawing extends BaseDrawing{

    constructor(context) {

        super(context)

        this._cellWidthDOM = document.getElementById('cellWidth')
        this._cellHeightDOM = document.getElementById('cellHeight')

        this._metaShape = new MetaShape(context)

        this.init()
    }

    /**
     * 初期処理 セル幅・高さが入力されたら、妥当性を検証し、妥当であった場合は画面上にセルを描画
     */
    init() {

        this._cellWidthDOM.addEventListener('blur', () => {
            this.validateValue()
            this._metaShape.draw(this._metaShape.drawBase, this._metaShape)
        })
        this._cellHeightDOM.addEventListener('blur', () => {
            this.validateValue()
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

    /**
     * セルとして描画するべき幅・高さが妥当なものか検証
     * ここでは、入力が数値か否かのみを検証
     */
    validateValue() {

        // 入力値
        const cellWidthValue = this._cellWidthDOM.value
        const cellHeightValue = this._cellHeightDOM.value

        // 空の場合は更新の必要なし
        if (cellWidthValue === '' || cellHeightValue === '') {

            return
        }

        // 数値形式かつ正の数であった場合はそのまま描画に利用
        const isValidWidth = !isNaN(parseFloat(cellWidthValue)) && isFinite(cellWidthValue) && parseFloat(cellWidthValue) > 0.0
        const isValidHeight = !isNaN(parseFloat(cellHeightValue)) && isFinite(cellHeightValue) && parseFloat(cellHeightValue) > 0.0

        if (isValidWidth && isValidHeight) {
            return
        }

        // 無効な値は初期化して無効化
        this._cellWidthDOM.value = ''
        this._cellHeightDOM.value = ''
    }
}