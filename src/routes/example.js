/*
 * location: NodeJS_Template_Repository/src/routes/example.js
 * description: This is a small file that creates a custom endpoint for a router and then exports
 * 							it.
 * installation: const { example_router } = require("./example");
 * usage: let total_routes = Router.use("/example", example_router);
 */

const { Router } = require("express");
let example_router = Router();

// set an endpoint at the home url of /
// if this is imported as shown in the header comment, the route to this will be whatever is put
// in the Router.use() function as the first string argument.
example_router.get("/", (req, res) => {
	// send a quick response and status
	res.status(200).send("Example route works!");
});

// export for outside use
module.exports = { example_router };
