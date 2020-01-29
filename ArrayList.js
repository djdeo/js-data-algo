// 列表类
function ArrayList() {
    // props
    this.array = []

    // methods
    // 1. insert
    ArrayList.prototype.insert = function(item) {
        this.array.push(item)
    }

    // 2. toString
    ArrayList.prototype.toString = function() {
        return this.array.join('-')
    }

    // 3. exchange position of two elements
    ArrayList.prototype.swap = function(m, n) {
        const temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }

    // sort methods
    // 冒泡排序
    ArrayList.prototype.bubbleSort = function() {
        const length = this.array.length
        for (let j = length - 1; j >= 0; j--) { // 重复两两比较
            for (let i = 0; i < j; i++) { // 两两比较将大值放到后面
                if (this.array[i] > this.array[j]) {
                    this.swap(i, i + 1)
                }
            }
        }
    }

    // 选择排序
    ArrayList.prototype.selectionSort = function() {
        const length = this.array.length
        for (let j = 0; j < length - 1; j++) {
            let minPosition = j
            for (let i = minPosition + 1; i < length; i++) {
                if (this.array[minPosition] > this.array[i]) {
                    minPosition = i
                }
            }
            this.swap(minPosition, j)
        }
    }

    // 插入排序
    ArrayList.prototype.insertionSort = function() {
    	const length = this.array.length
    	for (let i = 0; i < length; i++) {
    		let temp = this.array[i]
    		let j = i
    		// 插入的核心代码
    		while(this.array[j - 1]>temp && j>0) {
    			this.array[j] = this.array[j-1]
    			j--
    		}
    		this.array[j] = temp
    	}
    }

    // 希尔Shell排序
    ArrayList.prototype.shellSort = function() {
    	const length = this.array.length
    	let gap = Math.floor(length/2)

    	// while 循环，减小gap
    	while(gap>=1) {
    		// 以gap 为间隔进行分组，在组内进行插入排序
    		for(let i = gap; i<length; i++) {
    			let temp = this.array[i]
    			let j = i
    			while(this.array[j-gap] > temp && j > gap-1) {
    				this.array[j] = this.array[j-gap]
    				j -= gap
    			}
    			// 将j位元素赋值给temp
    			this.array[j] = temp
    		}

    		gap = Math.floor(gap/2)
    	}
    }

    // 选择枢纽 （用于快速排序）
    ArrayList.prototype.median = function(left, right) {
    	const center = Math.floor((left+right)/2)

    	// sort the three elements, make sure they are in order
    	if(this.array[left] > this.array[center]) {
    		this.swap(left, center)
    	}
    	
    	if(this.array[center] > this.array[right]) {
    		this.swap(center, right)
    	}
    	// 第二次if后左肯定小于右，但是不一定大于新的中，所以再用一个if确认下
    	if(this.array[left] > this.array[center]) {
    		this.swap(left, center)
    	}
    	

    	this.swap(center, right-1) // 将中位数放到枢纽位置
    	return this.array[right-1]
    }

    // 快速排序
    ArrayList.prototype.quickSort =  function() {
    	this.quickRec(0, this.array.length-1)
    }

    // 用于快速排序递归的方法
    ArrayList.prototype.quickRec = function(left, right) {
    	// 1. 递归结束条件
    	if(left >= right) return 

    	// 2. 获取枢纽
    	let pivot = this.median(left, right)

    	// 3. 定义两个变量指针，记录当前位置
    	let i = left
    	let j = right-1

    	// 4. 开始遍历
    	while(i<j) {
    		while(this.array[++i] < pivot) {} // 在左边寻找大于枢纽的值
    		while(this.array[--j] > pivot) {} // 在右边找小于枢纽的值
    		if(i < j) {
    			this.swap(i, j)
    		} else {
    			break
    		}
    	}

    	// 5. 将枢纽放回正确的位置， i的位置
    	this.swap(i, right-1)

    	// 6. 分而治之
    	this.quickRec(left, i-1)
    	this.quickRec(i+1, right)

    }


}

// test
const list = new ArrayList()
list.insert(3)
list.insert(5)
list.insert(6)
list.insert(8)
list.insert(17)
list.insert(213)
list.insert(99)
list.insert(10)
list.insert(22)
list.insert(333)

// 排序测试
// list.bubbleSort()
// list.selectionSort()
// list.insertionSort()
// list.shellSort()
list.quickSort()

console.log(list.toString())



