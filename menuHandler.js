import {DrawMode} from './mode.js'

export default class MenuHandler {
    
    constructor() {
        this._activeMode = ''

        this._rectMenuButton = document.getElementById('rectangleModeButton')
        this._textMenuButton = document.getElementById('textModeButton')
        console.log(this._rectMenuButton)

        this.initMenu()

    }

    initMenu() {

        this._rectMenuButton.addEventListener('click', () => {

            console.log('rectmenu clicked!!')
            this._activeMode = DrawMode.RECTANGLE

        })


        this._textMenuButton.addEventListener('click', () => {
            console.log('textMenuClicked!!')
            this._activeMode = DrawMode.TEXT

        })
        

    }

    get activeMode() {
        return this._activeMode
    }

}