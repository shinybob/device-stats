const Input = require('./../utils/Input').default;
const Message = require('./../utils/Message').default;

export default class DeviceList {

    constructor() {
        this.headers= [
            {id:'delete', label:''},
            {id:'make', label:'make'},
            {id:'model', label:'model'},
            {id:'pixelRatio', label:'pixel ratio'},
            {id:'screenHeight', label:'screen height'},
            {id:'screenWidth', label:'screen width'},
            {id:'innerHeightLandscape', label:'innerWidth Landscape'},
            {id:'innerWidthLandscape', label:'innerWidth Landscape'},
            {id:'innerHeightPortrait', label:'innerHeight portrait'},
            {id:'innerWidthPortrait', label:'innerWidth portrait'},
            {id:'userAgent', label:'userAgent'},
        ];
    }

    show() {
        const container = document.createElement('div');
        container.id = 'container';
        container.className = 'table-container';

        this.resultsTable = document.createElement('TABLE');

        container.appendChild(this.resultsTable);
        document.body.appendChild(container);

        this.addHeaders();
        this.requestResults();
    }

    requestResults() {
        const callback = this.onResultsReceived.bind(this);
        const request = new XMLHttpRequest();
        const url = '/screenStats';

        request.open("GET", url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback(request);
            }
        };

        request.send();
    }

    onResultsReceived (request) {
        const results = JSON.parse(request.response);

        for(let data of results) {
            this.addResult(data);
        }
    }

    addHeaders () {
        const row = this.resultsTable.insertRow(-1);

        for(let key of this.headers) {
            const cell = row.insertCell(-1);
            cell.innerHTML = key.label;
            cell.className = "table-header";
        }
    }

    addResult (data) {
        const row = this.resultsTable.insertRow(-1);
        const deleteCallback = this.deleteEntry.bind(this);

        for(let key of this.headers) {
            const cell = row.insertCell(-1);
            if(key.id === 'delete') {
                cell.innerHTML = "x";
                cell.className = 'td-delete';
                cell.addEventListener('click', function() {
                    deleteCallback(data.cell_id, row.rowIndex);
                })
            } else {
                const value = data[key.id];
                cell.innerHTML = (value === undefined) ? "" : value;
            }
        }
    }

    deleteEntry(cell_id, rowIndex) {
        const callback = this.deleteEntryComplete.bind(this);
        const request = new XMLHttpRequest();
        const url = '/delete';

        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback(rowIndex);
            }
        };

        request.send(JSON.stringify({cell_id:cell_id}));
    }

    deleteEntryComplete(rowIndex) {
        this.resultsTable.deleteRow(rowIndex);
    }
}