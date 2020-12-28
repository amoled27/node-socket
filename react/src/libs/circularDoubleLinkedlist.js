class CircularDoubleLinkedlist {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    push = (value) => {
        let newNode = {
            value: value,
            next: null,
            prev: null
        }
        if (this.length > 0) {
            let currentNode = this.head;
            /*since we do current node = head, the pointer is already on 1st node will jump to 2nd on 1st iteration
            hence start loop from 1 for ease | same logic for all FOR loop iterations*/
            for (let i = 1; i < this.length; i++) {
                currentNode = currentNode.next;
            }
            currentNode.next = newNode;
            newNode.prev = currentNode;
            newNode.next = this.head;
            this.head.prev = newNode;
        } else {
            //point head to the node and keep prev and next as same
            this.head = newNode;
            newNode.prev = newNode;
            newNode.next = newNode;
        }
        //increment length
        this.length++;
        return newNode;
    }

    pop = () => {
        let currentNode = this.head;
        /** iterate till length | n-2 times */
        for ( let i = 1; i < this.length - 1; i++) {
            currentNode = currentNode.next;
        }
        let popNode = currentNode.next;
        currentNode.next = this.head;
        this.head.prev = currentNode;
        this.length--;
        return popNode;
    }

    peekAtIndex = (index) => {
        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}
export default CircularDoubleLinkedlist;