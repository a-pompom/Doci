export default class TextDrawing{

    constructor(context) {
        this._context = context
    }

    init() {

    }

    clickEvent(event) {
        if (this._context.menu.isTextActive()) {

            const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)

            this._context.drawStack.append(boxText)

        }

    }

    keydownEvent(evnet) {
        if (!this._context.menu.isTextActive()) {
            return 
        }
        const boxText = this._context.drawStack.getCurrent()

        boxText.draw()

    }

}