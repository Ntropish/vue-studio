let count = 0

// Template is 1:1 with component, no need for vuex
import Template from './Template'

export default class Component {
  constructor({id, name = 'No Name Component'} = {}) {
    this.name = name
    this.computed = []
    this.data = ''
    this.methods = []
    this.props = []
    this.watch = []
    this.id = Component.getId()
    this.template = new Template()
    this.style = ''

  }
  static getId() {
    return count++
  }
}