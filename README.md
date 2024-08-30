# Security Now (Twit) Episode and Shownote downloader

This script is designed to allow for the easy downloading and archiving of the Twit podcast Edpisode library and shownotes from grc<dot>com website. Please note that the purpose of this script is purely fair use and in line with the spirit of the SecurityNow community and should not be used to abuse / redistribute the content but rather facilitate the use of the downloaded files for personal purposes only.

The author of this code disclaims any liability for damages or losses resulting from its use. The code is provided “as-is” without any warranties, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose. Users assume full responsibility for any consequences arising from its use or misuse.

## Usage

It is assumed that you have a valid version of node installed and capable of being run on your system. This has been tested with node version 22.2 on MacOS.

### Preparation
* Download the repository
* Run the `npm i` command to install any dependencies

### Running the script
Run the script by using the following syntax:
```
node start.js ~/SecurityNow 1 20
```

* `~/SecurityNow` is the path to an existing directory in my local folder where I want the files downloaded to.
* 1 represents episode #1 as the starting point
* 20 represents edpisode #2 as the last episode to bw downloaded.
