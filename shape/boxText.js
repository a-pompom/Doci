import { DrawConst } from '../const/drawingConst.js'
import Text from '../base/text.js'

/**
 * 領域内の文字列を扱うためのクラス
 * @property {Array} text 入力文字列を改行及びキャンバス上の領域の幅をもとに分割したもの
 * @property {string} originText 元の文字列 編集する際に利用
 * @property {number} boxWidth キャンバス上の文字列を挿入する領域の幅
 */
export default class BoxText extends Text {

    constructor(context, startX, startY, boxWidth) {

        super(context, startX, startY)
        this.defineAttribute()

        this._text = []
        this._boxWidth = boxWidth ? boxWidth : 200

        this.init()
    }

    /**
     * 初期処理として、前の入力文字列を初期化し、文字入力が可能となるよう透明なテキストエリアへフォーカス
     */
    init() {
        this._originTextDOM.value = ''
        this._originTextDOM.style.width = '20px'
        this._originTextDOM.style.height = '20px'
        this._originTextDOM.focus()

        this.width = 20
    }


    fullDraw() {
        this.drawBase()
        this.draw()
    }

    /**
     * 領域文字列を描画
     */
    draw() {

        this._text.forEach((rowText, index) => {
            this._context.canvasContext.font = '12px sans-serif'
            this._context.canvasContext.fillText(rowText, this.x, this.y + index* 20)
        })
    }

    /**
     * 入力された文字列をもとに、現在有効な領域内のテキストを更新
     */
    update() {
        this._originText = this._originTextDOM.value

        this._text = []

        const paragraphText = this._originText.split(/\r?\n/g)

        paragraphText.forEach((rowText) => {
                
            // 1行の文字列が領域内に収まるようになるまで切り出しを繰り返す
            while (this.isOverFit(this.getFragmentTextWidth(rowText))) {

                let breakPoint = this.getFittedTailIndex(rowText)

                this._text.push(rowText.substring(0, breakPoint))

                rowText = rowText.substring(breakPoint)
            }

            // 領域内に最初から収まっている文字列も追加
            this._text.push(rowText)
        })

        // 文字列の入力エリアの幅・高さを設定 あまり領域を広げ過ぎると、既存の図形が隠れてしまうため、入力に必要最低限な領域のみを確保
        this._text.forEach((fragmentText) => {

            let fragmentWidth = this.getFragmentTextWidth(fragmentText)

            this.width = fragmentWidth >= this.width ? fragmentWidth : this.width
        })

        this.height = (this._text.length) * 20

        this._originTextDOM.style.width = this.width + 'px'
        this._originTextDOM.style.height = this.height + 'px'
    }

    /**
     * 表示領域からはみ出る文字列について、先頭を基準に切り出して、範囲内に収まるindexを取得
     * ex) とっても長いもじれつ(長さ:100) 領域長: 50 →  index=4(とっても長 まで)
     * 
     * @param {string} rowText 一行で表される文字列
     * @return {number} 範囲内に収まる文字列のindex
     */
    getFittedTailIndex(rowText) {

        let index = 0

        // 領域内に収まる文字列に切り出すため、範囲内に収まる先頭からの文字数を導出
        while (!this.isOverFit(this.getFragmentTextWidth(rowText.substring(0,index)))) {
            index ++
        }

        // 領域からはみ出すとループが終了するので、はみ出す手前の範囲を表すインデックスを渡す
        return index -1
    }

    /**
     * 指定された文字列の幅がキャンバス上の領域を超過しているか判定
     * 
     */
    isOverFit(fragmentTextWidth) {
        return fragmentTextWidth >= this._boxWidth
    }

    /**
     * 部分文字列のキャンバス上の幅を取得
     * 
     * @param {string} fragmentText 測定対象文字列
     */
    getFragmentTextWidth(fragmentText) {
        return this._context.canvasContext.measureText(fragmentText).width
    }

    /**
     * 属性値を設定 領域を持つテキストとして定義
     */
    defineAttribute() {
        this._hasArea = true
    }

    get text() {
        return this._text
    }

    get originText() {
        return this._originText
    }

}