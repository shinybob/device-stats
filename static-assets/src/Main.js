const Menu = require('./components/Menu').default;
const DeviceList = require('./components/DeviceList').default;
const DeviceRecorder = require('./components/DeviceRecorder').default;
const FullScreenUtil = require('./utils/FullScreenUtil').default;
const ScreenGuide = require('./utils/ScreenGuide').default;

export default class Main {

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'screen-guide-container';
        this.updateCallback = this.update.bind(this);

        this.show();
    }

    show() {
        window.addEventListener('resize', this.updateCallback);
        document.body.appendChild(this.container);
        this.update();
    }

    update() {
        let text = '';

        text += 'Screen size: ' + screen.width + ' x ' +  screen.height + '\n';
        text += 'Window size: ' + window.innerWidth + ' x ' +  window.innerHeight + '\n';
        
        this.container.innerText = text;
    }
}