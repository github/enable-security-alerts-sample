# Enable security alerts and automated security fixes sample
This repository contains sample scripts for Node and Bash which can be used to enable security alerts and automated security fixes in all of the repositories in a given organization. 

This project is a being provided as a sample only which illustrates how to [enable vulnerability alerts](https://developer.github.com/v3/repos/#enable-vulnerability-alerts) and [enable automated security fixes](https://developer.github.com/v3/repos/#enable-automated-security-fixes) in all repositories in a given organization.

## Node script

### Prerequisites
* Install [Node](https://nodejs.org/en/)
* Clone this repository
* At the commandline, run `npm install`
* [Generate a new personal access token](https://github.com/settings/tokens) with `repo` and `read:org` permissions
* Copy `.env.example` to `.env` and include your new personal access token in the `GH_AUTH_TOKEN` value.

### Calling this script to enable security alerts
* At the commandline, run `node enable-security-alerts-for-org.js myorgname` where `myorgname` is your organization. This will enable security alerts on all repositories in your organization.

### Calling this script to enable automated security fixes

**You'll need to enable security alerts before you can enable automated security fixes**

* At the commandline, run `node enable-automated-security-fixes-for-org.js myorgname` where `myorgname` is your organization. This will enable security alerts on all repositories in your organization.

## Shell script

### Prerequisites
* Ensure that you have `bash` shell available on your system. If you're running Windows, additional setup may be required. [How to install Bash on Windows 10](https://www.windowscentral.com/how-install-bash-shell-command-line-windows-10)
* [Generate a new personal access token](https://github.com/settings/tokens) with `repo` and `read:org` permissions

### Calling this script to enable security alerts
* At the commandline, run `./shell_script/enable_vulnerability_alerts_for_entire_org.sh myorgname accessToken` where `myorgname` is your organization, and `accessToken` is the personal access token you generated earlier. 

### Calling this script to enable automated security fixes

**You'll need to enable security alerts before you can enable automated security fixes**

* At the commandline, run `./shell_script/enable_automated_security_fixes_for_entire_org.sh myorgname accessToken` where `myorgname` is your organization, and `accessToken` is the personal access token you generated earlier. 

### Contributing
If you'd like to contribute to this sample with fixes, or support for other platforms, please follow the [contribution guidelines](CONTRIBUTING.md).

### License
This project is available under the MIT license. 
