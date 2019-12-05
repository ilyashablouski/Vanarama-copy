require("./config/dotenv")()

const express = require("express")
const next = require("next")
const prerender = require("prerender-node")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  // Prerender.
  if (prerender && process.env.PRERENDER_SERVICE_URL) server.use(prerender)

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
