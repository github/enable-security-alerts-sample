# enable-security-alerts-sample
This repository contains a sample script which can be used to enable security vulnerability alerts in all of the repositories in a given organization. 

This project is a being provided as a sample only which illustrates how to [enable vulnerability alerts](https://developer.github.com/v3/repos/#enable-vulnerability-alerts) in all repositories in a given organization. 

### Prerequisites
* Install [Node](https://nodejs.org/en/)
* Clone this repository
* At the commandline, run `npm install`
* [Generate a new personal access token](https://github.com/settings/tokens) with `repo` and `read:org` permissions
* Update `config.json` and include your new personal access token in the `accessToken` value. 

### Calling this script 
* At the commandline, run `node index.js myorgname` where `myorgname` is your organization. This will enable security vulnerability alerts on all private repositories in your organization. 

### Contributing
If you'd like to contribute to this sample with fixes, or support for other platforms, please follow the [contribution guidelines](CONTRIBUTING.md).

### License
This project is available under the MIT license. 