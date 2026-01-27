/*
 * location: NodeJS_Template_Repository/src/utils/pipedrive_helper.js
 * description: This is a small file where functions related to Pipedrive can be found. This file
 * 							can be included elsewhere so that these functions do not need to be rewritten.
 * installation: const { initialize_sdk } = require("~/src/utils/pipedrive_helper")
 * usage: const sdk = initialize_sdk()
 */

const AppExtensionsSDK = require("@pipedrive/app-extensions-sdk");
const { logger } = require("./winston_helper");

/*
 * initialize_sdk: This is an asynchronous function that initializes the AppExtensionsSDK and
 * 								 set sit to the global window object.
 * pre-condition: The AppExtensionsSDK class must be available to be instantiated. Additionally,
 * 								the `logger` module must be imported to log errors.
 * post-condition: The function attempts to initialize the AppExtensionsSDK. If successful, it
 * 								 assigns the initialized SDK to the global `window.pipedriveSDK` object. If an error occurs
 * 								 during the initialization, it logs the error using the `logger`.
 */

async function initialize_sdk() {
	try {
		// get new sdk and apply to window
		const sdk = await new AppExtensionsSDK().initialize();
		window.pipedriveSDK = sdk;
	} catch (error) {
		// log the error if it occurs
		logger.error("Error initializing AppExtensionsSDK: ", error);
	}
}

// export for use elsewhere
module.exports = {
	initialize_sdk,
};
