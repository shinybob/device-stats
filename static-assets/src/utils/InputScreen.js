export default class InputScreen {

    constructor() {
        this.container = document.getElementById('container');

        this.button = document.createElement('BUTTON');
        this.button.addEventListener("click", this.onClick.bind(this));
        this.button.className = 'button';
        this.button.innerText = "Next";

        const button = this.button;

        this.input = document.createElement('INPUT');
        this.input.className = 'input';
        this.input.addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode === 13) {
                    button.click();
                }
            });
    }

    onClick() {
        if(this.input.value.length > 1) {
            this.callback();
        }
    }

    getValue() {
        return this.input.value;
    }

    show(message, callback, value) {
        this.input.value = value || '';
        this.callback = callback;
        this.container.appendChild(this.input);
        this.container.appendChild(this.button);
        this.input.placeholder = message;
        this.input.focus();
    }
}