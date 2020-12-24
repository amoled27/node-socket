let linkedList = function () {
    return {
        length: 0,
        head: null,
        tail: null,
        push: function (value) {
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
}
export default linkedList;