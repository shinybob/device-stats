export default class Menu {

    constructor(controller) {
        this.controller = controller;
    }

    show() {
        const container = document.createElement('div');
        container.id = 'container';
        container.className = 'container';

        const deviceRecorderButton = document.createElement('div');
        deviceRecorderButton.innerText = "Add New Device";
        deviceRecorderButton.className = "button";
        deviceRecorderButton.addEventListener('click', this.controller.showDeviceRecorder.bind(this.controller));

        const deviceListButton = document.createElement('div');
        deviceListButton.innerText = "Device List";
        deviceListButton.className = "button";
        deviceListButton.addEventListener('click', this.controller.showDeviceList.bind(this.controller));

        container.appendChild(deviceRecorderButton);
        container.appendChild(deviceListButton);
        document.body.appendChild(container);
    }
}