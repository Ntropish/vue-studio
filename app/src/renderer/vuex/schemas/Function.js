let count = 0
export default class Function {
  constructor({name = 'No Name Function'} = {}) {
    this.id = Function.getId()
    this.name = name
    this.arguments = [],
    this.body = ''
  }

  static getId() {
    return count++
  }
}