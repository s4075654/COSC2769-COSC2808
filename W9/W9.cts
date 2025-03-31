const g_cookieParser = require("cookie-parser")

const g_caTwoRouters = Array.of(express.Router(), express.Router())
const g_co = require("express")()
g_co.use("/products", g_caTwoRouters.at(0))
g_co.use("/users", g_caTwoRouters.at(1))

function ProductController() {
	g_caTwoRouters.at(0).all("/one-to", (_, a_oReturn) => a_oReturn.json(products.map(a_o => ({ id: a_o.id, name: a_o.name }))))
	g_caTwoRouters.at(0).all("/another", (_, a_oReturn) => a_oReturn.json(products.at(2)))
}
ProductController()

function UserController() {
	g_caTwoRouters.at(1).all("/", g_cookieParser("the authentication is successful"), function(a_oSignedCookie, a_oReturn) {
		if (a_oSignedCookie.signedCookies.ASignedCookie) a_oReturn.send(`a welcome message containing the ${users.at(1).username} of a specific user`)
		else a_oReturn.send("debug")
	})
}
UserController()

g_caTwoRouters.at(0).all("/one-route", express.json(), function(a_oUser, a_o) {
	products.push(a_oUser.body)
	a_o.end()
})

g_caTwoRouters.at(1).all("/login-route-and-handler", g_cookieParser("the authentication is successful"), (_, a_oCreate) => a_oCreate.cookie("ASignedCookie", undefined, { signed: true }).end())

const products = [ {id: 1, name: 'Phone', price: 400},
             {id: 2, name: 'Laptop', price: 1500},
             {id: 3, name: 'PC', price: 1200} ];
	     
let users = [ {id: 1, username: "alice", password: "password"},
          {id: 2, username: "bob", password: "123456"} ];

(async function() {
	users = await Promise.all(users.map(async a_o => ({ ...a_o, password: await require("bcrypt").hash(a_o.password, 0) })))
	g_co.listen(58888)
})()