export default {
  bind(el, binding) {
    proxies.set(el, new Proxy(el, eventProxyHandler))
    proxies.set(document, new Proxy(document, eventProxyHandler))

    proxies.get(el).mousedown = downHandler;
    proxies.get(document).namespacey.mouseup = upHandler;
    proxies.get(document).mouseup = upHandler;

    function downHandler() {
      console.log('down')
      console.log(proxies)
    }

    function upHandler() {
      console.log('up')
    }
  },
  unbind(el) {
    proxies.get(el).clear()
    proxies.get(document).clear()
  }
}

let proxies = new WeakMap()

let eventHandlers = new WeakMap()
let eventProxyHandler = {
  get(el, prop) {
    console.log('GET')
    console.log('el:', el)
    console.log('prop:', prop)
    let handlers = eventHandlers.get(el)
    
    // Provide a function to remove all event handlers
    if (prop === 'clear') {
      return function(keys = Object.keys(handlers)) {
        keys.forEach(handlerName=>{
          let handler = handlers[handlerName]

          if (handler.$namespace) {
            handler.clear()
          } else {
            el.removeEventListener(handlerName, handlers[handlerName])
          }
        })
      }
    }

    // Namespaces
    if (prop === '$namespace') {
      return handlers.$namespace
    }

    if (prop === '$el') {
      return handlers.$el
    }

    if (!handlers) {
      handlers = {$namespace: true, $el: el}
      eventHandlers.set(el, handlers)
    }

    handlers[prop] = new Proxy(handlers, eventProxyHandler) 
    return handlers[prop]
  },
  set(el, prop, value) {

    console.log('SET')
    console.log('el:', el)
    console.log('prop:', prop)
    console.log('value:', value)

    let realEl = el.$el || el
    console.log(realEl)
    
    realEl.addEventListener(prop, value)
    console.log('added')

    let pastHandlers = eventHandlers.get(el)
    if (!pastHandlers) {
      pastHandlers = {}
      eventHandlers.set(el, pastHandlers)
    }


    pastHandlers[prop] = value
    return true
  }
}