class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
        this.tail = null;
    }

    push = (value) => {
        /** 
         * if List is empty => point head & tail to node => next -> null , prev -> null
         * if List is !empty => newnode.prev = tail=> tail.next= newnode => tail = newnode
         */
        let newNode = {
            value: value,
            next: null,
            prev: null
        }
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode
        }
        this.length++;
        return newNode;
    }


    pop = () => {
        //pop / remove last el from linked list
        //update tail to second last, return last node
        let poppedNode = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.length--;
        poppedNode.prev = null;
        return poppedNode;
    }

    peek = (index) => {
        //return an element at an index
        let currentNode = this.head;
        //increment nodepointer till index 
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}

export default DoublyLinkedList;