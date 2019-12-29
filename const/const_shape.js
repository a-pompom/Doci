/**
 * 図形の種類 テキストと通常の図形を判別するために利用
 * ・SHAPE: 通常の図形
 * ・TEXT: テキスト
 */
export const ShapeType = {
    SHAPE: Symbol('shape-type-shape'),
    TEXT: Symbol('shape-type-text')
}