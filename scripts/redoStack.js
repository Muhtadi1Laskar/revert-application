class Node {
    constructor(value) {
        this.timeStamp = new Date();
        this.value = value;
        this.next = null;
    }
}

export class Stack {
    constructor() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }

    isEmpty() {
        return !this.head;
    }

    preAppend(value) {
        const newNode = new Node(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = this.head;
            this.length += 1;
            return;
        }

        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        const lastItem = this.head;

        this.head = this.head.next;
        this.length--;

        return lastItem;
    }

    getData() {
        // const array = [];

        // if(this.isEmpty()) {
        //     return 'The stack is empty';
        // }
        // let currentNode = this.head;
        // let idx = 1;

        // while(currentNode) {
        //     array.push({
        //         time: currentNode.timeStamp,
        //         value: currentNode.value,
        //         index: idx
        //     });
        //     idx += 1;
        //     currentNode = currentNode.next;
        // }
        // return array;
        if(this.isEmpty()) {
            return null;
        }
        return {
            timeStamp: this.head.timeStamp,
            value: this.head.value,
            index: this.length
        };
    }

    print() {
        const array = [];

        if (this.isEmpty()) {
            return "The stack is empty";
        }
        let currentNode = this.head;

        while (currentNode) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    clear() {
        this.head = null;
        this.tail = this.head;
        this.length = 0;
    }
}

// const stack = new Stack();

// stack.preAppend('This is a document');
// stack.preAppend('This is another document');
// stack.preAppend('The quick brown fox jumped over the lazy dog');
// stack.preAppend("print('Hello World')");
// stack.preAppend('Computer Architecture');

// console.log(stack.print());

// stack.pop();
// stack.pop();
// stack.pop();

// console.log(stack.print());