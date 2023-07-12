# Use Terraform to Manage GitHub Teams and Membership

## 1 Prerequisites

### 1.1 GitHub App

We use GitHub App as the authentication method for Terraform.

Create a GitHub App. See [the official doc here](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) for more details.

Take note of
- app_id
- installation_id

Then, create, download and store a private key for the GitHub App. Name the downloaded private key file as `gh-iac-test.private-key.pem`, and put it under the `ROOT_OF_THIS_REPO/terraform` folder.

These will be used in the GitHub provider config.

### 1.2 Environment Variables

```bash
unset GITHUB_ORGANIZATION
unset GITHUB_OWNER
```

This is because for backwards compatibilities, if both GITHUB_OWNER, GITHUB_ORGANIZATION and owner (in the provider config) are set, the two ENV vars above take higher priority. See [here](https://registry.terraform.io/providers/integrations/github/latest/docs#authentication) for more detail.

_Note: in this demo, we are reading the private key file locally, and this SHOUT NOT be done in production. In production, try storing sensitive information in a secrets manager, and use Terraform data to read from the secrets manager._

---

## 2 Config

Use your favourite editor to edit the `ROOT_OF_THIS_REPO/terraform/variables.tf` file to update the default values.

Alternatively, create a file `ROOT_OF_THIS_REPO/terraform.tfvars`, and set the values there. See `ROOT_OF_THIS_REPO/terraform/terraform.tfvars.sample` as an example.

---

## 3 Init/Apply

```bash
terraform init
terraform apply
```

---

## 4 Result

Teams:

![](./images/teams.png)

Members:

![](./images/members.png)

---

## 5 Where to Go from Here

Use Terraform [module](https://developer.hashicorp.com/terraform/language/modules/develop) and maybe the [for_each Meta-Argument](https://developer.hashicorp.com/terraform/language/meta-arguments/for_each) to manage teams and team memberships, so that the input can be only a simple list and the code loops through it to add them into teams.

---

## 6 Tear Down

```bash
terraform destroy
```

Then delete the GitHub App from the organization.
