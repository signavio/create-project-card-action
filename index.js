const core = require("@actions/core");
const github = require("@actions/github");

try {
  const octokit = github.getOctokit(core.getInput("github_token"));

  const columnId = +core.getInput("column_id");
  const ignoreDrafts = core.getInput("ignore_drafts");

  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;
  const pr_number = Number(github.context.payload.pull_request.number);
  const prId = github.context.payload.pull_request.id;

  const promise = octokit.pulls.get({
    owner: owner,
    repo: repo,
    pull_number: pr_number,
  });

  promise.then(
    (result) => {
      const isDraft = result.data.draft;
      if (ignoreDrafts) {
        if (!isDraft) {
          octokit.projects.createCard({
            column_id: columnId,
            content_id: prId,
            content_type: "PullRequest",
          });
        }
      } else {
        octokit.projects.createCard({
          column_id: columnId,
          content_id: prId,
          content_type: "PullRequest",
        });
      }
    },
    (error) => {
      core.setFailed(error);
    }
  );
} catch (error) {
  core.setFailed(error.message);
}
