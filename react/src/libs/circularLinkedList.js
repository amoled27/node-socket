class circularLinkedlist {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    push = (value) => {
        let newNode = {
            value: value,
            next: null
        }
        if (this.length > 0) {
            // iterating till the length - 1 from 0 
            let currentNode = this.head;
            for (let i = 0; i < this.length - 1; i++) {
                currentNode = currentNode.next
            }
            currentNode.next = newNode;
            newNode.next = this.head;
        } else {
            this.head = newNode;
            newNode.next = this.head;
        }
        this.length++;
        return newNode;
    }

    pop = () => {
        let currentNode = this.head;
        let index = this.length - 1;
        //iterating till 2nd last node in a list
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        //updating pointer of the secondlast
        let popNode = currentNode.next;
        currentNode.next = this.head;
        this.length--;
        return popNode;
    }

    peek = (index) => {
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}
export default circularLinkedlist;