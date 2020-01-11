/**
 * 描画モード
 * ・NONE なし
 * ・RECTANGLE 赤枠の四角
 * ・TEXT 文字列
 * ・WORD_BALLOON 吹き出し
 * 
 */
export const DrawMode = {
    NONE: Symbol('draw-mode-none'),
    MOVE: Symbol('draw-mode-move'),
    DELETE: Symbol('draw-mode-delete'),
    RECTANGLE: Symbol('draw-mode-rect'),
    TEXT: Symbol('draw-mode-text'),
    WORD_BALLOON: Symbol('draw-mode-balloon'),
    IMAGE: Symbol('draw-mode-image')
}

export const DrawType = {
    NONE: Symbol('draw-type-none'),
    RECTANGLE: Symbol('draw-type-rectangle'),
    TEXT: Symbol('draw-type-text'),
    IMAGE: Symbol('draw-type-image')
}

/**
 * ショートカットキーとして利用するキーのキーコード
 */
export const KeyCode = {
    Key_R: 82, // R: 枠
    Key_T: 84, // T: テキスト
    Key_W: 87, // W: 吹き出し
    Key_I: 73, // I: 画像
    Key_M: 77, // M: 移動
    Key_D: 68, // D: 削除
    Key_C: 67, // C: キャンバスコピー
}

// メニューの幅 キャンバスの大きさを設定するときに利用
export const MENU_WIDTH = 160