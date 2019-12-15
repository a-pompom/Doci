export default class TextDrawing{

    constructor(context) {
        this._context = context
    }

    init() {

        this._context.canvas.addEventListener('click', (event) => {

            if (this._context.menu.isTextActive()) {

                const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)

                this._context.drawStack.append(boxText)

            }

        })
    }

    initTextHandle() {

        document.addEventListener('keydown', () => {
            if (!this._context.menu.isTextActive()) {
                return 
            }
            const boxText = this._context.drawStack.getCurrent()

            boxText.draw()
        })
    }

}