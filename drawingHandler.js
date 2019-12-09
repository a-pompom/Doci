import PointRectangle from './pointRectangle.js'
import BoxText from './boxText.js'
import DrawStack from './drawStack.js'

import MenuHandler from './menuHandler.js'
import {DrawMode, FocusAngle} from './mode.js'

export default class DrawingHandler {

    constructor() {
        this._isMousedown = false

        this._canvas = document.getElementById('myCanvas')
        this._context = this._canvas.getContext('2d')
        this._drawStack = new DrawStack(this._context)

        this._menuHandler = new MenuHandler()
        this._focusedIndex = -1

        this.init()
    }

    init() {
        this._canvas.addEventListener('click', (event) => {
            if (this._menuHandler.activeMode === DrawMode.TEXT) {

                const boxText = new BoxText(this._context, event.clientX, event.clientY, 200)
                this._drawStack.append(boxText)

            }

        })

        this._canvas.addEventListener('mousedown', (event) => {

            if (this._menuHandler.activeMode === DrawMode.RECTANGLE) {
                this._isMousedown = true

                if (this._focusedIndex !== -1) {
                    this._drawStack.modifyCurrent(this._focusedIndex)
                    this._drawStack.getCurrent().setOriginHeight(this._drawStack.getCurrent().height)
                    return
                }

                const pointRectangle = new PointRectangle(event.clientX, event.clientY, this._context)

                this._drawStack.append(pointRectangle)
            }
        })

        this.initTextHandle()
        this.initRectHandle()


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

    initRectHandle() {

        this._canvas.addEventListener('mouseup', (event) => {
            this._focusedIndex = -1
            this._isMousedown = false
        })

        this._canvas.addEventListener('mousemove', (event) => {
            if (!this._isMousedown) {
                this.inspectShapeFocus(event.clientX, event.clientY)
                return
            }

            if (this._menuHandler._activeMode !== DrawMode.RECTANGLE) {
                return
            }


            const pointRectangle = this._drawStack.getCurrent()

            let posX = event.clientX >= pointRectangle.originX ? pointRectangle.originX : event.clientX
            let posY = event.clientY >= pointRectangle.originY ? pointRectangle.originY : event.clientY

            pointRectangle.updatePos(posX, posY)

            pointRectangle.modifyScale(Math.abs(pointRectangle.originX - event.clientX), Math.abs(pointRectangle.originY - event.clientY))

            this.clearCanvas()

            this._drawStack.drawStack()
            pointRectangle.draw()
        })

    }

    inspectShapeFocus(mouseX, mouseY) {
        const drawStack = this._drawStack.stack
        let focusedIndex = -1

        for (let i = drawStack.length-1; i >= 0; i--) {
            let shape = drawStack[i]
            const canvasRect = this._canvas.getBoundingClientRect();
            mouseX = mouseX - canvasRect.left
            mouseY = mouseY - canvasRect.top + 30

            const height = shape.height
            const width = shape.width
            console.log(mouseY)
            console.log(shape.y)

            // 上横
            if (mouseX >= shape.x-20 && mouseX <= shape.x+20 + width && mouseY >= shape.y-20 && mouseY <= shape.y + 20)  {
                console.log('上横')
                focusedIndex = i
                shape.changeFocusedAngle(FocusAngle.TOP)
                break
            }
            // 左縦
            if (mouseY >= shape.y-20 && mouseY  <= shape.y + 20 + height && mouseX >= shape.x-20 && mouseX <= shape.x+20) {
                console.log('左縦')
                focusedIndex = i
                shape.changeFocusedAngle(FocusAngle.LEFT)
                break
            }
            // 右縦
            if (mouseY >= shape.y-20 && mouseY  <= shape.y + 20 + height && mouseX >= shape.x-20 + width && mouseX <= shape.x+20 + width) {
                console.log('右縦')
                focusedIndex = i
                shape.changeFocusedAngle(FocusAngle.RIGHT)
                break
            }
            // 下横
            if (mouseX >= shape.x-20 && mouseX <= shape.x+20 + width && mouseY >= shape.y-20 + height && mouseY <= shape.y + 20 + height)  {
                console.log('下横')
                focusedIndex = i
                shape.changeFocusedAngle(FocusAngle.BOTTOM)
                
                break
            }
           
        }
        console.log(focusedIndex)

        this._focusedIndex = focusedIndex

    }

    clearCanvas() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

}