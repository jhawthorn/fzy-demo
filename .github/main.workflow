workflow "Deploy to gh-pages" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
}

action "Build" {
  uses = "actions/npm@master"
  args = "run predeploy"
  needs = ["Install dependencies"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  needs = ["Build"]
  args = "branch master"
}

action "Deploy" {
  uses = "actions/npm@master"
  needs = ["Filters for GitHub Actions"]
  args = "run gh-deploy"
  secrets = ["GITHUB_TOKEN"]
}
