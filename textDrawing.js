export default class TextDrawing {

    constructor(context) {
        this._context = context
    }

    init() {

        this._context.canvas.addEventListener('click', (event) => {
            // TODO isTextActive実装
            if (this._context.menu.isTextActive) {

                const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)

                this._context.drawStack.append(boxText)

            }

        })
    }

    initTextHandle() {

        document.addEventListener('keydown', () => {
            if (this._menuHandler.activeMode !== DrawMode.TEXT) {
                return 
            }
            const boxText = this._drawStack.getCurrent()

            this.clearCanvas()

            this._drawStack.drawStack()
            boxText.update()
            boxText.draw()

        })
    }

}