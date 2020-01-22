// 哈希表

function HashTable() {
	// 属性
	this.storage = []
	this.count = 0
	this.limit = 7

	// 1. hash函数： 1，将字符串转为较大的数字；2，压缩较大的数字到范围之内
	HashTable.prototype.hashFun = function (str, size) {
		// 1. 定义hash变量
		let hashCode = 0
		// 2. 霍纳算法
		for (let i = str.length - 1; i >= 0; i--) {
			hashCode = 37 * hashCode + str.charCodeAt(i)
		}
		// 3.返回 取余 值
		let index = hashCode % size
		return index
	}

	// 2. getBucket
	HashTable.prototype.getBucket = function(str) {
		// 1.根据key获取到对应的index
		let index = this.hashFun(str, this.limit)
		// 2.根据index取出对应的bucket
		let bucket = this.storage[index]

		return bucket
	}

	// 3. 插入修改方法
	HashTable.prototype.put = function(key, value) {

		// 1.根据key获取到对应的index
		let index = this.hashFun(key, this.limit)
		// 2.根据index取出对应的bucket
		let bucket = this.storage[index] 
		
		// 1.判断bucket是否为空
		if(!bucket) {
			bucket = []
			this.storage[index] = bucket
		}	
		// 2. 线性查找bucket里面是由有对应数据,修改
		for (let i = bucket.length - 1; i >= 0; i--) {
			let tuple = bucket[i]
			if(tuple[0]===key) {
				tuple[1] = value
				return
			}
		}

		// 5. 添加
		bucket.push([key, value])
		this.count += 1

		// 6. 判断是否需要扩容
		if(this.count > this.limit *0.75) {
			const prime = this.getPrime(this.limit*2)
			this.resize(prime)
		}

	}


	// 4. get获取方法
	HashTable.prototype.get = function(str) {
		let bucket = this.getBucket(str)

		if(bucket === null) return null

		// 线性查找并返回值
		for (let i = bucket.length - 1; i >= 0; i--) {
			let tuple = bucket[i]
			if(tuple[0]===str) { // 0号位放置的是key(str), 1号位放value
				return tuple[1] 
			}
		}
		// 如果没找到就返回 null
		return null
	}

	// 5. remove方法
	HashTable.prototype.remove = function(str) {
		let bucket = this.getBucket(str)

		if(bucket === null) return null

		// 线性查找并返回值
		for (let i = bucket.length - 1; i >= 0; i--) {
			let tuple = bucket[i]
			if(tuple[0]===str) { 
				bucket.splice(i, 1)
				this.count--
				return tuple[1]

				// 缩小容量
				if(this.limit > 7 && this.count < this.limit * 0.25) {
					const prime = this.getPrime(Math.floor(this.limit/2))
					this.resize(prime)
				}
			}
		}
		// 如果没找到就返回 null
		return null
	}

	// 6. isEmpty
	HashTable.prototype.isEmpty = function() {
		return this.count === 0
	}

	// 7. size
	HashTable.prototype.size = function() {
		return this.count 
	}

	// 8. resize 扩容
	HashTable.prototype.resize = function(newLimit) {
		
		let oldStorage = this.storage

		// 重置属性
		this.storage = []
		this.count = 0
		this.limit = newLimit

		// 将旧数组的元素重新放到新容器
		for (let i = oldStorage.length - 1; i >= 0; i--) {
			
			let bucket = oldStorage[i]

			if(!bucket) continue

			for (let j = buck.length - 1; j >= 0; j--) {
				let tuple = buck[j]
				this.put(tuple[0], tuple[1])
			}
		}

	} 

	// 9. 判断质数
	HashTable.prototype.isPrime = function(num) {
		// 获取num的开平方根
		const temp = parseInt(Math.sqrt(num))

		// 判断
		for (let i = 2; i <= temp; i++) {
			if(num % i === 0) {
				return false
			}
		}
		return true
	}

	// 10. 返回质数
	HashTable.prototype.getPrime = function(num) {
		while(!this.isPrime(num)) {
			num ++
		}
		return num
	}
}


// 测试

const ht = new HashTable()

ht.put('abc', '123')
ht.put('bbc', '234')
ht.put('cbc', '345')

console.log(ht.get('abc'))
ht.put('abc','111')
console.log('修改后',ht.get('abc'))

const r = ht.remove('cbc')
console.log('删除后',r)
ht.put('obj', {
	name:'John Don',
	age:18
})

const obj = ht.get('obj')
console.log('保存的obj', obj)