const path = require('path'); // Import the path module
const fs = require('fs').promises; // Import the promises API of the fs module
const WebRequestService = require(path.join(process.cwd(), "src", "services", "WebRequestService.js"));


/**
 * @fileoverview The controller for downloading a security now episode
 * @package twit-securitynow-downloader  
 */
class DownloadSecurityNowEpisodeController {

    // Base URLS used during downloads.
    audioBaseURL = `https://media.grc.com/sn/sn-{{episodeNumber}}.mp3`;
    pdfBaseURL = `https://www.grc.com/sn/sn-{{episodeNumber}}-notes.pdf`;
    pdfBaseURL_alternative = `https://www.grc.com/sn/sn-{{episodeNumber}}.pdf`;

    // Episode number information
    episodeNumber = null;
    episodeFolder = null;

    // PDF download variables.
    pdfURL = null;
    pdfURL_alt1 = null;
    pdfPath = null;
    pdfDownloaded = false;

    // Audio download variables.
    audioURL = null;
    audioPath = null;
    audioDownloaded = false;

    /**
     * Instanciate a security now episode downloader.
     * @param {String} working_directory The working directory where files will be downloaded to
     * @param {Number} episode_number The current number of the security now episode being processed.
     */
    constructor(working_directory, episode_number) {

        this.episodeNumber = episode_number
        this.episodeFolder = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber));

        this.pdfPath = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber), `securityNow-episode-${this.formatEpisodeNumber(this.episodeNumber)}-showNotes.pdf`);
        this.pdfURL = this.pdfBaseURL.replace("{{episodeNumber}}", this.formatEpisodeNumber(this.episodeNumber));
        this.pdfURL_alt1 = this.pdfBaseURL_alternative.replace("{{episodeNumber}}", this.formatEpisodeNumber(this.episodeNumber));

        this.audioPath = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber), `securityNow-episode-${this.formatEpisodeNumber(this.episodeNumber)}-audio.mp3`);
        this.audioURL = this.audioBaseURL.replace("{{episodeNumber}}", this.formatEpisodeNumber(this.episodeNumber));
    }

    /**
     * Trigger the download of the current Security Now episode
     */
    async download() {

        // Make the directory for the target files
        try {
            await fs.mkdir(this.episodeFolder, { recursive: true });
        } catch (err) {
            console.error(`An error occurred while creating the directory at ${newFolder}:`);
            console.error(`\tDownloading of episode #${this.episodeNumber} will be skipped.`);
            console.error(`\t${err}`);
            return;
        }

        // Download the Show Notes PDF first
        try {
            this.pdfDownloaded = await DownloadSecurityNowEpisodeController.#_downloadFileToDestination(this.pdfURL, this.pdfPath);
            if (!this.pdfDownloaded) {

                this.pdfDownloaded = await DownloadSecurityNowEpisodeController.#_downloadFileToDestination(this.pdfURL_alt1, this.pdfPath);
                if (!this.pdfDownloaded) {
                    console.error(`\tThe PDF show notes for Security Now episode #${this.episodeNumber} could not be downloaded after trying both URL types.`);
                    console.error(`\t\tURL type 1: ${this.pdfURL}`);
                    console.error(`\t\tURL type 2: ${this.pdfURL_alt1}`);
                    console.error(`\t\tDestination: ${this.pdfPath}`);
                    console.error(`\t\tThis might be because it was a "best of" episode with no show notes e.g. #954`)
                }
            }
        } catch (error) {
            console.error(`The PDF show notes for Security Now episode #${this.episodeNumber} failed fatally.`);
            console.error(`\tURL: ${this.pdfURL}`);
            console.error(`\t\tDestination: ${this.pdfPath}`);
            console.error(`\t\tError: ${error}`)
        }

        // Download the podcast audio second
        try {
            this.audioDownloaded = await DownloadSecurityNowEpisodeController.#_downloadFileToDestination(this.audioURL, this.audioPath);
            if (!this.audioDownloaded) {
                console.error(`\tThe audio for Security Now episode #${this.episodeNumber} could not be downloaded.`);
                console.error(`\t\tURL: ${this.audioURL}`);
                console.error(`\t\tDestination: ${this.audioPath}`);
            }
        } catch (error) {
            console.error(`\tThe audio for Security Now episode #${this.episodeNumber} failed fatally.`);
            console.error(`\t\tURL: ${this.audioURL}`);
            console.error(`\t\tDestination: ${this.audioPath}`);
            console.error(`\t\tError: ${error}`)
        }
    }

    /**
     * Format an episode number e.g. 6 as a Security Now episode number e.g. 006
     * @param {Number} episodeNumber The episode number to format as a string
     * @returns {String} The formatted security now episode number e.g. 007
     */
    formatEpisodeNumber(episodeNumber) {

        if (episodeNumber < 10) {
            return "00" + episodeNumber;
        } else if (episodeNumber < 100) {
            return "0" + episodeNumber;
        }
        return "" + episodeNumber;
    }

    /**
     * Download a file from a given URL to a speciic target file.
     * @param {String} url The full URL of the file to be downloaded
     * @param {String} destination_path The path to store the downloaded file (including the filename and extension)
     * @returns {Boolean} True if successful and false if not.
     */
    static async #_downloadFileToDestination(url, destination_path){

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

module.exports = DownloadSecurityNowEpisodeController;