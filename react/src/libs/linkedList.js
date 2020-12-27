class Linkedlist {
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
}
export default Linkedlist;