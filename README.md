# enable-security-alerts-sample
This repository contains a sample script which can be used to enable security vulnerability alerts in all of the repositories in a given organization. 

### Prerequisites
* Install [Node](https://nodejs.org/en/)
* Clone this repository
* At the commandline, run `npm install`
* [Generate a new personal access token](https://github.com/settings/tokens) with `repo` and `read:org` permissions
* Update `config.json` and include your new personal access token in the `accessToken` value. 

### Calling this script 
* At the commandline, run `node index.js myorgname` where `myorgname` is your organization. This will enable security vulnerability alerts on all private repositories in your organization. 

