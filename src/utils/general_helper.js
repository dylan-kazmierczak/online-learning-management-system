/*
 * location: NodeJS_Template_Repository/src/utils/general_helper.js
 * description: This is a small utility file that holds miscellaneous functions that can be applied almost anywhere.
 * installation: const utils = require(~/src/utils/general_helper);
 * usage: utils.send_webex("This would be a test message in Webex!")
 */

const requester = require("./axios_helper");

/*
 * send_webex: This is an asynchronous function that sends a message to a specified Webex room.
 * pre-condition: The requester module must be available to make HTTP POST requests. Additionally,
 * 								the environment variables `WEBEX_ROOM` and `WEBEX_BOT` must be set up with appropriate values.
 * post-condition: The function attempts to send a message to the Webex room specified by the
 * 								 `WEBEX_ROOM` environment variable, using the authorization token provided by `WEBEX_BOT`.
 * 								 If the request is successful, it returns the response from the Webex API.
 */

module.exports = {
};
