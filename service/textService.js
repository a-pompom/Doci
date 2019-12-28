export default class TextService {

    constructor(context, textDrawing) {

        this._context = context
        this._textDrawing = textDrawing
    }

    handleClickEvent(text) {
        
        this.setTextDOMPos(text.x + 15, text.y + 20)
        this.setTextDOMScale(text.width, text.height)

        this._originTextDOM.value = text.originText
        this._originTextDOM.focus()
    }

    handleBoxClickEvent(boxShape) {

        this.setTextDOMPos(boxShape.x + 15, boxShape.y + 20)
        this.setTextDOMScale(boxShape.width, boxShape.height)

        this._originTextDOM.value = boxShape.boxText.originText
        this._originTextDOM.focus()
    }

    handleKeyEvent(shape) {

        // 図形領域内に文字列を描画する場合、テキスト描画開始位置を図形の左上に設定
        if (shape.canIncludeText) {

            this.setTextDOMPos(shape.x + 15, shape.y + 20)

            shape.updateText()
            shape.fullDraw()

            return
        }

        shape.update()
        shape.fullDraw()
    }

    handleBlurEvent() {

        this._originTextDOM.style.top = 0
        this._originTextDOM.style.left = 0
        this._originTextDOM.style.width = 0
        this._originTextDOM.style.height = 0
    }
    
    /**
     * 
     * @param {number} posX テキスト入力エリアのx座標
     * @param {number} posY テキスト入力エリアのy座標
     */
    setTextDOMPos(posX, posY) {
        this._originTextDOM.style.top = posY + 60 + 'px'
        this._originTextDOM.style.left = posX + 'px'
    }

    /**
     * 
     * @param {number} scaleX テキスト入力エリアの幅
     * @param {number} scaleY テキスト入力エリアの高さ
     */
    setTextDOMScale(scaleX, scaleY) {
        this._originTextDOM.style.width = scaleX + 'px'
        this._originTextDOM.style.height = scaleY + 50 + 'px'

    }

}