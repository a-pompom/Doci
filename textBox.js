export default class TextBox {

    constructor(context, boxWidth) {

        this._text = []
        this._originText = ''

        this._boxWidth = boxWidth
        this._context = context
    }

    get text() {
        return this._text
    }

    getTextWidth(item) {
        return this._context.measureText(item).width
    }

    getFittedIndex(item) {
        let index = 0
        while (this.getTextWidth(item.substring(0,index)) < this._boxWidth) {

            index ++
        }

        return index -1
    }

    update(inputValue) {
        this._text = []
        this._originText = inputValue

        // ¥nで分割して配列にする
        const paragraphText = this._originText.split(/\r?\n/g)

        paragraphText.forEach((item) => {
            if (this._context.measureText(item).width > this._boxWidth) {
                
                while (this.getTextWidth(item) > this._boxWidth) {
                    let breakPoint = this.getFittedIndex(item)

                    this._text.push(item.substring(1, breakPoint))

                    item = item.substring(breakPoint)
                }
            }

            this._text.push(item)
        })
    }


}