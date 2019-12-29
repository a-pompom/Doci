import ResizeHandler from '../handler/resizeHandler.js'

export default class ResizeService {

    constructor(context) {
        this._context = context
        this._resizeHandler = new ResizeHandler()
    }

    initResizeEvent(shape) {

        shape.setOriginPos()
        shape.setOriginScale()
    }

    resize(shape, x, y) {

        this._resizeHandler.shape = shape
        this._resizeHandler.resize(x, y, this._context.focus.focusedAngle)
    }
}