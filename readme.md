# Create-project-card-action
Will create a card for a created pull request on a given board in a given column. 

## Disclaimer
This action at the moment only works with pull requests, not with issues. 
In order to make it work with issues the impl would need to be extended in a way that it checks if the payload is an issue or an pullrequest.

## Inputs
**Required** `column_id` is the id of the column where the card should be created
**Required** `github_token` a github token that has access to create a card on an organization wide project board 

## Token
In order to make that action work, it is necessary to provide a token that has the permission to create a card on an organization wide board. 
The very own GitHub Secrets token is not enough for that case. 
You will need to create a personal access token (I used one from a bot user) and add that your repos secret:
Go to settings -> secrets and add the token with a name of you choice. 
I chose __GITHUB_GLOBAL_TOKEN__ to be close to the original token. 

## ColumnId
Column ids are globally unique on GitHub, which is why this action does not need anything else, like the project id or URL. 
To find out the id go to your project board, open your browsers development tools and inspect the column that you want pull request cards to be placed in.

## Example usage

```yml
name: Add PR to SWA dev board
on: 
  pull_request:
    types: [opened]
jobs:
  add-project-card-to-board:
    runs-on: ubuntu-latest
    steps:
    - name: 'Add card to project board'
      uses: signavio/create-project-card-action@v1
      with:
         column_id: 3019999
         github_token: ${{ secrets.GITHUB_GLOBAL_TOKEN }}
```

## Release 
In order to release do the following:
1. Do your changes
2. Create a branch `release/3` and checkit out: `git checkout -b release/3`
3. Do `npm install && npm run build && npm prune --production`
4. Add `node_modules` and `lib` to git: `git add node_modules lib -f` (use `-f` to force add since its ignored by `.gitignore`)
5. Commit modules and lib: `git commit . -m "release 3"`
6. Push your changes to the release branch: `git push origin release/3`  
7. To verify that everything works set your branch as `uses` in an actions workflow, e.g. `uses: signavio/create-project-card-action@release/3`
8. When verified that everything is working tag that version using `git tag v3` and push the tag: `git push --tags` 
9. In your action configuration in the GitHub actions workflow use the new released version `uses: signavio/create-project-card-action@v3`
10. Celebrate great success
