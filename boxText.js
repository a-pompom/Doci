/**
 * 領域内の文字列を扱うためのクラス
 * @property {Array} text 入力文字列を改行及びキャンバス上の領域の幅をもとに分割したもの
 * 
 * @property {number} boxWidth キャンバス上の文字列を挿入する領域の幅
 * @property {object} context キャンバスのコンテキスト 文字列長を取得するために利用
 */
export default class BoxText {

    constructor(context, startX, startY, boxWidth) {

        this._text = []
        this._originTextDOM = document.getElementById('inputText')
        this._originText = this._originTextDOM.value

        this._startX = startX
        this._startY = startY

        this._boxWidth = boxWidth
        this._context = context


        this.init()
    }

    /**
     * 初期処理として、前の入力文字列を初期化し、文字入力が可能となるよう透明なテキストエリアへフォーカス
     */
    init() {
        this._originTextDOM.value = ''
        this._originTextDOM.focus()
    }

    /**
     * 領域文字列を描画
     */
    draw() {

        this._text.forEach((rowText, index) => {
            this._context.fillText(rowText, this._startX, this._startY + index* 20)

        })
    }

    /**
     * 入力された文字列をもとに、現在有効な領域内のテキストを更新
     * 
     * @param {string} inputValue 入力された文字列
     */
    update() {
        this._originText = this._originTextDOM.value

        this._text = []

        const paragraphText = this._originText.split(/\r?\n/g)

        paragraphText.forEach((rowText) => {
                
            // 1行の文字列が領域内に収まるようになるまで切り出しを繰り返す
            while (this.isOverFit(rowText)) {

                let breakPoint = this.getFittedTailIndex(rowText)

                this._text.push(rowText.substring(0, breakPoint))

                rowText = rowText.substring(breakPoint)
            }

            // 領域内に最初から収まっている文字列も追加
            this._text.push(rowText)
        })

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
        while (!this.isOverFit(rowText.substring(0,index))) {
            index ++
        }

        // 領域からはみ出すとループが終了するので、はみ出す手前の範囲を表すインデックスを渡す
        return index -1
    }

    /**
     * 指定された文字列の幅がキャンバス上の領域を超過しているか判定
     * 
     * @param {string} fragmentText 領域内に収められる部分文字列
     * @return {boolean} true→ 超過 false→範囲内
     */
    isOverFit(fragmentText) {

        const fragmentTextWidth = this._context.measureText(fragmentText).width

        return fragmentTextWidth > this._boxWidth
    }


    get text() {
        return this._text
    }

}