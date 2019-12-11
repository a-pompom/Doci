import {FocusAngle} from './mode.js'
import BaseHandler from './baseHandler.js'

export default class FocusHandler extends BaseHandler {
    
    constructor() {
        super()

        this._focusedIndex = -1
        this._focusedAngle = ''
    }

    inspectShapeFocus(mouseX, mouseY) {
        const drawStack = this._drawStack.stack

        for (let i = drawStack.length-1; i >= 0; i--) {
            let shape = drawStack[i]
            const canvasRect = this._canvas.getBoundingClientRect();
            mouseX = mouseX - canvasRect.left
            mouseY = mouseY - canvasRect.top + 30

            const height = shape.height
            const width = shape.width

            // 上横
            if (mouseX >= shape.x-10 && mouseX <= shape.x+10 + width && mouseY >= shape.y-10 && mouseY <= shape.y + 10)  {
                console.log('上横')
                this.setFocusTarget(i, FocusAngle.TOP)
                break
            }
            // 左縦
            if (mouseY >= shape.y-10 && mouseY  <= shape.y + 10 + height && mouseX >= shape.x-10 && mouseX <= shape.x+10) {
                console.log('左縦')
                this.setFocusTarget(i, FocusAngle.LEFT)
                break
            }
            // 右縦
            if (mouseY >= shape.y-10 && mouseY  <= shape.y + 10 + height && mouseX >= shape.x-10 + width && mouseX <= shape.x+10 + width) {
                console.log('右縦')
                this.setFocusTarget(i, FocusAngle.RIGHT)
                break
            }
            // 下横
            if (mouseX >= shape.x-10 && mouseX <= shape.x+10 + width && mouseY >= shape.y-10 + height && mouseY <= shape.y + 10 + height)  {
                console.log('下横')
                this.setFocusTarget(i, FocusAngle.BOTTOM)
                
                break
            }
           
        }

    }

    setFocusTarget(index, angle) {
        this._focusedIndex = index
        this._focusedAngle = angle
    }
    isFocused() {
        return this._focusedIndex !== -1
    }

    get focusedIndex() {
        return this._focusedIndex
    }
    get focusedAngle() {
        return this._focusedAngle
    }
    
}