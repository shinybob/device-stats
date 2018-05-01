export default class Header {

    constructor(controller) {
        this.controller = controller;
    }

    show(headerText, showButton) {
        const container = document.createElement('div');
        container.className = 'header-container';

        const title = document.createElement('div');
        title.innerText = headerText;
        title.className = "header-text";

        if(showButton === true) {
            const backButton = document.createElement('div');
            backButton.innerText = "Back";
            backButton.className = "header-back";
            backButton.addEventListener('click', this.controller.showMenu.bind(this.controller));
            container.appendChild(backButton);
        }

        container.appendChild(title);
        document.body.appendChild(container);
    }
}