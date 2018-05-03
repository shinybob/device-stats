export default class ConfirmationWindow {

    constructor() {

    }

    show(message, confirmCallback, data) {
        this.data = data;
        this.confirmCallback = confirmCallback;

        this.container = document.createElement('container');
        this.container.className = 'confirmation-window';


        const header = document.createElement('div');
        header.className = 'header';
        header.innerText = message;

        const yesButton = document.createElement('div');
        yesButton.innerText = "Yes";
        yesButton.className = "button";
        yesButton.addEventListener('click', this.onYes.bind(this));

        const cancelButton = document.createElement('div');
        cancelButton.innerText = "Cancel";
        cancelButton.className = "button";
        cancelButton.addEventListener('click', this.onCancel.bind(this));

        this.container.appendChild(header);
        this.container.appendChild(yesButton);
        this.container.appendChild(cancelButton);
        document.body.appendChild(this.container);
    }

    onYes() {
        this.confirmCallback(this.data);
        this.close();
    }

    onCancel() {
        this.close();
    }

    close() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }

        document.body.removeChild(this.container);
    }
}