var canvas, context, renderer, container;

window.onload = init;

function init() {
    container = document.createElement('div');
    container.className = 'screen-guide-container';

    window.addEventListener('resize', update);
    document.body.appendChild(container);

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

function update() {
    var text = '';

    text += 'Screen size: ' + screen.width + ' x ' +  screen.height + '\n';
    text += 'Window size: ' + window.innerWidth + ' x ' +  window.innerHeight + '\n';
    text += 'Renderer: ' + getRenderer() + '\n';
    text += 'Max Anisotropy: ' + getMaxAnisotropy() + '\n';
    text += 'devicePixelRatio: ' + window.devicePixelRatio + '\n';

    container.innerText = text;
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
