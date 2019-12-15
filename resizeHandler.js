import {FocusAngle} from './mode.js'

export default class ResizeHandler {

    constructor() {
    }

    updatePos(shape, posX, posY, focusAngle) {
        const yFocused = this.isYFocused(focusAngle)
        const xFocused = this.isXFocused(focusAngle)

        shape.x = yFocused ? shape.originX : posX
        shape.y = xFocused ? shape.originY : posY
    }

    isXFocused(focusAngle) {
        if (focusAngle.length > 1) {
            return false
        }

        if (focusAngle[0] === FocusAngle.LEFT || focusAngle[0] === FocusAngle.RIGHT) {
            return true
        }

        return false
    }

    isYFocused(focusAngle) {
        if (focusAngle.length > 1) {
            return false
        }

        if (focusAngle[0] === FocusAngle.TOP || focusAngle[0] === FocusAngle.BOTTOM) {
            return true
        }

        return false
    }

    /**
     * リサイズによる幅・高さの変動を反映
     * @param {number} scaledX 
     * @param {number} scaledY 
     */
    modifyScale(shape, scaledX, scaledY, focusAngle) {
        focusAngle.forEach( (angle) => {

            if (angle === FocusAngle.NONE) {
                shape.width = scaledX
                shape.height = scaledY 

            }
            if (angle === FocusAngle.BOTTOM) {
                shape.height = scaledY
            }

            if (angle === FocusAngle.TOP) {

                switch(this.getScaleDirection(shape, scaledY, 'y')) {

                    case shape.Direction.FORWARD:
                        shape.height = scaledY + shape.originHeight
                        break
                    
                    case shape.Direction.BETWEEN:
                        shape.y = shape.originY + scaledY
                        shape.height = shape.originHeight - scaledY
                        break

                    case shape.Direction.REVERSE:
                        shape.y = shape.originY + shape.originHeight
                        shape.height = scaledY - shape.originHeight
                        break

                }

            }

            if (angle === FocusAngle.RIGHT) {
                shape.width = scaledX
            }

            if (angle === FocusAngle.LEFT) {

                switch(this.getScaleDirection(shape, scaledX, 'x')) {

                    case shape.Direction.FORWARD:
                        shape.width = scaledX + shape.originWidth
                        break
                    
                    case shape.Direction.BETWEEN:
                        shape.x = shape.originX + scaledX
                        shape.width = shape.originWidth - scaledX
                        break

                    case shape.Direction.REVERSE:
                        shape.x = shape.originX + shape.originWidth
                        shape.width = scaledX - shape.originWidth
                        break

                }

            }

        })

    }

    getScaleDirection(shape, scale, xyDirection) {
        const pos = shape[`${xyDirection}`]
        const originPos = shape[`origin${xyDirection.toUpperCase()}`]
        const originScale = xyDirection === 'x' ? shape.originWidth : shape.originHeight

        if (pos !== originPos) {
            return shape.Direction.FORWARD
        }
        if (scale <= originScale) {
            return shape.Direction.BETWEEN
        }

        return shape.Direction.REVERSE
    }
}