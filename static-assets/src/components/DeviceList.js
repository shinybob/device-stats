const ConfirmationWindow = require('./../utils/ConfirmationWindow').default;

export default class DeviceList {

    constructor(controller) {
        this.controller = controller;
        this.confirmationWindow = new ConfirmationWindow();
        this.tableHeaders= [
            {id:'delete', label:'D', width:'20px'},
            {id:'active', label:'active', width:'80px'},
            {id:'make', label:'make', width:'100px'},
            {id:'model', label:'model', width:'100px'},
            {id:'pixelRatio', label:'pixel ratio', width:'60px'},
            {id:'screenHeight', label:'screen height', width:'60px'},
            {id:'screenWidth', label:'screen width', width:'60px'},
            {id:'innerWidthLandscape', label:'Landscape width', width:'60px'},
            {id:'innerHeightLandscape', label:'Landscape height', width:'60px'},
            {id:'innerWidthPortrait', label:'portrait width', width:'60px'},
            {id:'innerHeightPortrait', label:'portrait height', width:'60px'},
            {id:'browser', label:'browser', width:'60px'},
            {id:'browserVersion', label:'browser version', width:'60px'},
            {id:'deviceType', label:'device type', width:'60px'},
            {id:'layout', label:'layout', width:'60px'},
            {id:'os', label:'os', width:'60px'},
            {id:'desc', label:'desc', width:'1000px'},
            {id:'userAgent', label:'userAgent', width:'1000px'},
        ];

        this.matcheValues = [
            {id:'innerWidthLandscape', match:'screenHeight'},
            {id:'innerHeightLandscape', match:'screenWidth'},
            {id:'innerWidthPortrait', match:'screenWidth'},
            {id:'innerHeightPortrait', match:'screenHeight'}
        ]
    }

    show() {
        this.resultsTable = document.createElement('TABLE');

        const container = document.getElementById('container');

        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container';
        tableContainer.appendChild(this.resultsTable);

        const header = document.createElement('div');
        header.className = 'header';
        header.innerText = 'Device List';

        this.status = document.createElement('div');
        this.status.className = 'status';
        this.status.innerText = 'Up to date';

        const backButton = document.createElement('div');
        backButton.innerText = "Back";
        backButton.className = "back-button";
        backButton.addEventListener('click', this.controller.showMenu.bind(this.controller));

        container.appendChild(this.status);
        container.appendChild(backButton);
        container.appendChild(header);
        container.appendChild(tableContainer);

        this.addTableHeaders();
        this.requestResults();
    }

    addTableHeaders () {
        const row = this.resultsTable.insertRow(-1);

        for(let key of this.tableHeaders) {
            const cell = row.insertCell(-1);
            cell.innerHTML = key.label;
            cell.className = "table-header";
        }
    }

    requestResults() {
        const callback = this.onResultsReceived.bind(this);
        const request = new XMLHttpRequest();
        const url = '/deviceList';

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

    addResult (data) {
        const row = this.resultsTable.insertRow(-1);
        const deleteCallback = this.deleteEntryPrompt.bind(this);
        const activeCallback = this.toggleActive.bind(this);
        const updateCallback = this.updateEntry.bind(this);

        for(let key of this.tableHeaders) {
            const cell = row.insertCell(-1);
            cell.style.width = key.width;

            if(key.id === 'delete') {
                cell.innerHTML = "x";
                cell.className = 'td-delete';
                cell.addEventListener('click', function(event) {
                    event.stopPropagation();
                    deleteCallback(data.cell_id, row.rowIndex);
                })
            } else if(key.id === 'active') {
                const isActive = data[key.id] || false;
                if(isActive) {
                    cell.className = 'td-active-true';
                } else {
                    cell.className = 'td-active-false';
                }

                cell.innerHTML = isActive;
                cell.addEventListener('click', function() {
                    activeCallback(cell, data);
                })
            } else {
                const value = data[key.id];
                var field = document.createElement("input");
                field.addEventListener('change', function() {
                    updateCallback(cell, data, key.id, event.target.value)
                });
                field.className = 'cell-input';
                cell.appendChild(field);

                for(var match of this.matcheValues) {
                    if(key.id === match.id) {
                        const valueToMatch = data[match.match];

                        if(value !== valueToMatch) {
                            cell.className = 'td-warning';
                        }
                    }
                }

                field.value = (value === undefined) ? "" : value;
                field.style.width = key.width;
            }
        }
    }

    toggleActive(cell, data) {
        data.active = !data.active || false;

        cell.innerText = data.active;

        if(data.active) {
            cell.className = 'td-active-true';
        } else {
            cell.className = 'td-active-false';
        }

        this.updateEntry(cell, data);
    }

    deleteEntryPrompt(cell_id, rowIndex) {
        const properties = {cell_id:cell_id, rowIndex:rowIndex};
        this.confirmationWindow.show(this.deleteEntry.bind(this), properties);
    }

    deleteEntry(properties) {
        const callback = this.deleteEntryComplete.bind(this);
        const request = new XMLHttpRequest();
        const url = '/delete';

        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback(properties.rowIndex);
            }
        };

        request.send(JSON.stringify({cell_id:properties.cell_id}));
    }

    deleteEntryComplete(rowIndex) {
        this.resultsTable.deleteRow(rowIndex);
    }

    updateEntry(cell, data, id, newValue) {
        this.status.innerText = 'Saving...';

        data[id] = newValue;
        const callback = this.updateEntryComplete.bind(this);
        const request = new XMLHttpRequest();
        const url = '/update';

        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback(cell, data);
            }
        };

        request.send(JSON.stringify({data}));
    }

    updateEntryComplete(cell, data) {
        this.status.innerText = 'Up to date';
    }
}