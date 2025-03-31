const g_coExpress = require("express")
const g_coExpressValidator = require("express-validator")

const g_co = g_coExpress()
g_co.use(g_coExpress.json())

g_co.use("/", Array.of(g_coExpressValidator.body("")
	.exists().withMessage("body exists")
	.notEmpty().withMessage("body not empty")
	.isJSON().withMessage("body is JSON")),
(a_oDataFromUser, a_o) => a_o.json(g_coExpressValidator.validationResult(a_o)))

g_co.listen(58888)
