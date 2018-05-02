const InputScreen = require('./../utils/InputScreen').default;
const MessageScreen = require('./../utils/MessageScreen').default;
const FullScreenUtil = require('./../utils/FullScreenUtil').default;

export default class DeviceRecorder {

    constructor(controller) {
        this.controller = controller;
    }

    show() {
        this.container = document.getElementById('container');

        this.stats = {
            make:'',
            model:'',
            innerWidthPortrait:0,
            innerHeightPortrait:0,
            innerWidthLandscape:0,
            innerHeightLandscape:0,
            screenWidth:Math.min(screen.width, screen.height),
            screenHeight:Math.max(screen.width, screen.height),
            pixelRatio:window.devicePixelRatio,
            userAgent:navigator.userAgent
        };

        this.inputScreen = new InputScreen();
        this.messageScreen = new MessageScreen();
        this.messageScreen.show('Tap Screen');

        this.resizeCallback = this.onResize.bind(this);
        this.fullScreenCallback = this.enterFullScreen.bind(this);
        this.container.addEventListener('click', this.fullScreenCallback);

        this.showMake();
    }

    enterFullScreen() {
        this.container.removeEventListener('click', this.fullScreenCallback);
        window.addEventListener('resize', this.resizeCallback);
        // FullScreenUtil.enterFullScreen();
        this.messageScreen.show('Rotate The Device');
    }

    onResize() {
        this.orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
        this.updateStats();
        this.checkStats();
    }

    updateStats() {
        if(this.orientation === 'landscape') {
            this.stats.innerWidthLandscape = Math.max(window.innerWidth, this.stats.innerWidthLandscape);
            this.stats.innerHeightLandscape = Math.max(window.innerHeight, this.stats.innerHeightLandscape);
        } else {
            this.stats.innerWidthPortrait = Math.max(window.innerWidth, this.stats.innerWidthPortrait);
            this.stats.innerHeightPortrait = Math.max(window.innerHeight, this.stats.innerHeightPortrait);
        }
    }

    checkStats() {
        let done = false;

        if( this.stats.innerWidthLandscape > 0 &&
            this.stats.innerHeightLandscape > 0 &&
            this.stats.innerWidthPortrait > 0 &&
            this.stats.innerHeightPortrait > 0 &&
            this.stats.innerWidthLandscape > this.stats.innerHeightLandscape  &&
            this.stats.innerWidthPortrait < this.stats.innerHeightPortrait ) {
            done = true;
        }

        if(done) {
            window.removeEventListener('resize', this.resizeCallback);
            this.showMake();
        }
    }

    showMake() {
        this.controller.emptyContainer();
        this.inputScreen.show('Make', this.showModel.bind(this));
    }

    showModel() {
        this.controller.emptyContainer();
        this.stats.make = this.inputScreen.getValue();
        this.inputScreen.show('Model', this.submit.bind(this));
    }

    submit() {
        this.stats.model = this.inputScreen.getValue();
        this.controller.emptyContainer();
        this.messageScreen.show('Submitting device stats...');

        const callback = this.onSubmitSuccefull.bind(this);
        const request = new XMLHttpRequest();
        const url = '/screenStats';

        request.open("POST", url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                callback();
            }
        };

        request.send(JSON.stringify(this.stats));
    }

    onSubmitSuccefull() {
        this.messageScreen.show('Values submitted!');
        setTimeout(this.controller.showMenu.bind(this.controller), 3000);
    }
}