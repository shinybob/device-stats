var canvas, context, renderer;

window.onload = init;

function init() {
    this.md = new MobileDetect(window.navigator.userAgent);

    this.container = document.createElement('div');

    this.header = document.createElement('div');
    this.resultField = document.createElement('div');
    this.deviceInput = document.createElement('input');
    this.additionalDataInput = document.createElement('input');
    this.submitButton = document.createElement('button');
    this.submitButton.name = 'Send!';
    this.submitButton.innerText = 'Send!';

    this.container.className = 'container';
    this.header.className = 'header';
    this.resultField.className = 'results';
    this.deviceInput.className = 'input';
    this.additionalDataInput.className = 'input';
    this.submitButton.className = 'button';
    this.deviceInput.placeholder = 'Device Name';
    this.additionalDataInput.placeholder = 'Additional Data';

    this.submitButton.addEventListener('click', this.onSubmitClicked.bind(this))

    this.deviceInput.id = 'deviceName';
    this.additionalDataInput.id = 'additionalData';
    this.submitButton.id = 'submitButton';

    header.innerText = "Device Stats";

    container.appendChild(header);
    container.appendChild(deviceInput);
    container.appendChild(additionalDataInput);
    container.appendChild(submitButton);
    container.appendChild(resultField);

    window.addEventListener('resize', update);

    document.body.appendChild(this.container);

    canvas = document.createElement('canvas');

    if (canvas) {
        context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (context) {
            let info = context.getExtension('WEBGL_debug_renderer_info');
            if (info) {
                renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
            }
        }
    }

    update();
}

function onSubmitClicked() {
    let deviceData = {
        deviceName:this.deviceInput.value,
        additionalData:this.additionalDataInput.value,
        height:(screen.width >= screen.height) ? screen.width : screen.height,
        width:(screen.width < screen.height) ? screen.width : screen.height,
        renderer:getRenderer(),
        maxAnisotropy:getMaxAnisotropy(),
        devicePixelRatio:window.devicePixelRatio,
    }

    let callback = this.onSubmitionComplete.bind(this);
    let request = new XMLHttpRequest();

    request.open('POST', '/addDevice', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(request);
        }
    };

    request.send(JSON.stringify(deviceData));

    console.log('onSubmitClicked');
    console.log(deviceData);
}

function onSubmitionComplete(request) {
    console.log(request);
}

function update() {
    var text = '';

    text += 'Screen size: ' + screen.width + ' x ' +  screen.height + '\n';
    text += 'Window size: ' + window.innerWidth + ' x ' +  window.innerHeight + '\n';
    text += 'Renderer: ' + getRenderer() + '\n';
    text += 'Max Anisotropy: ' + getMaxAnisotropy() + '\n';
    text += 'devicePixelRatio: ' + window.devicePixelRatio + '\n';
    text += 'MobileDetect.mobile: ' + md.mobile() + '\n';
    text += 'MobileDetect.phone: ' + md.phone() + '\n';
    text += 'MobileDetect.webkit: ' + md.version('Webkit') + '\n';
    text += 'MobileDetect.build: ' + md.versionStr('Build') + '\n';
    text += 'Modernizr.batteryapi: ' + Modernizr.batteryapi + '\n';
    text += 'Modernizr.ambientlight: ' + Modernizr.ambientlight + '\n';
    text += 'Modernizr.fullscreen: ' + Modernizr.fullscreen + '\n';

    text += 'userAgent: ' + window.navigator.userAgent + '\n';

    this.resultField.innerText = text;
}

function getRenderer() {
    return renderer || 'unknown';
}

function getMaxAnisotropy() {
    let max = 0;

    if (context) {
        let extension = (
            context.getExtension('EXT_texture_filter_anisotropic') ||
            context.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
            context.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
        );

        if (extension) {
            max = context.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        }
    }

    return max;
}
