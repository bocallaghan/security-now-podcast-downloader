# Security Now (Twit) Episode and Shownote downloader

This script is designed to allow for the easy downloading and archiving of the SecurityNow podcast Edpisode library and shownotes from grc<dot>com website. Please note that the purpose of this script is purely fair use and in line with the spirit of the SecurityNow community and should not be used to abuse / redistribute the content but rather facilitate the use of the downloaded files for personal purposes only.

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
* 20 represents edpisode #2 as the last episode to be downloaded.


### Output

The output should look something like this:

```
% node start.js ~/SecurityNow 1 20                                  
[30.08.2024 13:07.17.777] [INFO]  ########################################################
[30.08.2024 13:07.17.779] [INFO]  Security Now Episode and Shownotes downloader
[30.08.2024 13:07.17.779] [INFO]  Author: Brenton O'Callaghan (callaghan001)
[30.08.2024 13:07.17.779] [INFO]  version 1.0.0
[30.08.2024 13:07.17.779] [INFO]  ########################################################
[30.08.2024 13:07.17.779] [INFO]  Starting download of SecurityNow episodes from #1 to #20...
[30.08.2024 13:07.21.560] [INFO]                Episode #1 processed
[30.08.2024 13:07.24.510] [INFO]                Episode #2 processed
[30.08.2024 13:07.27.463] [INFO]                Episode #3 processed
[30.08.2024 13:07.30.319] [INFO]                Episode #4 processed
[30.08.2024 13:07.33.123] [INFO]                Episode #5 processed
[30.08.2024 13:07.35.879] [INFO]                Episode #6 processed
[30.08.2024 13:07.38.872] [INFO]                Episode #7 processed
[30.08.2024 13:07.41.722] [INFO]                Episode #8 processed
[30.08.2024 13:07.44.656] [INFO]                Episode #9 processed
[30.08.2024 13:07.47.581] [INFO]                Episode #10 processed
[30.08.2024 13:07.50.607] [INFO]                Episode #11 processed
[30.08.2024 13:07.53.440] [INFO]                Episode #12 processed
[30.08.2024 13:07.56.437] [INFO]                Episode #13 processed
[30.08.2024 13:07.59.329] [INFO]                Episode #14 processed
[30.08.2024 13:08.02.562] [INFO]                Episode #15 processed
[30.08.2024 13:08.05.788] [INFO]                Episode #16 processed
[30.08.2024 13:08.08.782] [INFO]                Episode #17 processed
[30.08.2024 13:08.11.734] [INFO]                Episode #18 processed
[30.08.2024 13:08.14.908] [INFO]                Episode #19 processed
[30.08.2024 13:08.18.063] [INFO]                Episode #20 processed
[30.08.2024 13:08.18.063] [INFO]  Downloading of SecurityNow episodes from #1 to #20 is completed.

```