class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    // 1. append
    append(value) {
        const newNode = { value, next: null }
        if (this.tail) {
            this.tail.next = newNode
        }
        this.tail = newNode
        if (!this.head) {
            this.head = newNode
        }
    }
    // 2. prepend
    prepend(value) {
        const newNode = { value, next: this.head }
        this.head = newNode
        if (!this.tail) {
            this.tail = newNode
        }
    }

    // 3. delete, point the prev `next` to the next node of the target
    // 将目标的上一个元素的`next`指向目标下一个元素
    delete(value) {
        if (!this.head) return
        let curNode = this.head
        // if it's the first node to delete, instead of using simple if statement, `while` does delete the same value in different nodes
        // 如果链表中有重复值，则全删除，用while不用if
        while (this.head && this.head.value === value) {
            this.head = this.head.next
        }

        // if is not deleting the first node
        while (curNode.next) {
            if (curNode.next.value === value) {
                curNode.next = curNode.next.next
            } else {
                curNode = curNode.next
            }
        }

        // if the target is to delete the tail node
        if (this.tail.value === value) {
            this.tail = curNode
        }
    }

    // 4. find
    find(value) {
        if (!this.head) return null
        let curNode = this.head
        while (curNode) {
            if (curNode.value === value) return curNode
            curNode = curNode.next
        }
        return null
    }

    // 5. insertAfter
    insertAfter(value, afterValue) {
        const existingNode = this.find(afterValue)
        if (existingNode) {
            const newNode = { value, next: existingNode.next }
            existingNode.next = newNode
        }
    }


    // . toArray, only for checking all the nodes in the list
    toArray() {
        const elements = []
        let curNode = this.head
        while (curNode) {
            elements.push(curNode)
            curNode = curNode.next
        }
        return elements
    }
}

const ll = new LinkedList()
ll.append('hello')
ll.append('world')
ll.append('lorem')
ll.prepend('first')
ll.append('ips um')
ll.append('last')
ll.append('last')
ll.prepend('first')
ll.delete('last')
ll.insertAfter('insert', 'hello')
// ll.delete('lorem')
// ll.delete('ipsum')

console.log(ll.toArray())
console.log(ll.find('last'))