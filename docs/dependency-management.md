# Dependency Management

We use Renovate Bot to keep our dependencies up to date. The bot:
- Runs every weekend to check for updates
- Automatically creates PRs for dependency updates
- Groups related dependencies together
- Automatically merges non-breaking dev dependency updates
- Flags security vulnerabilities with high priority
- Maintains semantic versioning

## Update Strategy
- Minor/patch updates to dev dependencies are auto-merged
- Production dependency updates require review
- Major version updates are grouped separately
- Security updates are labeled and prioritized
- Updates are tested before merging

See `.github/renovate.json` for the full configuration. 