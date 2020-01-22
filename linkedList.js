// 双向链表
function DoublyLinkedList() {
	// 内部类：节点类
	function Node(data) {
		this.data = data
		this.prev = null
		this.next = null
	}

	// 属性
	this.head = null
	this.tail = null
	this.length = 0

	// 方法些
	// 1. 追加方法
	DoublyLinkedList.prototype.append = function(data) {
		let newNode = new Node(data)
		// 是否为第一个结点
		if(this.length === 0) {
			this.head = newNode
			this.tail = newNode
		} else {
			newNode.prev = this.tail
			this.tail.next = newNode
			this.tail = newNode
		}

		// length+1
		this.length += 1
	}

	// 2. 转为字符串，有三个方法
	// 2.1 toSting 方法
	DoublyLinkedList.prototype.toString = function() {
		return this.backwardString()
	}// 2.2 forwardString 方法
	DoublyLinkedList.prototype.forwardString = function() {
		let current = this.tail
		let result = ''

		while(current) { // 向前遍历
			result += current.data + ' '
			current = current.prev
		}

		return result
	}
	// 2.3 backwardSting 方法
	DoublyLinkedList.prototype.backwardString = function() {
		let current = this.head
		let result = ''

		while(current) { // 向后遍历
			result += current.data + ' '
			current = current.next
		}

		return result
	}

	// 3. insert 方法
	DoublyLinkedList.prototype.insert = function(position, data) {
		// a.越界判断
		if(position < 0 || position > this.length) {
			console.error('🚫 插入的位置越界')
			return false
		}

		// b. create new node
		const newNode = new Node(data)

		// c. 判断原列表是否为空
		if(this.length === 0) { // 列表为空
			this.head = newNode
			this.tail = newNode
		} else { // 非空列表
			if(position === 0) { // 在头部插入
				this.head.prev = newNode
				newNode.next = this.head
				this.head = newNode
			} else if(position === this.length) { // 尾部插入，相当于append
				newNode.prev = this.tail
				this.tail.next = newNode
				this.tail = newNode	
			} else { // 中间任意位置插入
				let current =  this.head
				let index = 0

				while(index++ < position) {
					current = current.next
				}

				newNode.next = current
				newNode.prev = current.prev
				current.prev.next = newNode
				current.prev = newNode
			}
		}

		this.length += 1

		return true		
	}


	// 4. get 方法，获取某一个位置的值
	DoublyLinkedList.prototype.get = function(position) {
		if(position <0 || position>= this.length) return null

		// TOD0:this.length/2 二分法优化

		let current = this.head
		let index = 0

		while(index++ < position) {
			current = current.next
		}


		return current.data
	}

	// 5. indexOf 方法
	DoublyLinkedList.prototype.indexOf = function(data) {
		let current = this.head
		let index = 0

		while(current) {
			if(current.data==data) {
				return index
			}
			current = current.next
			index += 1
		}

		return -1
	}


	// 6. update 方法
	DoublyLinkedList.prototype.update = function(position, newData) {
		if(position <0 || position>= this.length) return false

		let current = this.head
		let index = 0

		// Todo: 二分法优化
		while(index++ < position) {
			current = current.next
		}	

		 //找到后修改对应值
		 current.data = newData
		 return true 
	}

	// 7. removeAt 方法
	DoublyLinkedList.prototype.removeAt = function(position) {
		if(position <0 || position>= this.length) return null

		let current = this.head
		// 考虑节点的个数
		if(this.length === 0) { // 只有一个节点
			this.head =null
			this.tail =null
		} else {
			// 是否为第一个节点
			if(position === 0) { // 是
				this.head.next.prev = null
				this.head = this.head.next
			} else if (position === this.length - 1) { // 最后一个节点
				current = this.tail
				this.tail.prev.next = null
				this.tail = this.tail.prev
			} else { // 其他节点
				let index = 0

				while(index++ < position) {
					current = current.next
				}	

				current.prev.next = current.next
				current.next.prev = current.prev
			}
		}

		this.length -= 1
		return current.data
	}

	// 8. remove 方法
	DoublyLinkedList.prototype.remove = function(data) {
		let index = this.indexOf(data)
		if(index === -1) {
			console.error('没有找到对应数据')
			return null
		} else {
			return this.removeAt(index)
		}
	}

	// 9. isEmpty 方法
	DoublyLinkedList.prototype.isEmpty = function(data) {
		return this.length === 0
	}

	// 10. size 方法
	DoublyLinkedList.prototype.size = function(data) {
		return this.length
	}

	// 11. getHead 获取第一个元素
	DoublyLinkedList.prototype.getHead = function() {
		return this.head.data
	}

	// 12. getTail 获取最有一个元素
	DoublyLinkedList.prototype.getTail = function() {
		return this.tail.data
	}


}


// 测试
const list = new DoublyLinkedList()

list.append('abc')
list.append('4dd')
list.append('tqsd')
list.insert(0,'inserted')
list.insert(4,'inserted4')
list.insert(6,'inserted4')
list.update(2, 'updated2')

const removed = list.removeAt(3)
const item = list.get(2)
const there = list.indexOf('4dd')
const removeEl = list.remove('abcddf')
const header = list.getHead()
const tail = list.getTail()

console.log('→',list.toString())
console.log('←',list.forwardString())
console.log('get:',item)
console.log('there:',there)
console.log('removed:',removed)
console.log('removeEl:',removeEl)
console.log('header:',header)
console.log('tail:',tail)