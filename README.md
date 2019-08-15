# einsteinvision-datasetcreator
Einstein Vision で ImageClassification のモデル作成に使用する学習用の画像データを集めた Zip ファイルの生成支援 Aura Component のソースです。
次の制約はありますが、学習用画像データを集めた Zip ファイルを簡単に作成することができます。(元々は子ども向けの画像認識器をつくるワークショップのために作成したもの)

- ラベルは3つまで
- 画像サイズはすべて縦横最大448pxになるように補正

次の外部ライブラリが必要です。"EPSDatasetCreatorLibs"という名前で静的リソースに登録します。

- JSZip(jszip.min.js)
- FileSaver(FileSaver.min.zip)
