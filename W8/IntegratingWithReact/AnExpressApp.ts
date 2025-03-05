import express from "express"

const g_coAnExpressApp = express()

g_coAnExpressApp.get("/products", (_, a_o) => a_o.json("some products"))

g_coAnExpressApp.get("/", (_, a_o) => a_o.sendFile(__dirname + "/AReactApp.htm"))
g_coAnExpressApp.use(express.static(__dirname))

g_coAnExpressApp.listen(58888)