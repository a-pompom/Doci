import DrawStack from "./drawStack.js"

export default class baseHandler {

    constructor() {
        this._canvas = document.getElementById('myCanvas')
        this._context = this._canvas.getContext('2d')
    }

}