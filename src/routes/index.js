/*
 * location: NodeJS_Template_Repository/src/routes/index.js
 * description: This is the file where all of the custom routes/endpoints that have been created go.
 * 							Once they have been correctly imported here, this file is then exported to the main app.js file
 * 							so that all of the routes can be accessed in an easy and organized manner. This makes it so that
 * 							removing a set of routes or searching for routes less difficult when in multiple files as opposed
 * 							to a singular, massive file. This file should be added to as new routes are made, and the template
 * 							version only holds the example route.
 * installation: const { total_routes } = require(~/src/routes/index);
 * usage: app.use("/", total_routes);
 */

const { Router } = require("express");
const { example_router } = require("./example");

// this is just the creation of the total router object that contains all routes
// more ".use()" can be appended to add more custom routes to the router
let total_routes = Router().use("/example", example_router);

// export routes to be used elsewhere
module.exports = { total_routes };
