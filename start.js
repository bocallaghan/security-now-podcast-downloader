const path = require('path'); // Import the path module
const DownloadSecurityNowController = require(path.join(process.cwd(), "src", "controllers", "DownloadSecurityNowController.js"));

// Setup the console output configuration.
require('console-stamp')(console, {
    colors: {
        stamp: 'yellow',
        label: 'white'
    },
    extend: {
        debug: 5
    },
    include: ['debug', 'info', 'warn', 'error', 'fatal'],
    level: 'info'
});

console.info("########################################################");
console.info("Security Now Episode and Shownotes downloader");
console.info("Author: Brenton O'Callaghan (callaghan001)");
console.info("version " + require(path.join(process.cwd(),'package.json')).version);
console.info("########################################################");

/**
 * Main function to run the security now episode downloder
 * @param {String} working_directory The working directory to store files that are downloaded
 * @param {Number} startingEpisodeNumber The first episode to be downloaded
 * @param {Number} endingEpisodeNumber The last episode to be downloaded
 */
async function main(working_directory, startingEpisodeNumber, endingEpisodeNumber){

    console.info(`Starting download of SecurityNow episodes from #${startingEpisodeNumber} to #${endingEpisodeNumber}...`);
    for (let episodeNumber = startingEpisodeNumber; episodeNumber <= endingEpisodeNumber; episodeNumber++) {
        
        var downloader = new DownloadSecurityNowController(working_directory, episodeNumber);
        await downloader.download();
        console.info(`\t\tEpisode #${episodeNumber} processed`);
    }
    console.info(`Downloading of SecurityNow episodes from #${startingEpisodeNumber} to #${endingEpisodeNumber} is completed.`);
    process.exit(0);
}

/**
 * Checks if a given number is a valid integer between 1 and 2000.
 *
 * @param {number} num - The number to validate.
 * @returns {boolean} - Returns true if the number is a valid integer between 1 and 2000, false otherwise.
 */
function isValidNumber(num) {
    // Check if 'num' is a valid number and within the range of 1 to 2000
    return !isNaN(num) && num >= 1 && num <= 2000;
}

// ########################################################################
// ################## START OF RUNTIME LOGIC ##############################
// ########################################################################

// Get command line arguments, excluding 'node' and script file name
const args = process.argv.slice(2); 

// If we don't have just two arguments then something is wrong.
if (args.length !== 3) {
  console.error('Please provide exactly three arguments of a working directory to store files in, a starting episode number and an end episode number.');
  console.error(`E.g. ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} ~/securityNow 1 10 `);
  process.exit(1);
}

// Destructure the first three arguments
const [arg1, arg2, arg3] = args;

const workingDirectory = arg1;
const episodeNumber_start = parseInt(arg2, 10); // Convert the first argument to an integer
const episodeNumber_end = parseInt(arg3, 10); // Convert the second argument to an integer

// Check if the numbers provided are valid.
if (!(isValidNumber(episodeNumber_start) && isValidNumber(episodeNumber_end))) {
    console.error('The episode number arguments must be numbers between 1 and 2000.');
    console.error(`E.g. ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} ~/securityNow 1 10 `);
    process.exit(2);
}

// Start the downloader
main(workingDirectory, episodeNumber_start, episodeNumber_end);