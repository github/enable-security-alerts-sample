#!/usr/bin/env node

require('dotenv').config()

const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GH_AUTH_TOKEN,
  previews: ['dorian-preview']
})

const [, , ...args] = process.argv
const owner = args
const options = octokit.repos.listForOrg.endpoint.merge({ org: owner, type: 'all' })
const RequestPromises = []

octokit
  .paginate(options)
  .then(repositories => {
    for (const repository of repositories) {
      if (!repository.archived) {
        const repo = repository.name
        RequestPromises.push(octokit.repos.checkVulnerabilityAlerts({
          owner,
          repo
        }).then(response => {
          return true
        }).catch(error => {
          return `${owner}/${repo}`
        }))
      }
    }

    Promise.all(RequestPromises).then(responses => {
      if (responses.every(value => { return value === true })) {
        console.log('Success! All repos have security vulnerability alerts enabled')
      } else {
        const reposWithoutVulnerabilityAlerts = responses.filter(result => result !== true)
        console.log(`Failure! Repos without security vulnerability alerts enabled:
          ${reposWithoutVulnerabilityAlerts}
        `)
      }
    })
  })
