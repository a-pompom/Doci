/**
 * コード内で利用するCSSクラスを規定
 * JSでCSSを操作するとスタイルが管理しづらくなるので、利用するクラスをConstに集約
 * 
 * invisible: 要素を隠す
 * visible: 要素を表示
 * active-stack: 現在描画中のスタック
 * active-menu: 現在有効なメニュー要素
 */
export const CSS_Class = {
    INVISIBLE: 'invisible',
    VISIBLE: 'visible',
    ACTIVE_STACK: 'active-stack',
    ACTIVE_MENU: 'active-menu',
}