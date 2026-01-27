/*
 * location: NodeJS_Template_Repository/src/utils/winston_helper.js
 * description: This is a small utility file that helps streamline the process of creating logs
 * 							for the server. This code uses the Winston package to write logs to an automatically generated
 * 							(and automatically cleaned) log file. It allows for the formatting of logs along with a great
 * 							deal of customization for how logs are processed. The utility in this code is intended to be
 * 							used instead of "console.log()".
 * installation: const { logger } = require(~/src/utils/winston_helper)
 * usage: logger.info("This is a test log!")
 */

const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");

// set up winston format to include "combine", "timestamp", "printf", "colorize", and "align"
const { combine, timestamp, printf, colorize, align } = winston.format;

// transport for logs with the maximum level of "error" or 3
// the logs are saved to a file named "important.log" and are kept for 14 days before deleting
const important_transport = new winston.transports.DailyRotateFile({
	filename: path.join(__dirname, "../logs/important.log"),
	datePattern: "DD-MM-YYYY",
	maxFiles: "14d",
	level: "error",
});

// transport for logs with the maximum level of "info" or 6
// the logs are saved to a file named "garbage.log" and are kept for 3 days before deleting
const garbage_transport = new winston.transports.DailyRotateFile({
	filename: path.join(__dirname, "../logs/garbage.log"),
	datePattern: "DD-MM-YYYY",
	maxFiles: "3d",
	level: "info",
});

// transport for the console - this is for runtime logs
const debug_transport = new winston.transports.Console({
	// log level is set in the .env or defaulted to "info"
	level: process.env.LOG_LEVEL || "info",
});

// create the logger
const logger = winston.createLogger({
	// use the syslog log levels instead of npm - they are below
	/*
	 * level | severity | keyword
	 * 0 - Emergency - emerg
	 * 1 - Alert - alert
	 * 2 - Critical - crit
	 * 3 - Error - err
	 * 4 - Warning - warning
	 * 5 - Notice - notice
	 * 6 - Informational - info
	 * 7 - Debug - debug
	 */
	levels: winston.config.syslog.levels,
	// set the format of the log
	format: combine(
		colorize({ all: true }),
		timestamp({
			format: "DD-MM-YYYY hh:mm:ss A",
		}),
		align(),
		printf((info) => {
			const timestamp = info.timestamp || new Date().toISOString();
			const level = info.level;
			const message = (info.message || "").trim();

			// Try to extract the file and line number from stack trace (if available)
			const stack = info.stack || (info[Symbol.for("splat")]?.[0]?.stack ?? "");
			const match = stack.match(/at\s(.+?\\[^\\\/]+:\d+:\d+)/);
			const location = match ? ` | ${match[1]}` : stack;

			return `${level}: ${message}${location}`;
		})
	),
	// set where the log should go
	transports: [important_transport, garbage_transport, debug_transport],
});

// export the log to be used elsewhere
module.exports = {
	logger,
};
