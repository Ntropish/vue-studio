export default function bind(element) {

  if (element === 'insight') {
    return console.log(trees)
  }

  let existingBinder = trees.get(element)
  if (existingBinder) {
    console.log('existing tree for', element)
    return existingBinder
  }

  let root = new Proxy(element, ProxyHandler())
  trees.set(element, root)
  return root
}

let loggit = false

let trees = new WeakMap()
function ProxyHandler(namespace = []) {

  // Break out of Proxy tree getter loop by storing special property here
  let $handlers = {}
  let $namespaces = {}
  return { 

    get(el, prop) {
      if (loggit) {
        console.log('GET')
        console.log('el:', el)
        console.log('prop:', prop)
      }


      let tree = trees.get(el)

      let space = namespace.reduce((p,c)=>{
        return p[c]
      }, trees.get(el))
      
      // Provide a function to remove all event handlers
      if (prop === 'clear') {
        return function(handlers = Object.keys($handlers)) {

          Object.keys($namespaces).forEach(namespace=>{
            $namespaces[namespace].clear(handlers)
          })

          handlers.forEach(name=>{
            let handler = $handlers[name]
            
            console.log('removing', name,':', handler, 'from', el, 'in namespace:', namespace.join('->'))
            
            el.removeEventListener(name, handler)
          })
        }
      }

      // Special key to get the handlers in this namespace
      if (prop === '$handlers') {
        return $handlers
      }

      // Return the Proxy in the desired namespace and make it if needed
      if (!$namespaces[prop]) {
        $namespaces[prop] = new Proxy(el, ProxyHandler(namespace.concat(prop))) 
      }
    
      return $namespaces[prop]
    },

    set(el, prop, value) {

    if (loggit) {
      console.log('SET')
      console.log('el:', el)
      console.log('prop:', prop)
      console.log('value:', value)
      console.log('namespace:', namespace)
    }

      let tree = trees.get(el)

      let space = namespace.reduce((p,c)=>{
        return p[c]
      }, tree)


      // console.log('adding', prop, 'to', el)
      // console.log(value)
      el.addEventListener(prop, value)

      space.$handlers[prop] = value
      return true
    }

  }
}
