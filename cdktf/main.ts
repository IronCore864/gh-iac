import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import * as github from "@cdktf/provider-github";
import * as fs from 'fs';

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Configure the GitHub provider
    const privateKey = fs.readFileSync('../terraform/gh-iac-test.private-key.pem', 'utf8');
    new github.provider.GithubProvider(this, 'gh', {
      owner: "ironcoreworks",
      appAuth: {
        id: "359910",
        installationId: "39547792",
        pemFile: privateKey
      }
    });

    // Create a new team
    const ainfTeam = new github.team.Team(this, 'ainf', {
      name: 'AINF',
      description: 'AINF team',
      privacy: 'closed',
    });

    // Add members to the team
    new github.teamMembership.TeamMembership(this, 'team-membership', {
      teamId: ainfTeam.id,
      username: 'IronCore864',
      role: 'maintainer',
    });
  }
}

const app = new App();
new MyStack(app, "cdktf");
app.synth();
