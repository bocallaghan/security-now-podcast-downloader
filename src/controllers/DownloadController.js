const path = require('path'); // Import the path module
const WebRequestService = require(path.join(process.cwd(), "src", "services", "WebRequestService.js"));
const fs = require('fs').promises; // Import the promises API of the fs module

/**
 * @fileoverview The controller for downloading files
 * @package twit-securitynow-downloader  
 */
class DownloadController {

    constructor() {
        console.error("DownloadController: You do not need to instantiate this class. Please use statically.");
    }

    static async downloadFileToDestination(url, destination_path){

        var fileContents;
        
        // Download the file
        try {
            fileContents = await WebRequestService.get(url); 
            if(fileContents === null){
                return false;
            }
        } catch (error) {
            console.error(`DownloadController: Error downloading file from ${url}`);
            console.error(error);
            return false;
        }

        // Write the result to a file.
        try {
            await fs.writeFile(destination_path, fileContents.data);
            console.debug(`DownloadController: File ${destination_path} successfully written.`)   
        } catch (error) {
            console.error(`DownloadController: Error writing the downloaded content to the file ${destination_path}`);
            console.error(error);
            return false;
        }
        return true;
    }
    
}

module.exports = DownloadController;