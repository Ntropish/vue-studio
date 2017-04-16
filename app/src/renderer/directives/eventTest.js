export default {

  bind(el, binding) {
    el.binder = bind(el)
    document.binder = bind(document)

    // binders.set(el, new Proxy(el, ProxyHandler()))
    // binders.set(document, new Proxy(document, ProxyHandler()))

    // console.log('elget:', proxies.get(el))

    el.binder.mousedown = downHandler;
    // document.binder.namespaced.mouseup = upHandler;
    document.binder.mouseup = upHandler;

    function downHandler() {
      console.log('down')
      bind('insight')
    }

    function upHandler() {
      return function anonUpper() {
        console.log('up')
      }
    }
  },

  unbind(el) {
    el.binder.clear()
    document.binder.clear()
  }

}
