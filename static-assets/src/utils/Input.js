export default class Input {

    constructor() {
        this.container = document.getElementById('container');

        this.input = document.createElement('INPUT');
        this.input.className = 'input';

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";
    }

    onClick() {
        if(this.input.value.length > 3) {
            this.callback();
        }
    }

    getValue() {
        return this.input.value;
    }

    show(message, callback) {
        this.input.value = '';
        this.callback = callback;
        this.container.appendChild(this.input);
        this.container.appendChild(this.button);
        this.input.placeholder = message;
        this.input.focus();
    }

    hide() {
        this.container.removeChild(this.input);
        this.container.removeChild(this.button);
    }
}