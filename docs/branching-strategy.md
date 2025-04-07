# Branching and Forking Strategy

## Trunk-Based Development

We follow trunk-based development practices, using a single `main` branch as our trunk. This approach enables:
- Faster integration
- Shorter-lived feature branches
- Reduced merge conflicts
- Continuous deployment
- Better collaboration

## Branch Types

### Main Branch
- `main` - The trunk, always deployable
  - All feature work integrates here
  - Protected branch with CI/CD checks
  - Source of all deployments

### Supporting Branches
- `feature/*` - Short-lived feature branches (1-2 days max)
- `fix/*` - Quick bug fixes
- `hotfix/*` - Emergency production fixes
- `docs/*` - Documentation updates

## Branch Naming Convention
- Use lowercase with hyphens
- Include issue/ticket number when applicable
- Format: `type/issue-description`
- Examples:
  - `feature/123-add-multiplayer`
  - `fix/456-ball-collision`
  - `hotfix/789-server-crash`
  - `docs/234-update-api-docs`

## Forking Workflow
1. External contributors:
   - Fork the repository
   - Create feature branch in fork
   - Submit PR to main branch
   - Keep changes small and focused

2. Core team members:
   - Create short-lived branches from main
   - Integrate changes frequently (at least daily)
   - Submit PR to main branch

## Branch Protection Rules
1. `main` branch:
   - No direct pushes
   - Require PR reviews (minimum 1)
   - Require status checks to pass
   - Require up-to-date branches
   - Enforce linear history
   - Auto-deploy when green

## Merging Strategy
1. Feature branches:
   - Keep changes small
   - Merge to main frequently
   - Use squash merging
   - Clean, descriptive commit message

2. Hotfix branches:
   - Create directly from main
   - Fix and test thoroughly
   - Merge directly to main
   - Deploy immediately

## Branch Lifecycle
1. Creation:
   ```bash
   git checkout -b feature/123-feature-name main
   ```

2. Updates:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

3. Completion:
   - Create PR
   - Address reviews
   - Squash and merge
   - Delete branch immediately after merge

## Code Review Requirements
1. All PRs must:
   - Be small and focused
   - Reference issue/ticket
   - Include tests
   - Pass CI/CD checks
   - Have up-to-date dependencies
   - Follow code style guidelines

2. Reviewers should check:
   - Code quality
   - Test coverage
   - Performance impact
   - Security implications
   - Documentation updates

## Feature Flags
- Use feature flags for larger changes
- Enable trunk-based development for bigger features
- Control feature rollout in production
- Decouple deployment from release

## Commit Guidelines
1. Format:
   ```
   type(scope): description

   [optional body]
   [optional footer]
   ```

2. Types:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation
   - style: Formatting
   - refactor: Code restructuring
   - test: Adding tests
   - chore: Maintenance

## Version Control Best Practices
1. Keep branches short-lived (1-2 days max)
2. Integrate with main branch daily
3. Write clear commit messages
4. Delete merged branches immediately
5. Keep PRs small and focused

## Conflict Resolution
1. Rebase your branch:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. If conflicts occur:
   - Resolve in your editor
   - Continue rebase
   - Force push if necessary

## Emergency Hotfix Process
1. Create hotfix branch from main
2. Fix issue and test thoroughly
3. Create PR for main
4. Deploy immediately after merge

## Branch Cleanup
1. Automated:
   - Delete branches after merge
   - Prune stale branches daily

2. Manual:
   - Review and delete old branches
   - Clean up local branches

## Continuous Integration
- All PRs must pass CI before merge
- Automated tests run on every push
- Code quality checks automated
- Performance benchmarks tracked 