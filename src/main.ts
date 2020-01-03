import * as core from '@actions/core'
import {GitHub, context} from '@actions/github'

async function run(): Promise<void> {
  try {
    const octokit = new GitHub(core.getInput('github_token'))
    const columnId = +core.getInput("column_id")
    
    octokit.projects.createCard({
      column_id: columnId,
      content_id: context.issue.number,
      content_type: 'PullRequest'
    })
   
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
