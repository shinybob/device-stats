window.onload = init;

function init() {
    document.getElementById('fullScreen').addEventListener("click", this.goFullScreen.bind(this));

    window.onresize = update;
    document.getElementById('server').onChange = update;

    update();
}

function goFullScreen() {
    launchIntoFullscreen(document.documentElement);
}

function launchIntoFullscreen(element) {
    document.getElementById('fullScreen').disabled = true;

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

function update() {
    // Always portrait
    document.getElementById('screenWidth').value = Math.min(screen.height, screen.width);
    document.getElementById('screenHeight').value = Math.max(screen.height, screen.width);

    if(window.innerHeight > window.innerWidth) {
        document.getElementById('innerWidthPortrait').value = window.innerWidth;
        document.getElementById('innerHeightPortrait').value = window.innerHeight;
    } else {
        document.getElementById('innerWidthLandscape').value = window.innerWidth;
        document.getElementById('innerHeightLandscape').value = window.innerHeight;
    }

    document.getElementById('devicePixelRatio').value = window.devicePixelRatio;
    document.getElementById('userAgent').value = navigator.userAgent;

    if(
        document.getElementById('innerHeightLandscape').value.length > 0 &&
        document.getElementById('innerHeightPortrait').value.length > 0 &&
        document.getElementById('deviceName').value.length > 0 &&
        document.getElementById('manufacturer').value.length > 0 &&
        document.getElementById('fullScreen').disabled === true) {
            document.getElementById('submit').disabled = false;
    }
}