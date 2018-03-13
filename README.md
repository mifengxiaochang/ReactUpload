# ReactUpload
## 前台file阅读文件内容
 
    readFileContent(e) {
       let self = this;
       let file = e.target.files[0];
        if (file) {
            if (file.name.substring(file.name.lastIndexOf('.'), file.name.length) != ".json") {
                return;
            }
            try {
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onerror = () => {
                    $$.toolkit_alert("show",
                        {
                            type: "e",
                            content: "Upload error",
                        }
                    );
                };
                reader.onload =(re) =>{
                    self.state.importFile.name = file.name;
                    let buffers = new Uint8Array(re.target.result);
                    self.state.importFile.content = buffers;  //获取buffers
                };
            } catch (e) {
                $$.toolkit_alert("show", {
                    title: "Warn",
                    content: "Can't Import the file",
                    type: "e"
                });
            }
        }
    }
### 后台建立Model通过字典型接受转换完成文件存储

    GranularUpgradeDto upgradeDto = new GranularUpgradeDto();
    upgradeDto = upgradeFileDto.upgradeDto;
    upgradeDto.JsonFile = new byte[upgradeFileDto.fileData.Count];//Dictionary transfer byte[]
    for (int i = 0; i < upgradeFileDto.fileData.Count; i++)
    { 
      upgradeDto.JsonFile[i] = (byte)(upgradeFileDto.fileData[i]);   
    }    
