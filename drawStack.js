/**
 * キャンバス上に描画されたオブジェクトを管理するためのクラス
 * 以下の用途で利用
 * ・Undo
 * ・既存の描画済みオブジェクトを保持 リサイズ時にはキャンバスを一度クリアする必要があるため、状態として保持しておく
 */
export default class DrawStack {
    constructor(context) {
        this._context = context

        this._drawStack = []
        this._selectedDrawing = 0
    }

    /**
     * 描画スタックへ要素を追加
     * @param {Shape} 描画要素
     */
    append(shape) {
        this._drawStack.push(shape)
    }

    /**
     * 現在描画中の要素を取得
     */
    getCurrent() {
        return this._drawStack[this._drawStack.length-1]
    }

    /**
     * キャンバス上の要素は、更新の度に初期化されてしまうので、
     * 既存要素を保持したスタックをもとに再描画
     */
    drawStack() {

        this._drawStack.forEach((shape) => {
            // 現在参照中の要素は、更新で別途描画されるので、対象外とする
            if (shape === this.getCurrent()) {
                return
            }

            shape.draw()
        })

        
    }

    get stack() {
        return this._drawStack
    }
}