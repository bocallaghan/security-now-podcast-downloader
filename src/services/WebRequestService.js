const { all } = require('async');
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
                'User-Agent': `twit-securitynow-downloader` 
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

    /**
     * External and error protected method to make a POST request to a specific endpoint.
     * @param {String} url The URL for the request
     * @param {String} username (Optional) Basic auth username
     * @param {String} password (Optional) Basic auth password
     * @param {Object} payload (Optional) The JSON payload to send
     * @param {String} mime_type The mime type definition of the payload type
     * @returns {Object} The request response object.
     */
    static async post(url, username, password, payload, mime_type){
        try {
            return await WebRequestService._post(
                url,
                username,
                password,
                payload,
                mime_type
            )
        } catch (error) {
            console.error('Fatal error attempting to call the GET WebService function:', error);
            return null;
        }
    }

    /**
     * Internal method to make a POST request to a specific endpoint.
     * @param {String} url The URL for the request
     * @param {String} username (Optional) Basic auth username
     * @param {String} password (Optional) Basic auth password
     * @param {Object} payload (Optional) The JSON payload to send
     * @param {String} mime_type The mime type definition of the payload type
     * @returns {Object} The request response object.
     */
    static async _post(url, username, password, payload, mime_type){
        var request_response = null;

        await axios({
            method: 'post',
            url: url,
            data: payload,
            headers: {
                'User-Agent': `twit-securitynow-downloader`,
                'Content-Type': mime_type
            },
            auth: {
                username: username,
                password: password
            },
            responseType: 'json'
        })
        .then((response) => {
            request_response = response;
        })
        .catch((error) => {
            console.error(`WebRequestService-post: ${error}`);
        });

        if(await request_response){
            return request_response;
        }
        return null;
    }
    
}

module.exports = WebRequestService;