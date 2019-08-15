({
    doInit : function(component, event, helper) {
        console.log('START: doInit');
        
        component.set("v.objImagesfiles1", []);
        component.set("v.objImagesfiles2", []);
        component.set("v.objImagesfiles3", []);
    },
    handleFilesChange : function(component, event, helper) {
        console.log('START: handleFilesChange');
        
        let filesselected = event.getSource().get("v.name");
        let files = event.getSource().get("v.files");        
        let objImages = component.get("v.objImages" + filesselected);
        //画像格納先となる配列をクリア
        objImages.length = 0;
        
        for(let i = 0; i < files.length; i++){
            let filereader = new FileReader();
            filereader.onload = function(evt) {
                let image = new Image();
                image.onload = function() {
                    console.log('START: image.onload');
                    
                    let ratio = image.width / image.height;
                    
                    let canvasthum = document.createElement('canvas');
                    if (ratio < 1) {
                        canvasthum.width = component.get("v.thumnailimagesize");
                        canvasthum.height = component.get("v.thumnailimagesize") * (1 / ratio);
                    } else {
                        canvasthum.width = component.get("v.thumnailimagesize") * ratio;
                        canvasthum.height = component.get("v.thumnailimagesize");
                    }
                    let ctxthum = canvasthum.getContext('2d');
                    ctxthum.drawImage(image, 0, 0, canvasthum.width, canvasthum.height);
                    
                    let canvasfull = document.createElement('canvas');
                    if (ratio < 1) {
                        canvasfull.width = component.get("v.fullimagesize");
                        canvasfull.height = component.get("v.fullimagesize") * (1 / ratio);
                    } else {
                        canvasfull.width = component.get("v.fullimagesize") * ratio;
                        canvasfull.height = component.get("v.fullimagesize");
                    }
                    let ctxfull = canvasfull.getContext('2d');
                    ctxfull.drawImage(image, 0, 0, canvasfull.width, canvasfull.height);
                    
                    objImages.push({
                        thumnail: canvasthum.toDataURL("image/jpeg"),
                        full: canvasfull.toDataURL("image/jpeg")
                    });
                    
                    component.set("v.objImages" + filesselected, objImages);
                }
                image.src = evt.target.result;
            }
            filereader.readAsDataURL(files[i]);
        }
        //選択した画像ファイル数を格納
        component.set("v.numOf" + filesselected, files.length);
    },
    handleCreateZipFile : function(component, event, helper) {
        console.log('START: handleCreateZipFile');
        
        let zip = new JSZip();
        
        //ラベル定義がからでなければフォルダを作成し画像をそれぞれファイルとして追加
        if(!$A.util.isEmpty(component.find("label1").get("v.value"))){
            for(let i = 0; i < component.get("v.objImagesfiles1").length; i++) {
                let img = zip.folder(component.find("label1").get("v.value"));
                img.file(component.find("label1").get("v.value") + '-' + i + '.jpg', component.get("v.objImagesfiles1")[i].full.split( "," )[1], {base64: true});
            }
        }
        
        if(!$A.util.isEmpty(component.find("label2").get("v.value"))){
            for(let j = 0; j < component.get("v.objImagesfiles2").length; j++) {
                let img = zip.folder(component.find("label2").get("v.value"));
                img.file(component.find("label2").get("v.value") + '-' + j + '.jpg', component.get("v.objImagesfiles2")[j].full.split( "," )[1], {base64: true});
            }
        }
        
        if(!$A.util.isEmpty(component.find("label3").get("v.value"))){
            for(let k = 0; k < component.get("v.objImagesfiles3").length; k++) {
                let img = zip.folder(component.find("label3").get("v.value"));
                img.file(component.find("label3").get("v.value") + '-' + k + '.jpg', component.get("v.objImagesfiles3")[k].full.split( "," )[1], {base64: true});
            }
        }
        
        //Zipファイルを生成。ファイル名には日時を使用
        let today = new Date();
        let filename = "dataset-" + today.getFullYear() + (today.getMonth()+1) + today.getDate() + "-" + today.getHours() + today.getMinutes() + today.getSeconds() + ".zip";
        zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, filename);
        });        
    }
})
