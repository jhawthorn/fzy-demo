var ghpages = require('gh-pages');

var callback = function(err) {
  if (err) {
    console.error("Deploy failed");
    console.error(err);
    process.exit(1);
  }
}

var GH_TOKEN = process.env.GITHUB_TOKEN;
var GH_REPO = process.env.GITHUB_REPOSITORY;

if (!GH_TOKEN) {
  console.error("GITHUB_TOKEN environment variable must be set");
  process.exit(1);
}

if (!GH_REPO) {
  console.error("GITHUB_REPOSITORY environment variable must be set");
  process.exit(1);
}

ghpages.publish('build', {
  repo: 'https://x-access-token:' + GH_TOKEN + '@github.com/' + GH_REPO + '.git',
  user: {
    name: 'John Hawthorn',
    email: 'john@hawthorn.email'
  }
}, callback);
