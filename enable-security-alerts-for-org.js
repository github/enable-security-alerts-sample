#!/usr/bin/env node

const [, , ...args] = process.argv
var configFile = require('./config.json')

const request = require('request')
const options = {
    headers: {
        'User-Agent': 'request',
        'Authorization': `Bearer ${configFile.accessToken}`,
        'Accept': 'application/vnd.github.dorian-preview+json'
    }
}

// Gets the list of repositories from the organization specified in the commandline arguments
request.get(`https://api.github.com/orgs/${args}/repos`, options, processRepos);


// Processes the response from the repositories call, and then calls the REST API to enable vulnerability alerts on every repository in that organization. 
function processRepos(error, response, body) {
    if (error) console.error('/repos error:', error);
    if (response && response.statusCode != 200) {
        console.log('Getting repos failed with statusCode: ', response && response.statusCode);
    }

    repos = JSON.parse(body);
    for (var i = 0; i < repos.length; i++) {

        request.put(`https://api.github.com/repos/${repos[i].owner.login}/${repos[i].name}/vulnerability-alerts`, options, function (error, response, body) {
            if (error) console.error('error:', error);
            if (response && response.statusCode == 204) {
                console.log(`Success for ${response.request.path}}`)
            } else {
                console.log(`Failed for ${response.request.path}`)
            }
        })
    }

}
