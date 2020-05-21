const http = require('http')
const querystring = require('querystring')

const server = http.createServer()
const port = 8890

const msgs = [{
  content: 'hello',
  name: 'zhangshan',
}]

server.on('request', (request, response) => {
  if (request.method == 'GET') {

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    })

    response.write(`
      <form action="/" method="post">
        标题<input name="name" />
        内容<textarea name="content"></textarea>
        <button>???</button>
      </form>
      <ul>
        ${
          msgs.map(msg => {
            return `
              <li>
                <h3>${msg.name}</h3>
                <pre>${msg.content}</pre>
              </li>
            `
          }).join('')
        }
      </ul>
    `)
  }
  if (request.method == 'POST') {
    request.on('data', data => {
      var msg = querystring.parse(data.toString())
      msgs.push(msg)
      console.log(msg)
      response.writeHead(301, {
        'Location': '/'
      })
      response.end()
    })
  }
})

server.listen(port, () => {
  console.log('server listening on port', port)
})
