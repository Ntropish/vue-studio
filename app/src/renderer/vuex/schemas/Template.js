import TemplateNode from './TemplateNode'

export default class Template {
  constructor({rootNode = new TemplateNode()} = {}) {
    this.rootNode = rootNode
  }
}
