// Graph.js

function Graph() {
	// props => vertexes 顶点， edges 边
	this.vertexes = [] 
	this.edges = new Dictionary()

	// methods
	// 1. add vertex
	Graph.prototype.addVertex= function(v) {
		this.vertexes.push(v)
		this.edges.set(v, [])
	}

	// 2. add edges, 以邻接矩阵无向图设置
	Graph.prototype.addEdge = function(v1, v2) {
		this.edges.get(v1).push(v2)
		this.edges.get(v2).push(v1)
	}

	// 3. toString 
	Graph.prototype.toString =  function() {
		let resultString = ''

		for(let i=0; i<this.vertexes.length; i++) {
			let singleV = this.vertexes[i]
			let vEdges = this.edges.get(singleV)
			resultString = singleV + '->'

			for (let j = 0; j < vEdges.length; j++) {
				resultString +=	vEdges[j]
			}
			resultString += '\n'
		}

		return resultString
	}

	// 4. 初始化颜色
	Graph.prototype.initializeColor = function() {
		let colors = []

		for (let i = 0; i < this.vertexes.length; i++) {
			colors[this.vertexes[i]] = 'white'
		}

		return colors
	}

	// 5. 广度优先遍历 bfs
	Graph.prototype.bfs = function(initV, handler) {
		// 1. 初始化颜色
		let colors = this.initializeColor()

		// 2. 创建队列
		let queue = new Queue()

		// 3. 将顶点加到队列中
		queue.enqueue(initV)

		// 4. 遍历队列，取出元素v
		while(!queue.isEmpty()) {
			// 4.1 队列中的顶点
			let v = queue.dequeue()

			// 4.2 获取相邻顶点
			let neighbors = this.edges.get(v)

			// 4.3 将v的颜色设置成灰色
			colors[v] = 'gray'

			// 4.4 遍历所有顶点，加入队列
			for (let i = 0; i < neighbors.length; i++) {
				let el = neighbors[i]
				if(colors[el] == 'white') {
					colors[el] = 'gray'
					queue.enqueue(el)
				}
			}

			// 4.5 访问顶点
			handler(v)

			// 4.6 将访问过的顶点设置黑色
			colors[v] = 'black'

		}
	}

	// 6.  深度优先遍历 dfs
	Graph.prototype.dfs = function(initV, hander){
		let colors = this.initializeColor()
		this.dfsVisit(initV, colors, hander)
	}

	// 7. 内部方法，递归访问dfsVisit
	Graph.prototype.dfsVisit = function(v, colors, handler) {
		console.log('开始visit')
		colors[v] = 'gray'
		handler(v)

		let vList = this.edges.get(v)
		for (let i = 0; i < vList.length; i++) {
			let e = vList[i]
			if(colors[e] == 'white') {
				this.dfsVisit(e, colors, handler)
			}
		}

		colors[v] = 'black'
	}
}

// 测试
const grf = new Graph()

// 添加顶点 
const vertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < vertexes.length; i++) {
	grf.addVertex(vertexes[i])
}

// 添加边
grf.addEdge('A', 'B')
grf.addEdge('A', 'C')
grf.addEdge('A', 'D')
grf.addEdge('C', 'D')
grf.addEdge('C', 'G')
grf.addEdge('D', 'G')
grf.addEdge('D', 'H')
grf.addEdge('B', 'E')
grf.addEdge('B', 'F')
grf.addEdge('E', 'I')

console.log('Graph🤮 ',grf)
console.log('1',grf.vertexes[0])

// 测试bfs
let bfsRes = ''
grf.bfs(grf.vertexes[0], function(v) {
	bfsRes += v + ' '
})

console.log('广度遍历😂',bfsRes)

let dfsRes = ''
grf.dfs(grf.vertexes[0], function(v) {
	dfsRes += v + ' '
})
console.log('深度遍历😂',dfsRes)
