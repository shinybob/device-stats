const ConfirmationWindow = require('./../utils/ConfirmationWindow').default;

export default class DeviceList {

    constructor(controller) {
        this.sortType = 1;
        this.controller = controller;
        this.confirmationWindow = new ConfirmationWindow();
        this.tableHeaders= [
            {id:'delete', label:'', width:'20px', style:1},
            {id:'active', label:'active', width:'80px', style:1},
            {id:'make', label:'make', width:'100px', style:1},
            {id:'model', label:'model', width:'100px', style:1},
            {id:'pixelRatio', label:'pixel ratio', width:'60px', style:1},
            {id:'screenWidth', label:'screen width', width:'60px', style:2},
            {id:'screenHeight', label:'screen height', width:'60px', style:2},
            {id:'innerWidthPortrait', label:'portrait width', width:'60px', style:1},
            {id:'innerHeightPortrait', label:'portrait height', width:'60px', style:1},
            {id:'browserUIPortrait', label:'portrait browserUI', width:'60px', style:1},
            {id:'innerWidthLandscape', label:'landscape width', width:'60px', style:2},
            {id:'innerHeightLandscape', label:'landscape height', width:'60px', style:2},
            {id:'browserUILandscape', label:'landscape browserUI', width:'60px', style:2},
            {id:'browser', label:'browser', width:'60px', style:1},
            {id:'browserVersion', label:'browser version', width:'60px', style:1},
            {id:'layout', label:'layout', width:'60px', style:1},
            {id:'deviceType', label:'device type', width:'60px', style:2},
            {id:'os', label:'os family', width:'60px', style:2},
            {id:'osVersion', label:'os version', width:'60px', style:2},
            {id:'desc', label:'desc', width:'150px', style:1},
            {id:'userAgent', label:'userAgent', width:'1000px', style:1},
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
            if(key.style === 1) {
                cell.className = "table-header table-header-1";
            } else {
                cell.className = "table-header table-header-2";
            }
            cell.addEventListener("click", this.sort.bind(this, key));
        }
    }

    sort(key) {
        for(let i = this.resultsTable.rows.length - 1; i > 0; i--) {
            this.resultsTable.deleteRow(i);
        }

        this.sortType = -this.sortType;
        var st = this.sortType;

        this.results.sort(
                function(a, b){
                    let vala = a[key];
                    let valb = b[key];

                    vala = (vala === undefined) ? "" : vala;
                    valb = (valb === undefined) ? "" : valb;

                    if (vala instanceof Object) {
                        vala = JSON.stringify(vala);
                    }
                    if (valb instanceof Object) {
                        valb = JSON.stringify(valb);
                    }

                    vala = vala.toString();
                    valb = valb.toString();

                    if(vala > valb) {
                        return st;
                    } else {
                        return -st;
                    }
                });

        this.updateResults(this.results);
    };

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
        this.results = JSON.parse(request.response);
        this.updateResults(this.results);
    }

    updateResults (results) {
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
        this.confirmationWindow.show('Are you sure you want to delete this device?', this.deleteEntry.bind(this), properties);
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