#!/usr/bin/env node

require('dotenv').config()

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
  .then(repositories => {
    for (const repository of repositories) {
      if (!repository.archived) {
        const repo = repository.name

        octokit.repos
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
          })
          .catch(error => {
            console.error(`Failed for ${owner}/${repo}
  ${error.message}
  ${error.documentation_url}
`)
          })
      }
    }
  })
  .catch(error => {
    console.error(`Getting repositories for organization ${owner} failed.
  ${error.message} (${error.status})
  ${error.documentation_url}
`)
  })
