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

            this.tail.next = newNode;
            this.tail = this.tail.next;
            this.tail.next = this.head;

        } else {
            this.head = newNode;
            this.tail = newNode;
            this.tail.next = this.head;
        }
        this.length++;
        return newNode;
    }

    pop = () => {

    }
}
export default circularLinkedlist;