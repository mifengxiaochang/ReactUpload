
const eventArg = [
    "handleBrowseFile",
    "readFileContent"
];

export default class ImportDoc extends React.Component {
    constructor(props) {
        super(props);
        for (let event of eventArg) {
            this[event] = this[event].bind(this);
        }
        this.state = {
            importFile: {name:''},
        }
    }

    handleBrowseFile(e, args) {
        this.fileControl.click();
    }

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
                            content: "Import Failed",
                        }
                    );
                };
                reader.onload =(re) =>{
                    self.state.importFile.name = file.name;
                    let buffers = new Uint8Array(re.target.result);
                    self.state.importFile.content = buffers; 
                };
            } catch (e) {
                let titleMsg =  "Warn";
                $$.toolkit_alert("show", {
                    title: titleMsg,
                    content: "Can't Import the file",
                    type: "e"
                });
            }
        }
    }

    getFileType(fileName) {
        if (fileName == void 0 || fileName == null) return;
        let
            index = fileName.lastIndexOf('.');
        return fileName.substring(index, fileName.length);
    };

    render() {
        return (
            <div>
                <label>"Import"</label>
                <input type='text' disabled={true} id="import-filename-text" style={{ marginLeft: 10, marginRight: 10 }}
                    value={this.state.importFile.name} />
                <input hidden type='file' accept='.json' onChange={this.readFileContent} ref={(ref) => { this.fileControl = ref }} />
                <input type="button" className="button button-default" id="browse-button" value={"Browser"}
                    onClick={this.handleBrowseFile} />
            </div>
        );
    }
}
