export default class DrawingUtil {

    /**
     * テキスト入力中か判定
     * テキスト入力中はショートカットキーを無効化させるため、いずれかのテキスト要素にフォーカスしているかを判定
     */
    static isTextInputMode() {

        let isTextInput = false

        // NodeListはArrayではないので、forEachで一つずつdocument.activeElementと合致するか検査が必要
        document.querySelectorAll("textarea, input[type=text]").forEach((element) => {

            if (!isTextInput) {
                isTextInput = document.activeElement === element
            }
        })
        return isTextInput
    }

    /**
     * クラスを特定の要素に付与
     * 
     * @param {string} element クラスを変動させるDOM要素文字列
     * @param {string} activeClass 対象のクラス名
     */
    static activateClass(element, activeClass) {

        document.getElementById(element).classList.add(activeClass)
    }

    /**
     * クラスを特定の要素から除外
     * 
     * @param {string} element クラスを変動させるDOM要素文字列
     * @param {string} activeClass 対象のクラス名
     */
    static deactivateClass(element, activeClass) {

        document.getElementById(element).classList.remove(activeClass)
    }

    /**
     * キャンバスの解像度を調整するため、devicePixelRatioを取得
     * そのままの値を渡すとぼやけが残ってしまっていたので、係数として、0.4を自身に掛けたものを足す
     */
    static getPixelRatio() {
        return window.devicePixelRatio + (0.4 * window.devicePixelRatio)
    }

}