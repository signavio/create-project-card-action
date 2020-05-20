import * as core from '@actions/core'
import {GitHub, context} from '@actions/github'

async function run(): Promise<void> {
  try {
    const octokit = new GitHub(core.getInput('github_token'))
    const columnId = +core.getInput("column_id")
    const ignoreDrafts = core.getInput('ignore_drafts')
    
    const owner = context.repo.owner
    const repo = context.repo.repo
    const pr_number = Number(context.payload.pull_request?.number)
    const prId = context.payload.pull_request?.id

    const promise = octokit.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: pr_number,
    })

    promise.then(
        (result) => {
          console.log(result.data.draft)
        },
        error => {
          console.log(error)
        }
    )

    // const isDraft = result.data.draft   
    //   if(ignoreDrafts){
    //   if(!isDraft) {
    //     createCard(octokit, columnId, prId)
    //   }
    // } else {
    //   createCard(octokit,columnId, prId)
    // }  
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
