const Menu = require('./components/Menu').default;
const DeviceList = require('./components/DeviceList').default;
const DeviceRecorder = require('./components/DeviceRecorder').default;
const FullScreenUtil = require('./utils/FullScreenUtil').default;
const ScreenGuide = require('./utils/ScreenGuide').default;

export default class Main {

    constructor() {
        this.createComponentContainer();
        this.screenGuide = new ScreenGuide();

        this.menu = new Menu(this);
        this.deviceList = new DeviceList(this);
        this.deviceRecorder = new DeviceRecorder(this);

        this.showMenu();
    }

    createComponentContainer() {
        this.container = document.createElement('div');
        this.container.id = 'container';
        this.container.className = 'container';
        document.body.appendChild(this.container);
    }

    showDeviceRecorder(event) {
        event.stopPropagation();
        this.emptyContainer();
        this.screenGuide.show();
        this.deviceRecorder.show();
    }

    showDeviceList() {
        FullScreenUtil.exitFullScreen();
        this.emptyContainer();
        this.deviceList.show();
        this.screenGuide.hide();
    }

    showMenu() {
        FullScreenUtil.exitFullScreen();
        this.emptyContainer();
        this.menu.show();
        this.screenGuide.hide();
    }

    emptyContainer() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}