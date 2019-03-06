var container;

window.onload = init;

function init() {
    container = document.createElement('div');
    container.className = 'screen-guide-container';

    window.addEventListener('resize', update);
    document.body.appendChild(container);
    update();
}

function update() {
    var text = '';

    text += 'Screen size: ' + screen.width + ' x ' +  screen.height + '\n';
    text += 'Window size: ' + window.innerWidth + ' x ' +  window.innerHeight + '\n';

    container.innerText = text;
}