export default class Message {

    constructor() {
        this.container = document.getElementById('container');
        this.message = document.createElement('div');
        this.message.className = 'message';
    }

    show(message) {
        this.container.appendChild(this.message);
        this.message.innerText = message;
    }

    hide() {
        this.container.removeChild(this.message);
    }
}