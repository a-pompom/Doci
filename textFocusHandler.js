export default class TextFocusHandler {

    constructor() {
        this._focusedTextIndex = -1
        
    }

    /**
     * 
     * @param {Array<Shape>} shapeList フォーカス対象になり得る描画中の図形のリスト
     * @param {number} posX キャンバス中のカーソルX座標
     * @param {number} posY キャンバス中のカーソルY座標
     */
    inspectShapeFocus(shapeList, posX, posY) {
        this.outFocus()

        // 各図形の位置・現在のカーソル座標から、フォーカス対象が存在するか判定
        for (let i = shapeList.length-1; i >= 0; i--) {
            let shape = shapeList[i]

            const height = shape.height
            const width = shape.width
            const x = shape.x
            const y = shape.y

            console.log(height)
            console.log(width)
            console.log(x)
            console.log(y)

            const isInsideX = x < posX && posX < x + width
            const isInsideY = y < posY && posY < y + height

            if (isInsideX && isInsideY) {
                this.setFocusTarget(i)
            }

            if (this.isFocused()) {
                break
            }
        }
    }

    /**
     * 現在フォーカス中の対象を更新
     * @param {number} index 描画された図形の内、対象を識別するためのインデックス
     */
    setFocusTarget(index) {
        this._focusedTextIndex = index
    }

    /**
     * フォーカス対象から外れたと判定し、状態を初期化
     */
    outFocus() {
        this._focusedTextIndex = -1
    }

    /**
     * 何らかの対象にフォーカスをしているか判定
     * @return {boolean} フォーカス中か否か
     */
    isFocused() {
        return this._focusedTextIndex !== -1
    }

    get focusedIndex() {
        return this._focusedTextIndex
    }
}