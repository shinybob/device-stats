const Menu = require('./components/Menu').default;
const DeviceList = require('./components/DeviceList').default;
const Header = require('./components/Header').default;
const DeviceRecorder = require('./components/DeviceRecorder').default;
const FullScreenUtil = require('./utils/FullScreenUtil').default;

export default class Controller {

    constructor() {
        this.menu = new Menu(this);
        this.deviceRecorder = new DeviceRecorder(this);
        this.deviceList = new DeviceList(this);
        this.header = new Header(this);

        this.showMenu();
    }

    showDeviceRecorder() {
        this.hideAll();
        this.deviceRecorder.show();
    }

    showDeviceList() {
        this.hideAll();
        this.header.show('Device List', true);
        this.deviceList.show();
    }

    showMenu() {
        FullScreenUtil.isFullScreen()
        FullScreenUtil.exitFullScreen();
        FullScreenUtil.isFullScreen()
        this.hideAll();
        this.header.show('Device Monkey', false);
        this.menu.show();
    }

    hideAll() {
        var node = document.body;

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}