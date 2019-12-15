import PointRectangle from './pointRectangle.js'

export default class RetangleDrawing {
    constructor(context) {
        this._context = context
        this._isMousedown = false
    }

    init() {
        this.initRectHandle()
    }

    initRectHandle() {

    }

    mousedownEvent(event) {

        if (!this._context.menu.isRectangleActive()) {
            return
        }

        this._context.isMousedown = true

        if (this._context.focus.isFocused()) {
            this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

            const focusedRectangle = this._context.drawStack.getCurrent()
            focusedRectangle.setOriginHeight(focusedRectangle.height)

            return
        }

        const pointRectangle = new PointRectangle(this._context, event.clientX, event.clientY)

        this._context.drawStack.append(pointRectangle)

    }

    mousemoveEvent(event) {
        if (!this._context.menu.isRectangleActive() || !this._context.isMousedown) {
            return
        }

        // 描画orリサイズイベント
        const pointRectangle = this._context.drawStack.getCurrent()

        let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
        let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

        pointRectangle.updatePos(posX, posY)

        pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY), this._context.focus.focusedAngle)

        pointRectangle.fullDraw()

    }
    
    mouseupEvent(event) {
        const currentRectangle = this._context.drawStack.getCurrent()
        currentRectangle.originY = currentRectangle.y

        this._context.focus.outFocus()

        this._context.isMousedown = false

    }
}