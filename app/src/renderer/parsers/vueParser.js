import htmlparser from 'htmlparser'

export default function(text) {
  return new Promise(function(resolve, reject) {
    let handler = new htmlparser.DefaultHandler((e, dom) => {
      if (e) reject(e)
      else resolve(dom)
    })

    let parser = new htmlparser.Parser(handler);
    parser.parseComplete(text)

  })
}