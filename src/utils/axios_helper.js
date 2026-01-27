/*
 * location: NodeJS_Template_Repository/src/utils/axios_helper.js
 * description: This is a small utility file that can handle the setup, use, and logging of a GET
 * 							or POST request with axios. Essentially, this file makes it so that a developer does not need
 * 							to write all of the setup for an axios request in the future. Each function handles a different
 * 							type of request, takes in the input required from that request, and returns either the response
 * 							from the server or "ERROR".
 * installation: const requester = require(~/src/utils/axios_helper);
 * usage: requester.get_request("http://127.0.0.1:8080/example", { accept: "application/json", });
 */

const axios = require("axios");
const path = require("path");

/*
 * get_request: This is a function that essentially formats and runs a GET request using the axios
 * 							package library. It takes in the input required for a request (while also having default values
 * 							for if the user does not specify certain options for the request), and then returns the response
 * 							from the server.
 * pre-condition: The user must pass in a url for the endpoint they are trying to hit in the form
 * 								of a string along with a JSON oject that contains the headers that the user needs for their request.
 * 								If no headers are specified, then the default headers are set to accept "application/json" content
 * 								with no "authorization".
 * post-condition: When no error occurs, the function returns a JSON object with a value with the key
 * 								 "success" that determines whether or not the request worked, "data" for the response data from the
 * 								 request, and "config" which displays what was used in the actual request. The built in error handling
 * 								 changes these values depending on if an error occurs. If one does, the function will not error out, but
 * 								 simply return with the value of "success" being false. This is done so that error handling is not automatic
 * 								 and must be configured by the programmer.
 */

async function get_request(
	url,
	headers = {
		"Content-Type": "application/json",
		Authorization: null,
		Accept: "application/json",
	}
) {
	// create config variable for GET request with no body length constraints
	var config = {
		method: "get",
		maxBodyLength: Infinity,
		url: url,
		headers: headers,
	};

	try {
		var response = await axios.request(config);
		return { success: true, data: response.data, config: config };
	} catch (err) {
		return { success: false, data: err.response.data, config: config };
	}
}

/*
 * post_request: This is a function that essentially formats and runs a POST request using the axios
 * 							 package library. It takes in the input required for a request (while also having default values
 * 							 for if the user does not specify certain options for the request), and then returns the response
 * 							 from the server.
 * pre-condition: The user must pass in a url for the endpoint they are trying to hit in the form
 * 								of a string, a JSON oject that contains the headers that the user needs for their request, and
 * 								another JSON object that contains the body for the user's request. If no headers are specified, then
 * 								the default headers are set to accept "application/json" content with no "authorization".
 * post-condition: When no error occurs, the function returns a JSON object with a value with the key
 * 								 "success" that determines whether or not the request worked, "data" for the response data from the
 * 								 request, and "config" which displays what was used in the actual request. The built in error handling
 * 								 changes these values depending on if an error occurs. If one does, the function will not error out, but
 * 								 simply return with the value of "success" being false. This is done so that error handling is not automatic
 * 								 and must be configured by the programmer.
 */

async function post_request(
	url,
	data,
	headers = {
		"Content-Type": "application/json",
		Authorization: null,
		Accept: "application/json",
	}
) {
	// create config for POST request with no body length constraints
	var config = {
		method: "post",
		maxBodyLength: Infinity,
		url: url,
		data: data,
		headers: headers,
	};

	try {
		var response = await axios.request(config);
		return { success: true, data: response.data, config: config };
	} catch (err) {
		return { success: false, data: err.response.data, config: config };
	}
}

// export the functions for outside use
module.exports = {
	get_request,
	post_request,
};
