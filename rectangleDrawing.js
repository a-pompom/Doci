import PointRectangle from './pointRectangle.js'

export default class RetangleDrawing {
    constructor(context) {
        this._context = context
        this._isMousedown = false
    }

    init() {
        this._context.canvas.addEventListener('mousedown', (event) => {

            if (!this._context.menu.isRectangleActive()) {
                return
            }

            this._isMousedown = true

            if (this._context.focus.isFocused()) {
                this._context.drawStack.modifyCurrent(this._context.focus.focusedIndex)

                const focusedRectangle = this._context.drawStack.getCurrent()
                focusedRectangle.setOriginHeight(focusedRectangle.height)

                return
            }

            const pointRectangle = new PointRectangle(this._context, event.clientX, event.clientY)

            this._context.drawStack.append(pointRectangle)

        })

        this.initRectHandle()
    }

    initRectHandle() {

        this._context.canvas.addEventListener('mouseup', (event) => {
            const currentRectangle = this._context.drawStack.getCurrent()
            currentRectangle.originY = currentRectangle.y

            this._context.focus.outFocus()

            this._isMousedown = false
        })

        this._context.canvas.addEventListener('mousemove', (event) => {
            if (!this._context.menu.isRectangleActive()) {
                return
            }

            // フォーカス対象の探索
            if (!this._isMousedown) {
                const shapeList = this._context.drawStack.stack

                const canvasRect = this._context.canvas.getBoundingClientRect();
                
                this._context.focus.inspectShapeFocus(shapeList, event.clientX - canvasRect.left, event.clientY - canvasRect.top +30)
                return
            }

            // 描画orリサイズイベント
            const pointRectangle = this._context.drawStack.getCurrent()

            let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
            let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

            pointRectangle.updatePos(posX, posY)

            pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY), this._context.focus.focusedAngle)

            pointRectangle.draw()
        })

    }
}