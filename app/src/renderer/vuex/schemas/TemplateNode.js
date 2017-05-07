let count = 0
export default class TemplateNode {
  constructor({data = '', type = 'tag', children = [], tagName = 'div'} = {}) {
    this.type = type
    this.tagName = tagName
    this.data = data
    this.children = children
    this.id = TemplateNode.getId()
  }

  static getId() {
    return count++
  }
}
