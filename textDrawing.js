import BoxText from './boxText.js'

export default class TextDrawing{

    constructor(context) {
        this._context = context
        this._originTextDOM = document.getElementById('inputText')

        this.init()
    }

    init() {

        // キャンバスに文字を描画する際、透明なテキストエリアを利用しており、当該要素はキャンバスの外に存在するので、
        // 別途イベントを登録
        this._originTextDOM.addEventListener('keydown', (event) => {
            this.keydownEvent(event)
        })

        this._originTextDOM.addEventListener('blur', (event) => {
            this.blurEvent(event)
        })

    }

    clickEvent(event) {
        if (!this._context.menu.isTextActive()) {
            return 
        }

        if (!this._context.focus.isFocused()) {
            const boxText = new BoxText(this._context, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY)) 
            this.setTextDOMPos(boxText.x, boxText.y)

            this._context.drawStack.append(boxText)

            return
        }
        this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

        const shape = this._context.drawStack.getCurrent()

        if (shape.isText()) {
            this.setTextDOMPos(shape.x, shape.y)
            this.setTextDOMScale(shape.width, shape.height)

            this._originTextDOM.value = shape.originText

            this._originTextDOM.focus()

        }

        if (shape.isBox() && this._context.focus.isInsideFocused()) {
            if (shape.boxText === null) {
                shape.boxText = new BoxText(this._context, shape.x +15, shape.y + 20, shape.width)
            }

            this.setTextDOMPos(shape.x + 15, shape.y + 20)
            this.setTextDOMScale(shape.width, shape.height)

            this._originTextDOM.value = shape.boxText.originText
            this._originTextDOM.focus()

        }

    }

    keydownEvent(event) {
        if (!this._context.menu.isTextActive()) {
            return 
        }

        if (event.keyCode === 27) {
            this._originTextDOM.blur()

        }
        const shape = this._context.drawStack.getCurrent()
        if (shape.isBox()) {

            this.setTextDOMPos(shape.x + 15, shape.y + 20)

            shape.updateText()
            shape.fullDraw()
            return
        }

        shape.update()
        shape.fullDraw()

    }

    blurEvent(event) {
        this._originTextDOM.style.top = 0
        this._originTextDOM.style.left = 0
        this._originTextDOM.style.width = 0
        this._originTextDOM.style.height = 0

    }

    setTextDOMPos(posX, posY) {
        this._originTextDOM.style.top = posY + 60 + 'px'
        this._originTextDOM.style.left = posX + 'px'
    }

    setTextDOMScale(scaleX, scaleY) {
        this._originTextDOM.style.width = scaleX + 'px'
        this._originTextDOM.style.height = scaleY + 50 + 'px'

    }

    /**
     * マウスの画面上のx座標をキャンバスでのx座標に変換
     * @param {number} mouseX マウスの画面上のx座標
     */
    getCanvasX(mouseX) {
        return mouseX - this._context.canvas.getBoundingClientRect().left
    }

    /**
     * マウスの画面上のy座標をキャンバスでのy座標に変換
     * @param {number} mouseY マウスの画面上のy座標
     */
    getCanvasY(mouseY) {
        return mouseY - this._context.canvas.getBoundingClientRect().top
    }

}