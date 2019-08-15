# Einstein Vision - データセット作成支援ツール
Einstein Vision で ImageClassification のモデル作成に使用する学習用の画像データを集めた Zip ファイルの生成支援 Aura Component のソースです。

![スクリーンショット](https://github.com/hinabasfdc/einsteinvision-datasetcreator/blob/master/EPS_DatasetCreator_ScreenShot.jpg)

次の制約はありますが、学習用画像データを集めた Zip ファイルを簡単に作成することができます。(元々は子ども向けの画像認識器をつくるワークショップのために作成したものです)
- ラベルは3つまで
- 画像サイズはすべて縦横最大448pxになるように補正

次の外部ライブラリが必要です。"EPSDatasetCreatorLibs"という名前で静的リソースに登録します。

- JSZip(jszip.min.js)
- FileSaver(FileSaver.min.zip)

開発時に使ったバージョンのライブラリをまとめた Zip ファイルはレポジトリに登録してありますのでご活用ください。
