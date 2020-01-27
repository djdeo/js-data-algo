// Graph.js

function Graph() {
	// props => vertexes 顶点， edges 边
	this.vertexes = [] 
	this.edges = new Dictionary()

	// methods
	// 1. add vertex
	Graph.prototype.addVertex(v) {
		this.vertexes.push(v)
		this.edges.set(v, [])
	}

	// 2. add edges, 以邻接矩阵无向图设置
	Graph.prototype.addEdge(v1, v2) {
		
	}
}
