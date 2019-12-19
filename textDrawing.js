import BoxText from './boxText.js'

export default class TextDrawing{

    constructor(context) {
        this._context = context
    }

    init() {

    }

    clickEvent(event) {
        console.log('text click called')
        if (this._context.menu.isTextActive()) {

            const boxText = new BoxText(this._context, event.clientX, event.clientY)

            this._context.drawStack.append(boxText)

        }

    }

    keydownEvent(evnet) {
        console.log('key down')
        if (!this._context.menu.isTextActive()) {
            return 
        }
        const boxText = this._context.drawStack.getCurrent()

        boxText.fullDraw()

    }

}