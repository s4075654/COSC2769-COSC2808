import express from "express"
import { body, validationResult } from "express-validator"

const g_co = express()
g_co.use(express.json())

g_co.use("/", Array.of(body("")
	.exists().withMessage("body exists")
	.notEmpty().withMessage("body not empty")
	.isJSON().withMessage("body is JSON")),
(a_oDataFromUser, a_o) => a_o.json(validationResult(a_o)))

g_co.listen(58888)
