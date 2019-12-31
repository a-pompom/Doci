import {DrawConst} from '../const/drawingConst.js'
import MetaShape from '../shape/metaShape.js'

export default class StackHandler {

    constructor(context) {
        this._context = context
        this._currentStack = 0

        this._stackScale = 0

        this._metaShape = new MetaShape(this._context)

        this.init()
    }

    init() {

        this.initDOMScale()

        for (let i=0; i < DrawConst.stack.StackLength; i++) {

            const stackDOM = document.getElementById(`stackButton-${i}`)


            stackDOM.addEventListener('click', () => {

                if (this._context.drawStackList[this._currentStack].length !== 0) {

                    this.createThumbNail(this._currentStack)
                }
                
                this._context.drawStack = this._context.drawStackList[i]
                this._currentStack = i
                this._context.focus.outFocus()

                this._metaShape.draw(this._metaShape.drawBase, this._metaShape)

                if (this._context.drawStack.stack.length !== 0) {

                    this._context.drawStack.draw()

                }
            })

        }
    }

    createThumbNail(index) {

        const theURI = this._context.canvas.toDataURL()
        const theImage = document.getElementById(`image-${index}`)
        theImage.src = theURI

    }

    initDOMScale() {

        const screenHeight = document.body.clientHeight
        this._stackScale = screenHeight / 14

        for (let i=0; i < DrawConst.stack.StackLength; i++) {

            const stackDOM = document.getElementById(`stackButton-${i}`)
            stackDOM.style.width = '80px'
            stackDOM.style.height = this._stackScale + 20 + 'px'

            const imageDOM = document.getElementById(`image-${i}`)
            imageDOM.width = 80
            imageDOM.height = this._stackScale
        }

    }
}