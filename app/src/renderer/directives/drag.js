import onify from 'onify'

onify(document)

export default {
  bind(el, binding, {context: {_uid: id}}) {
    onify(el)
    el.on.mousedown = downHandler

    // Namespaced handler
    document.on[id].mouseup = upHandler

    function downHandler(e) {      
      document.on[id].mousemove = moveHandler

      // Kill default drag and drop
      e.preventDefault()
      el.dispatchEvent(new CustomEvent('up', {detail: e}))
      
    }

    function moveHandler(e) {
      el.dispatchEvent(new CustomEvent('drag', {detail: e}))
    }

    function upHandler(e) {
      document.on[id].mousemove = null
      e.target.dispatchEvent(new CustomEvent('drop', {detail: binding.value}))
      el.dispatchEvent(new CustomEvent('down', {detail: e}))
      
    }
  },

  unbind(el, binding, {context: {_uid: id}}) {
    el.on.clear()
    document.on[id].clear()
  }
}
