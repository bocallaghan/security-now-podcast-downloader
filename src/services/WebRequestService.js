const path = require('path'); // Import the path module
const axios = require('axios');

/**
 * @fileoverview The service for sending web requests.
 * @package twit-securitynow-downloader  
 */
class WebRequestService {

    constructor() {
        console.error("WebRequestService: You do not need to instantiate this class. Please use statically.");
    }

    /**
     * Get the user agent header string which comprises of the package name and version.
     * @returns {String} User agent header string
     */
    static getUserAgentString(){
        
        var userAgent = ``;

        // We get the package name and version from the NPM package.json file
        const package_name = require(path.join(process.cwd(),'package.json')).name
        const version_number = require(path.join(process.cwd(),'package.json')).version

        // Start with the package name (replacing all spaces with dashes)
        userAgent = package_name.replace(/ /g, '-');

        // Now append the version replacing all dots with dashes
        userAgent = userAgent + "-" + version_number.replace(/\./g, '-');

        return userAgent;
    }

    /**
     * External and error protected method to make a GET request to a specific endpoint.
     * @param {String} url The URL for the request
     * @param {String} username (Optional) Basic auth username
     * @param {String} password (Optional) Basic auth password
     * @returns {Object} The request response object.
     */
    static async get(url, username = null, password = null){
        try {
            return await WebRequestService._get(
                url,
                username,
                password
            )
        } catch (error) {
            console.error('Fatal error attempting to call the GET WebService function:', error);
            return null;
        }
    }

    /**
     * Internal method to make a GET request to a specific endpoint.
     * @param {String} url The URL for the request
     * @param {String} username (Optional) Basic auth username
     * @param {String} password (Optional) Basic auth password
     * @returns {Object} The request response object.
     */
    static async _get(url, username = null, password = null){
        var request_response = null;

        await axios({
            method: 'get',
            url: url,
            headers: {
                'User-Agent': WebRequestService.getUserAgentString()
            },
            responseType: 'stream'
        })
        .then((response) => {
            request_response = response;
        })
        .catch((error) => {});

        if(await request_response){
            return request_response;
        }
        return null;
    }
}

module.exports = WebRequestService;