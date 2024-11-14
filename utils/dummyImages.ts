// 画像の読み込みエラー時に呼び出されるメソッド
export const onUserIconError = (event: Event) => {
  const element = event.target as HTMLImageElement
  if (element != null) {
    element.src = '/img/ic-dummyUserIcon.png' // `public`ディレクトリ内の代替画像のパスを指定
  }
}
