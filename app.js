/*
 * location: NodeJS_Template_Repository/app.js
 * description: This is the server file that starts the entire NodeJS server. Without this file, the server
 * 							does not work at all, which is why it is in the home directory and not in the /src directory. It uses the
 * 							"express" package to create the app and start it. It sets the environment using the arguments passed on the
 * 							command line, sets the routes, sets the port, sets the app engine as Handlebars, and initializes the engine.
 * 							Additionally, it configures middleware for parsing request bodies and serving static files, and includes error
 * 							handling and logging using custom utilities.
 * installation: npm install
 * usage: npm run example
 */

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

// create the app and configure the .env to choose a file based on the CLI input at time of run
const app = express();
require("dotenv").config({
	path: path.join(__dirname, `config/.env.${process.argv[2]}`),
});

// import the route file that holds all of the custom routes
const { total_routes } = require(path.join(__dirname, "/src/routes/index"));
// set the port based on the .env
const port = process.env.PORT || 8080;
// import the winston logger utility
const { logger } = require(path.join(__dirname, "/src/utils/winston_helper"));
// import the axios api requester utility
const requester = require(path.join(__dirname, "/src/utils/axios_helper"));

// configure express-session for user sessions
app.use(session({
	secret: 'lms-secret-key-2026',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// set the engine and handlebars and set the layouts directory and default layout file name
app.engine(
	"hbs",
	exphbs.engine({
		extname: ".hbs",
		defaultLayout: "default",
		layoutsDir: path.join(__dirname, "/public/pages/layouts"),
		helpers: {
			eq: function (a, b) {
				return a === b;
			},
			ne: function (a, b) {
				return a !== b;
			},
			lt: function (a, b) {
				return a < b;
			},
			gt: function (a, b) {
				return a > b;
			},
			and: function (a, b) {
				return a && b;
			},
			or: function (a, b) {
				return a || b;
			},
			toString: function (value) {
				return String(value);
			},
		},
	})
);

// set the handlebars view engine and views directory
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/public/pages/views"));

// set body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// set the static files to be shown to clients as the public directory
app.use(express.static(path.join(__dirname, "/public")));

// Flash message middleware — reads once and clears from session
app.use((req, res, next) => {
	res.locals.flash = req.session.flash || {};
	delete req.session.flash;
	next();
});

// actually use the routes previously imported
app.use("/", total_routes);

// small endpoint that catches any errors when connecting to the server in some manner
app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// server is started by listening on the previously defined port
const server = app.listen(port, async () => {
	// runtime log to show that the server is running
	logger.debug(`Success! Server is listening at ${process.env.HOST}:${port}`);
});
