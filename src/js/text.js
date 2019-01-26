console.log('Module exported!');
console.info('Yo!!! webpack dev server');

class Person {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi, my name is ${this.name}`;
    }

    displayOptions(a, b) {
        return a + b;
    }
}

export default Person;
