const Input = require('./../utils/Input').default;
const Message = require('./../utils/Message').default;

export default class DeviceRecorder {

    constructor(controller) {
        this.controller = controller;
    }

    show() {
        const container = document.createElement('div');
        container.id = 'container';
        container.className = 'container';
        document.body.appendChild(container);

        this.stats = {
            make:'',
            model:'',
            innerWidthPortrait:0,
            innerHeightPortrait:0,
            innerWidthLandscape:0,
            innerHeightLandscape:0,
            screenWidth:screen.width,
            screenHeight:screen.height,
            pixelRatio:window.devicePixelRatio,
            userAgent:navigator.userAgent
        };

        this.input = new Input();
        this.message = new Message();
        this.message.show('Tap Screen');

        this.onClickCallback = this.onClick.bind(this);
        document.addEventListener('click', this.onClickCallback);
    }

    onClick() {
        window.onresize = this.onResize.bind(this);
        this.enterFullScreen(document.documentElement);
        this.message.show('Rotate The Device');
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
            window.onresize = null;
            document.removeEventListener('click', this.onClickCallback);
            this.showMake()
        }
    }

    showMake() {
        this.message.hide();
        this.input.show('Type device make', this.showModel.bind(this));
    }

    showModel() {
        this.stats.make = this.input.getValue();
        this.input.show('Type device model', this.submit.bind(this));
    }

    submit() {
        this.stats.model = this.input.getValue();
        this.input.hide();
        this.message.show('Submitting device stats...');

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
        this.message.show('Values submitted!');
        setTimeout(this.controller.showMenu.bind(this.controller), 3000);
    }

    enterFullScreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}