let count = 0

export default class Component {
  constructor({id, name = 'No Name Component'} = {}) {
    this.name = name
    this.computed = []
    this.data = ''
    this.methods = []
    this.props = []
    this.watch = []
    this.id = Component.getId()
  }
  static getId() {
    return count++
  }
}