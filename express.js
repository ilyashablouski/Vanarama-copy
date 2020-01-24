require("./config/dotenv")()

const express = require("express")
const next = require("next")
const rewrite = require("express-urlrewrite")
const prerender = require("prerender-node")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const logo = require("./logo")

const PORT = process.env.PORT || 3000

const redirects = [{ from: "/old-link", to: "/redirect" }]

app.prepare().then(() => {
  const server = express()

  // Rewrites
  server.use(rewrite("/:manufacturer-car-leasing.html", "/rewrite"))

  // Redirects.
  redirects.forEach(({ from, to, type = 301, method = "get" }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  // Prerender.
  if (prerender && process.env.PRERENDER_SERVICE_URL) server.use(prerender)

  server.all("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(logo)
    console.log(`Ready on http://localhost:${PORT}`.cyan)
  })
})

process.on("SIGTERM", () => {
  console.log("Closing http server")
  app.close(() => {
    console.log("Server closed")
  })
})

process.on("SIGINT", () => {
  console.log("Server terminated")
  process.exit(1)
})
