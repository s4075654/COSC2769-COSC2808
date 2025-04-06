const g_coAnExpressApp = require("express")()

g_coAnExpressApp.use("/", function(a_o, _, a_) {
	console.log(a_o.get("User-Agent"))
	a_()
})

g_coAnExpressApp.get("/", (_, a_o) => a_o.json("get data"))
g_coAnExpressApp.post("/", (_, a_o) => a_o.json("create data"))
g_coAnExpressApp.put("/", (_, a_o) => a_o.json("update data"))
g_coAnExpressApp.delete("/", (_, a_o) => a_o.json("delete data"))

g_coAnExpressApp.use("/secret", (_, a_o) => a_o.end())

g_coAnExpressApp.use("/", (_, a_o) => a_o.json("not found"))

g_coAnExpressApp.listen(58888)
       