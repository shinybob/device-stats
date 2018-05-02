export default class MessageScreen {

    constructor() {
        this.container = document.getElementById('container');

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";

        this.message = document.createElement('div');
        this.message.className = 'message';
    }

    onClick() {
        this.callback();
    }

    show(message, callback) {
        this.container.appendChild(this.message);

        if(callback) {
            this.callback = callback;
            this.container.appendChild(this.button);
        }

        this.message.innerText = message;
    }
}