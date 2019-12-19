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
        this._originTextDOM.addEventListener('keydown', () => {
            this.keydownEvent()
        })

    }

    clickEvent(event) {
        console.log('text click called')
        if (this._context.menu.isTextActive()) {

            console.log(this._context.textFocus.isFocused())

            if (this._context.textFocus.isFocused()) {
                this._context.drawStack.modifyCurrent(this._context.textFocus.getFocusedIndex())

                const boxText = this._context.drawStack.getCurrent()

                this._originTextDOM.style.top = (boxText.y -10) + 'px'
                this._originTextDOM.style.left = boxText.x + 'px'

                return
            }

            const boxText = new BoxText(this._context, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

            this._originTextDOM.style.top = (event.clientY -10) + 'px'
            this._originTextDOM.style.left = event.clientX + 'px'

            this._context.drawStack.append(boxText)

        }

    }

    keydownEvent() {
        console.log('key down')
        if (!this._context.menu.isTextActive()) {
            return 
        }
        const boxText = this._context.drawStack.getCurrent()

        boxText.fullDraw()

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