var canvas, context, renderer;

window.onload = init;

function init() {
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

    this.logMessage('init 2');

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
            var info = context.getExtension('WEBGL_debug_renderer_info');
            if (info) {
                renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
            }
        }
    }

    this.logMessage('init 3');

    update();
}

function onSubmitClicked() {
    this.logMessage('onSubmitClicked 2');
    var deviceData = {
        deviceName:this.deviceInput.value,
        additionalData:this.additionalDataInput.value,
        height:(screen.width >= screen.height) ? screen.width : screen.height,
        width:(screen.width < screen.height) ? screen.width : screen.height,
        renderer:getRenderer(),
        maxAnisotropy:getMaxAnisotropy(),
        devicePixelRatio:window.devicePixelRatio,
    }

    var callback = this.onSubmitionComplete.bind(this);
    var request = new XMLHttpRequest();

    request.open('POST', '/addDevice', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(request);
        }
    };

//     request.send(JSON.stringify(deviceData));

//     console.log('onSubmitClicked');
//     console.log(deviceData);

//     this.container.innerHTML = "Thank you!<br><br><a href='" + window.location + "getDeviceList'>Click here to view device list.</a>"
}

function logMessage(message) {
    var field = document.getElementById("log")
    field.innerText = message + "\n" + field.innerText;
}

function onSubmitionComplete(request) {
    console.log(request);
}

function update() {
    this.logMessage('update 1');
    var text = '';

    text += 'Screen size: ' + screen.width + ' x ' +  screen.height + '\n';
    text += 'Window size: ' + window.innerWidth + ' x ' +  window.innerHeight + '\n';
    text += 'Renderer: ' + getRenderer() + '\n';
    text += 'Max Anisotropy: ' + getMaxAnisotropy() + '\n';
    text += 'devicePixelRatio: ' + window.devicePixelRatio + '\n';
    text += 'userAgent: ' + window.navigator.userAgent + '\n';

    this.resultField.innerText = text;

    this.logMessage('update 2');
}

function getRenderer() {
    return renderer || 'unknown';
}

function getMaxAnisotropy() {
    var max = 0;

    if (context) {
        var extension = (
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
