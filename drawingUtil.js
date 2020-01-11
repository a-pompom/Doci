export default class DrawingUtil {

    static isTextInputMode() {
        return document.getElementById('inputText') === document.activeElement
    }

    static activateClass(element, activeClass) {

        document.getElementById(element).classList.add(activeClass)
    }

    static deactivateClass(element, activeClass) {

        document.getElementById(element).classList.remove(activeClass)
    }

    static getPixelRatio() {
        return window.devicePixelRatio + (0.4 * window.devicePixelRatio)
    }

}