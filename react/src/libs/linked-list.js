
class LinkedList {
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

            this.tail.next = newNode;
            this.tail = this.tail.next;

        } else {
            this.head = newNode;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }

    pop = () => {
        let currentNode = this.head;
        let prevNode;
        //itertate till next of node is null, i.e last node
        while (this.currentNode.next !== null) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        //make prev node the last node and update tail value
        prevNode.next = null;
        this.tail = prevNode;
        this.length--;
        return currentNode;
    }

    peek = (index) => {
        let currentNode = this.head;
        //iterate the current node pointer till index
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    deleteAtindex = (index) => {
        //if index >= length
        if (index >= this.length) {
            return null;
        }

        //index == 0;
        if (index === 0) {
            let deletedNode = this.head;
            if (this.head) {
                this.head = this.head.next;
            }
            this.length--; 
            return deletedNode;
        }

        //index = length - 1
        if (index === this.length - 1) {
            return this.pop();
        }

        let currentNode = this.head;
        let prevNode = {};

        for (let i = 0; i <= index; i++) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        //delete a node
        let deletedNode = currentNode;
        if (prevNode) {
            prevNode.next = currentNode.next;
        }
        deletedNode.next = null;
        this.length--;
        if (index === this.length - 1) {
            this.tail = prevNode;
        }
        return deletedNode;
    }
}

export default LinkedList;