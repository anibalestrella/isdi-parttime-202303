
// ISDI Coders > Programa FullStack Online Marzo'23 #28 (2023-04-27 19:04 GMT+2)
// cnsole.log('//// composito.js v0.1.');
// here's where the parsing of the DOM occurs to inject into the DOM

export class Component {
    constructor(templateOrElement) {
        if (typeof templateOrElement === 'string') {
            const doc = new DOMParser().parseFromString(templateOrElement, 'text/html')
// only inject inside the body of the DOMparser() cosntructor('new domparser()')
            this.container = doc.body.children[0]
        } else this.container = templateOrElement
    }

    add(...components) {
        components.forEach(component => this.container.appendChild(component.container))
    }
}