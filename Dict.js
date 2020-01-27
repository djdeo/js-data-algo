// 字典

function Dictionary() {
	// prop
	this.items = {}

	// methods
	// 1. set
	Dictionary.prototype.set = function(key, value) {
		this.items[key] = value
	}

	// 2. has
	Dictionary.prototype.has = function(key) {
		return this.items.hasOwnProperty(key)
	}

	// 3. remove
	Dictionary.prototype.remove = function(key) {
		// check key is empty
		if(!this.has(key)) return false

		// remove key
		delete this.items[key]
		return true
	}

	// 4. get
	Dictionary.prototype.get = function(key) {
		return this.has(key)?this.items[key]:undefined
	}

	// 5. keys =>return all keys
	Dictionary.prototype.keys = function(){
		return Object.keys(this.items)
	}

}

const d = new Dictionary()
d.set('a', 'this first string')
d.set('b', {'ba':'ba value'})
d.set('bool', true)

const obj = d.get('b')
const rd = d.remove('bool')
console.log(d.keys)
console.log(d.has('b'))
console.log(obj.ba)
console.log(rd)