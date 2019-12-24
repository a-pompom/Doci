import Shape from '../base/shape.js'

/**
 * 削除された図形といった、キャンバス上に表れないメタ情報を描画するための図形
 */
export default class MetaShape extends Shape {

    constructor(context) {

        super(context, -1, -1)
    }

    /**
     * 
     * @param {Function} drawFunction 処理を表す関数
     * @param {Shape} shape 処理を行う図形
     * @param {Array} arg 処理に渡す引数 配列形式
     */
    draw(drawFunction, shape, arg) {

        drawFunction.apply(shape, arg)
    }
}