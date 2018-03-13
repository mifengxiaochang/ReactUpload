
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
                            content: I18N.get("Common.Gui", "ControlPanel.Gui_b67aa7f5-b452-47e2-a8ff-5079286d8497"),
                        }
                    );
                };
                reader.onload =(re) =>{
                    self.state.importFile.name = file.name;
                    let buffers = new Uint8Array(re.target.result);
                    self.state.importFile.content = buffers;   
                    //self.state.importFile.type = self.getFileType(file.name);                    
                    //self.props.getFile('importFile', self.state.importFile);
                    
                    self.props.getFile('importFile', self.state.importFile);
                    self.props.changeNextEnabled(true);
                };
            } catch (e) {
                let titleMsg =  I18N.get("Common.Gui", "ControlPanel.Gui_DocAve");
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
                <label>{I18N.get('Common.Gui', 'ControlPanel.Gui_d7334efb-ddee-463a-8125-4e72e749f091')}</label>
                <input type='text' disabled={true} id="cp-datamanager-import-filename-text" style={{ marginLeft: 10, marginRight: 10 }}
                    value={this.state.importFile.name} />
                <input hidden type='file' accept='.json' onChange={this.readFileContent} ref={(ref) => { this.fileControl = ref }} />
                <input type="button" className="button button-default" id="cp-datamanager-import-browse-button" value={I18N.get('Common.Gui', 'ControlPanel.Gui_Browse')}
                    onClick={this.handleBrowseFile} />
            </div>
        );
    }
}