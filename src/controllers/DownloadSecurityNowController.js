const path = require('path'); // Import the path module
const fs = require('fs').promises; // Import the promises API of the fs module
const DownloadController = require(path.join(process.cwd(), "src", "controllers", "DownloadController.js"));

/**
 * @fileoverview The controller for downloading a security now episode
 * @package twit-securitynow-downloader  
 */
class DownloadSecurityNowEpisodeController {

    audioBaseURL = `https://media.grc.com/sn/sn-{{episodeNumber}}.mp3`;
    pdfBaseURL = `https://www.grc.com/sn/sn-{{episodeNumber}}-notes.pdf`;
    pdfBaseURL_alternative = `https://www.grc.com/sn/sn-{{episodeNumber}}.pdf`;

    episodeNumber = null;
    episodeNumberFull = null;
    episodeFolder = null;

    pdfURL = null;
    pdfURL_alt1 = null;
    pdfPath = null;
    pdfDownloaded = false;

    audioURL = null;
    audioPath = null;
    audioDownloaded = false;

    constructor(working_directory, episode_number) {

        this.episodeNumber = episode_number
        this.episodeFolder = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber));

        this.pdfPath = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber), `securityNow-episode-${this.formatEpisodeNumber(this.episodeNumber)}-showNotes.pdf`);
        this.pdfURL = this.pdfBaseURL.replace("{{episodeNumber}}",this.formatEpisodeNumber(this.episodeNumber));
        this.pdfURL_alt1 = this.pdfBaseURL_alternative.replace("{{episodeNumber}}",this.formatEpisodeNumber(this.episodeNumber));

        this.audioPath = path.join(working_directory, this.formatEpisodeNumber(this.episodeNumber), `securityNow-episode-${this.formatEpisodeNumber(this.episodeNumber)}-audio.mp3`);
        this.audioURL = this.audioBaseURL.replace("{{episodeNumber}}",this.formatEpisodeNumber(this.episodeNumber));
    }

    async download(){

        // Make the directory for the target files
        try {
            await fs.mkdir(this.episodeFolder, { recursive: true });
          } catch (err) {
            console.error(`An error occurred while creating the directory at ${newFolder}:`, err);
            return;
          }

        try {
            this.pdfDownloaded = await DownloadController.downloadFileToDestination(this.pdfURL, this.pdfPath);
            if(!this.pdfDownloaded){

                this.pdfDownloaded = await DownloadController.downloadFileToDestination(this.pdfURL_alt1, this.pdfPath);
                if(!this.pdfDownloaded){
                    console.error(`\tThe PDF show notes for SecurityNow episode #${this.episodeNumber} could not be downloaded after trying both URL types.`);
                    console.error(`\t\tURL type 1: ${this.pdfURL}`);
                    console.error(`\t\tURL type 2: ${this.pdfURL_alt1}`);
                    console.error(`\t\tDestination: ${this.pdfPath}`);
                }
            }
        } catch (error) {
            console.error(`The PDF show notes for SecurityNow episode #${this.episodeNumber} failed fatally.`);
            console.error(`\tURL: ${this.pdfURL}`);
            console.error(`\t\tDestination: ${this.pdfPath}`);
            console.error(`\t\tError: ${error}`)
        }

        try {
            this.audioDownloaded = await DownloadController.downloadFileToDestination(this.audioURL, this.audioPath);
            if(!this.audioDownloaded){
                console.error(`\tThe audio for SecurityNow episode #${this.episodeNumber} could not be downloaded.`);
                console.error(`\t\tURL: ${this.audioURL}`);
                console.error(`\t\tDestination: ${this.audioPath}`);
            }
        } catch (error) {
            console.error(`\tThe audio for SecurityNow episode #${this.episodeNumber} failed fatally.`);
            console.error(`\t\tURL: ${this.audioURL}`);
            console.error(`\t\tDestination: ${this.audioPath}`);
            console.error(`\t\tError: ${error}`)
        }
    }

    formatEpisodeNumber(episodeNumber){

        if(episodeNumber < 10){
            return "00" + episodeNumber;
        } else if(episodeNumber < 100){
            return "0" + episodeNumber;
        }
        return "" + episodeNumber;
    }
}

module.exports = DownloadSecurityNowEpisodeController;