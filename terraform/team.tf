# Add a team to the organization
resource "github_team" "ainf" {
  name        = "ainf"
  description = "AINF"
  privacy     = "closed"
}
