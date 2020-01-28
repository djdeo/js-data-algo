// 队列
function Queue() {
	// prop
	this.items = []

	// methods
	// 1. 插入
	Queue.prototype.enqueue = function(el) {
		this.items.push(el)
	}

	// 2. 删除前端元素
	Queue.prototype.dequeue = function() {
		return this.items.shift()
	}

	// 3. front, check the front el
	Queue.prototype.front = function() {
		return this.items[0]
	}

	// 4. isEmpty
	Queue.prototype.isEmpty = function() {
		return this.items.length == 0
	}

	// 5. size
	Queue.prototype.size = function() {
		return this.items.legnth
	}
}