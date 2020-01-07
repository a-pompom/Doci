/**
 * テキストの描画のロジック部分を管理するサービス
 * 
 * @property {Object} context 描画コンテキスト
 * @property {DOM} originTextDOM キャンバスに表示する文字を格納するためのテキストエリア
 */
export default class TextService {

    constructor(context, originTextDOM) {

        this._context = context
        this._originTextDOM = originTextDOM
    }

    /**
     * クリックイベントを処理 テキストを描画するためにDOM要素の設定を行う
     * 
     * @param {Text} text 描画対象テキスト
     */
    handleClickEvent(text) {
        
        this.setTextDOMAttribute(text)

        this._originTextDOM.value = text.originText
        this._originTextDOM.focus()
    }

    /**
     * クリックイベントを処理 図形内にテキストを描画するためにDOM要素の設定を行う
     * 
     * @param {Shape} boxShape テキストを内部に保持可能な図形
     */
    handleBoxClickEvent(boxShape) {

        this.setTextDOMAttribute(boxShape)

        this._originTextDOM.value = boxShape.boxText.originText
        this._originTextDOM.focus()
    }

    /**
     * キーイベントを処理 キー入力の内容をキャンバスに反映
     * 
     * @param {Shape} shape テキスト
     */
    handleKeyEvent(shape) {

        if (shape.canIncludeText) {

            shape.boxText.update()
            return
        }

        shape.update()
    }

    /**
     * フォーカスが外れたときの処理 DOM要素を初期化
     */
    handleBlurEvent(shape) {

        shape.fullDraw()

        this._originTextDOM.style.top = 0
        this._originTextDOM.style.left = 0
        this._originTextDOM.style.width = 0
        this._originTextDOM.style.height = 0

        this._originTextDOM.value = ''

        this._originTextDOM.blur()
    }

    /**
     * DOM要素の位置・大きさを設定
     * 
     * @param {Shape} shape 
     */
    setTextDOMAttribute(shape) {
        // 図形領域内に文字列を描画する場合、テキスト描画開始位置を図形の左上に設定
        if (shape.canIncludeText) {

            this.setTextDOMPos(shape.x + 20, shape.y + 30)
            this.setTextDOMScale(shape.width -20, shape.height -30)
            return
        }

        this.setTextDOMPos(shape.x, shape.y)
        this.setTextDOMScale(shape.width, shape.height)
    }
    
    /**
     * 
     * @param {number} posX テキスト入力エリアのx座標
     * @param {number} posY テキスト入力エリアのy座標
     */
    setTextDOMPos(posX, posY) {
        this._originTextDOM.style.top = posY - 15 + 'px'
        this._originTextDOM.style.left = posX + 75 + 'px'
    }

    /**
     * 
     * @param {number} scaleX テキスト入力エリアの幅
     * @param {number} scaleY テキスト入力エリアの高さ
     */
    setTextDOMScale(scaleX, scaleY) {
        this._originTextDOM.style.width = scaleX + 'px'
        this._originTextDOM.style.height = scaleY +'px'

    }

}