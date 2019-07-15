#!/usr/bin/env node

require('dotenv').config()
const pReduce = require('./lib/p-reduce');
const delay = require('./lib/delay');
const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GH_AUTH_TOKEN,
  previews: ['dorian-preview']
})

const [, , ...args] = process.argv
const owner = args
const options = octokit.repos.listForOrg.endpoint.merge({org: owner, type: 'all'})

octokit
  .paginate(options)
  .then(repositories =>
    pReduce(repositories, (repository) => {
      if (repository.archived) {
        return Promise.resolve();
      }
      const repo = repository.name

      return octokit.repos
        .enableVulnerabilityAlerts({
          owner,
          repo
        })
        .then(response => {
          if (response && response.status === 204) {
            console.log(`Success for ${owner}/${repo}`)
          } else {
            console.log(`Failed for ${owner}/${repo}`)
          }
          return delay(500);
        })
        .catch(error => {
          console.error(`Failed for ${owner}/${repo}
${error.message}
${error.documentation_url}
`)
        })
    })
  )
  .catch(error => {
    console.error(`Getting repositories for organization ${owner} failed.
  ${error.message} (${error.status})
  ${error.documentation_url}
`)
  })
