import * as core from '@actions/core'
import {GitHub, context} from '@actions/github'

async function run(): Promise<void> {
  try {
    const octokit = new GitHub(core.getInput('github_token'))
    const columnId = +core.getInput("column_id")
    const ignoreDrafts = core.getInput('ignore_drafts')

    console.log(ignoreDrafts)

    const isDraft = context.payload.pull_request?.isDraft
    const prId = context.payload.pull_request?.id

    if(ignoreDrafts){
      if(!isDraft) {
        createCard(octokit, columnId, prId)
      }
    } else {
      createCard(octokit,columnId, prId)
    }
    
   
  } catch (error) {
    core.setFailed(error.message)
  }
}

function createCard(octokit: GitHub, columnId:number, prId:number) {
  octokit.projects.createCard({
    column_id: columnId,
    content_id: prId,
    content_type: 'PullRequest'
  })
}

run()
