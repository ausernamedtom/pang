# Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. This convention dovetails with [SemVer](https://semver.org/), by describing the features, fixes, and breaking changes made in commit messages.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or modifying tests
- `chore`: Changes to the build process or auxiliary tools

## Scopes

Scopes are optional but recommended. They should be lowercase and describe the part of the codebase affected:

- `client`: Frontend changes
- `server`: Backend changes
- `shared`: Changes to shared code
- `docs`: Documentation changes
- `ci`: CI/CD related changes

## Examples

```
feat(client): add paddle movement controls
fix(server): resolve socket connection issues
docs: update contributing guidelines
style: format code with prettier
refactor(shared): improve type definitions
test: add unit tests for physics engine
chore: update dependencies
```

## Breaking Changes

Breaking changes should be indicated in the footer with `BREAKING CHANGE:` followed by a description of the change:

```
feat(api): change response format

BREAKING CHANGE: The API response format has been changed to include additional metadata.
```

## Why Use Conventional Commits?

- Automatically generating CHANGELOGs
- Automatically determining a semantic version bump
- Communicating the nature of changes to team members
- Triggering build and publish processes
- Making it easier for people to contribute to your projects 