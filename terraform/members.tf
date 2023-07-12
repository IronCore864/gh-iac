resource "github_team_membership" "ainf_ironcore864" {
  team_id  = github_team.ainf.id
  username = "IronCore864"
  role     = "maintainer"
}
