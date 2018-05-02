const FullScreenUtil = require('./FullScreenUtil').default;

export default class ScreenGuide {

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'screen-guide-container';

        this.windowSize = document.createElement('div');
        this.windowSize.className = 'screen-guide';

        const topLeft = document.createElement('div');
        topLeft.className = 'guide-dot top-left';

        const topRight = document.createElement('div');
        topRight.className = 'guide-dot top-right';

        const bottomLeft = document.createElement('div');
        bottomLeft.className = 'guide-dot bottom-left';

        const bottomRight = document.createElement('div');
        bottomRight.className = 'guide-dot bottom-right';

        this.container.appendChild(this.windowSize);
        this.container.appendChild(topLeft);
        this.container.appendChild(topRight);
        this.container.appendChild(bottomLeft);
        this.container.appendChild(bottomRight);

        this.updateCallback = this.update.bind(this);
    }

    show() {
        window.addEventListener('resize', this.updateCallback);
        document.body.appendChild(this.container);
        this.update();
    }

    hide() {
        window.removeEventListener('resize', this.updateCallback);
        if(document.body.contains(this.container)) {
            document.body.removeChild(this.container);
        }
    }

    update() {
        this.windowSize.innerText = window.innerWidth + ' x ' +  window.innerHeight;
    }
}