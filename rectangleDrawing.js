import PointRectangle from './pointRectangle.js'
import ResizeHandler from './resizeHandler.js'

export default class RetangleDrawing {
    constructor(context) {
        this._context = context
        this._isMousedown = false

        this._resizeHandler = new ResizeHandler()
    }

    mousedownEvent(event) {

        if (!this._context.menu.isRectangleActive()) {
            return
        }

        this._context.isMousedown = true

        if (this._context.focus.isFocused()) {
            this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

            const focusedRectangle = this._context.drawStack.getCurrent()
            focusedRectangle.setOriginPos()

            return
        }

        const pointRectangle = new PointRectangle(this._context, this.getCanvasX(event.clientX), this.getCanvasY(event.clientY))

        this._context.drawStack.append(pointRectangle)

    }

    mousemoveEvent(event) {
        if (!this._context.menu.isRectangleActive() || !this._context.isMousedown) {
            return
        }

        this.resize(event)

        pointRectangle.fullDraw()

    }
    
    mouseupEvent(event) {
        const currentRectangle = this._context.drawStack.getCurrent()
        currentRectangle.originY = currentRectangle.y
        currentRectangle.originX = currentRectangle.x

        this._context.focus.outFocus()

        this._context.isMousedown = false

    }

    resize(event) {
        const pointRectangle = this._context.drawStack.getCurrent()

        const x = this.getCanvasX(event.clientX)
        const y = this.getCanvasY(event.clientY)

        let posX = x >= pointRectangle.originX ? pointRectangle.originX : x
        let posY = y >= pointRectangle.originY ? pointRectangle.originY : y

        this._resizeHandler.updatePos(pointRectangle, posX, posY, this._context.focus.focusedAngle)

        const scaleX = Math.abs(pointRectangle.originX - x)
        const scaleY = Math.abs(pointRectangle.originY - y)

        this._resizeHandler.modifyScale(pointRectangle, scaleX, scaleY, this._context.focus.focusedAngle)

    }


    getCanvasX(mouseX) {
        return mouseX - this._context.canvas.getBoundingClientRect().left
    }

    getCanvasY(mouseY) {
        return mouseY - this._context.canvas.getBoundingClientRect().top
    }
}