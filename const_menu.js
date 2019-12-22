/**
 * 描画モード
 * ・NONE なし
 * ・RECTANGLE 赤枠の四角
 * ・TEXT 文字列
 * ・WORD_BALLOON 吹き出し
 */
export const DrawMode = {
    NONE: Symbol('draw-mode-none'),
    RECTANGLE: Symbol('draw-mode-rect'),
    TEXT: Symbol('draw-mode-text'),
    WORD_BALLOON: Symbol('draw-mode-balloon')
}

export const DrawType = {
    NONE: Symbol('draw-type-none'),
    RECTANGLE: Symbol('draw-type-rectangle'),
    TEXT: Symbol('draw-type-text')
}