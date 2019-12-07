export default class TextBox {

    constructor() {

        this._text = ''
    }

    get text() {
        return this._text
    }

    append(char) {
        this._text += char
    }

}