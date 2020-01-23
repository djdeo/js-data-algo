// 树结构
function BinarySearchTree() {

	// 节点
	function Node(key) {
		this.key = key
		this.left = null
		this.right = null
	}

	// 属性
	this.root = null

	// 方法

	// insertNode 内部方法1
	BinarySearchTree.prototype.insertNode = function(node, newNode) {
		if(newNode.key < node.key) { // 向左查找
			if(node.left == null) {
				node.left = newNode
			} else {
				this.insertNode(node.left, newNode)
			}
		} else { // 向右查找
			if(node.right == null) {
				node.right = newNode
			} else {
				this.insertNode(node.right, newNode)
			}
		}
	}

	// 1. 插入
	BinarySearchTree.prototype.insert = function(key) {
		// 1. 创建节点
		const newNode = new Node(key)

		// 2. 判断根节点是否有值
		if(this.root == null) {
			this.root = newNode
		} else {
			this.insertNode(this.root, newNode)
		}
	}

	// 2. 先序遍历
	BinarySearchTree.prototype.preOderTraversal = function(handler) {
		this.preOderTraversalNode(this.root, handler)
	}
	// preOderTraversalNode 内部方法2 先序遍历节点
	BinarySearchTree.prototype.preOderTraversalNode = function(node, handler) {
		if(node != null) {
			// 1. 处理经过的节点; 该步骤在1号位时为先序，2号位中序，3号位后序遍历
			handler(node.key) 

			// 2. 处理经过节点的左节点
			this.preOderTraversalNode(node.left, handler)

			// 3. 处理经过节点的右节点
			this.preOderTraversalNode(node.right, handler)
		}
	}

	// 3. min 最小值
	BinarySearchTree.prototype.min = function() {
		let node = this.root
		let key = null
		while(node != null) {
			key = node.key
			node = node.left
		}
		return key

	}

	// 4. max 最小值
	BinarySearchTree.prototype.max = function() {
		let node = this.root
		let key = null
		while(node != null) {
			key = node.key
			node = node.right
		}
		return key

	}

	// 5. 搜索某个key
	BinarySearchTree.prototype.search = function(key) {
		let node = this.root

		while(node != null) {
			if(key < node.key) {
				node = node.left
			} else if(key>node.key) {
				node = node.right
			} else {
				return true
			}
		}

		return false
	}

	// 6. remove 删除
	BinarySearchTree.prototype.remove = function(key) {
		// 0. 定义变量
		let current = this.root
		let parent = null
		let isLeftChild = true
		console.log('进入remove')
		
		// 1. 寻找该节点
		while(current.key != key) {

			parent = current

			if(key < current.key) {
				isLeftChild = true
				current = current.left
			} else {
				isLeftChild = false
				current = current.right
			}

			// 没有找到时
			if(current == null) return false
		}

		// 2. current = key 时, 已找到该节点，分3种情况
		// 2.1 删除叶子节点
		if(current.left == null && current.right == null) {
			console.log('删除🍃节点')
			if(current == this.root) {// 删除根节点
				this.root = null
			} else if(isLeftChild) {
				parent.left = null
			} else {
				parent.right = null
			}
		} else if(current.right == null) { // 2.2 删除的节点有一个节点 // 没有右节点
			console.log('删除的节点有一个节点☝')
			
			if(current == this.root) {// 是否是根节点
				this.root = current.left
			}else if(isLeftChild) {
				parent.left = current.left
			} else {
				parent.right = current.left
			}
		} else if(current.left == null) { // 没有左节点
			console.log('删除的节点有2个节点✌')

			if(current == this.root) {
				this.root = current.right
			}else if(isLeftChild) {
				parent.left = current.right
			} else {
				parent.right = current.right
			}
		} else {// 2.3 删除有两个子节点的节点， 用 ·前驱· 或者 ·后继· 节点替换
			// 获取后继节点
			let successor = this.getSuccessor(current)

			if(current == this.root) {
				this.root = successor
			} else if(isLeftChild) {
				parent.left = successor
			} else {
				parent.right = successor
			}

			successor.left = current.left
		}


	}

	BinarySearchTree.prototype.getSuccessor = function(delNode) {
		let successor = delNode
		let current = delNode.right
		let successorParent = delNode
		while(current != null) {
			successorParent = successor
			successor = current
			current = current.left
		}

		// 判断寻找的节点是不是delNode.right节点
		if(successor != delNode.right) {
			successorParent.left = successor.right
			successor.right = delNode.right 
		}

		return successor
	}
}


const b = new BinarySearchTree()
b.insert(11)
b.insert(7)
b.insert(15)
b.insert(3)
b.insert(9)
b.insert(8)
b.insert(10)
b.remove(7)

let result = ''
b.preOderTraversal(function(key) {
	result += key + ' '
})

const min = b.min()

console.log(result)