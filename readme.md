# Create-project-card-action
Will create a card for a created pull request on a given board in a given column. 

## Release 
In order to release do the following:
1. Do your changes
2. Create a branch `release/3` and checkit out: `git checkout -b release/3`
3. Do `npm install && npm run build && npm prune --production`
4. Add `node_modules` and `lib` to git: `git add node_modules lib -f` (use `-f` to force add since its ignored by `.gitignore`)
5. Push your changes to the release branch: `git push origin release/3`  
6. To verify that everything works set your branch as `uses` in an actions workflow, e.g. `uses: signavio/create-project-card-action@release/3`
7. When verified that everything is working tag that version using `git tag v3` and push the tag: `git push --tags` 
8. In your action configuration in the GitHub actions workflow use the new released version `uses: signavio/create-project-card-action@v3`
9. Celebrate great success

## Inputs
**Required** `column_id` is the id of the column where the card should be created
**Required** `github_token` the github secret token, github provides that thing on its own.

## Example usage

```yml
uses: signavio/create-project-card-action@v1
with:
  column_id: 3019999
  github_token: ${{ secrets.GITHUB_TOKEN }}
```
