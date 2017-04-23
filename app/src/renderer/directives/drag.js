import onify from 'onify'
import throttle from 'throttle-debounce/throttle'

onify(document)

let draggables = 0
export default {
  bind(el, binding) {
    let id = draggables++
    el.dataset.dragId = id

    onify(el)
    el.on.mousedown = downHandler

    // Namespaced handler
    document.on[id].mouseup = upHandler

    function downHandler(e) {
      document.on[id].mousemove = throttle(15, moveHandler)
      document.on[id].mouseover = mouseOverHandler
      document.on[id].mouseout  = mouseOutHandler

      // Kill default drag and drop
      e.preventDefault()
      el.dispatchEvent(new CustomEvent('up', {detail: e}))
    }

    function moveHandler(e) {
      el.dispatchEvent(new CustomEvent('drag', {detail: e}))
    }

    function mouseOverHandler(e) {
      console.log(e.target)
      e.target.dispatchEvent(new CustomEvent('dragover', {detail: binding.value}))
    }

    function mouseOutHandler(e) {
      e.target.dispatchEvent(new CustomEvent('dragout', {detail: binding.value}))
    }

    function upHandler(e) {
      document.on[id].mousemove = null
      document.on[id].mouseover = null
      document.on[id].mouseout = null
      e.target.dispatchEvent(new CustomEvent('drop', {detail: binding.value}))
      el.dispatchEvent(new CustomEvent('down', {detail: e}))
    }
  },

  unbind(el, binding) {
    el.on.clear()
    document.on[el.dataset.dragId].clear()
  }
}
