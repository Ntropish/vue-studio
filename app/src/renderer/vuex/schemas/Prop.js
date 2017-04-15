let count = 0
export default class Prop {
  constructor({name = 'No Name Prop'} = {}) {
    this.id = Prop.getId()
    this.name = name
    this.required = false
    this.type = null
    this.defaultFunction = null
    this.default = null
  }

  static getId() {
    return count++
  }
}