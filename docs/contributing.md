# Contributing to Pang

Thank you for your interest in contributing to Pang! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/pang.git`
3. Create a new branch following our naming convention
4. Make your changes
5. Push to your fork
6. Open a Pull Request

## Issue Classification

Before creating a new issue, please determine which category it falls into:

### Tasks and Features
- Development tasks and new features should be added to the **Project Board**
- Examples of tasks:
  - Implementing new features
  - Creating 3D models
  - Setting up systems (physics, networking, etc.)
  - Performance optimizations
  - Documentation work

### Bugs and Questions
- Bugs and questions should be created as **GitHub Issues**
- Examples of bugs/questions:
  - Game crashes or errors
  - Unexpected behavior
  - Performance issues
  - Clarification needed about functionality
  - Technical questions

## Issue Labels

All issues should include appropriate labels:

1. Component Labels (at least one required):
   - `server`: Server-related issues
   - `web-client`: Web client issues
   - `mobile-client`: Mobile client issues

2. Priority Labels (one required):
   - `critical`: Blocks core functionality (P0)
   - `high`: Affects major features (P1)
   - `medium`: Affects minor features (P2)
   - `low`: Cosmetic or minor issues (P3)

3. Type Labels (required):
   - `bug`: For bug reports
   - `enhancement`: For feature requests
   - `documentation`: For documentation updates

## Task Template

When adding a task to the project board, please use this template:

```markdown
## Description
[A clear and concise description of the task]

## Story Points
[SP] - [Reason for estimate]

## Requirements
- [Requirement 1]
- [Requirement 2]
- [etc.]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [etc.]

## Priority
[P0/P1/P2/P3] - [Critical/High/Medium/Low]

## Dependencies
- [Dependency 1]
- [Dependency 2]

## Blockers for
- [Task/Feature blocked by this]
```

## Bug Report Template

When creating a bug report, please use this template:

```markdown
## Description
[A clear and concise description of the bug]

## Impact
[Describe the impact of this bug]

## Steps to Reproduce
1. [First Step]
2. [Second Step]
3. [and so on...]

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g. Windows 10, macOS 12.0]
- Browser/Device: [e.g. Chrome 96, iPhone 13]
- Game Version: [e.g. 1.0.0]

## Additional Information
- Screenshots/Videos: [If applicable]
- Error Messages: [If any]
- Logs: [If available]
- Reproduction Rate: [How often the issue occurs]
```

## Development Workflow

1. **Check Project Board First**
   - Before starting work, check the project board for existing tasks
   - If your work isn't tracked, add it as a new task

2. **Check Issues for Bugs**
   - Review existing bug reports before reporting new ones
   - Search closed issues to avoid duplicates

3. **Branch Naming**
   - For tasks: `feature/task-description`
   - For bugs: `fix/bug-description`

4. **Commit Messages**
   - Follow our [Commit Convention](commit-convention.md)
   - Start with type: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
   - Include task/issue reference if applicable
   - Keep messages clear and concise

5. **Development Rules**
   - Follow our [Development Rules](development-rules.md)
   - Write tests for new features
   - Update documentation as needed
   - Ensure all tests pass

## Story Points Scale
Story points follow the Fibonacci sequence:
- 1 SP: Trivial task
- 2 SP: Simple task
- 3 SP: Small task
- 5 SP: Medium task
- 8 SP: Large task
- 13 SP: Complex task
- 21 SP: Very complex task

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation in the `docs` directory
3. The PR must pass all CI checks
4. You must have the sign-off of at least one other developer
5. Reference related tasks or issues

## Code of Conduct

- Be respectful and inclusive
- Focus on what's best for the community
- Show empathy towards other community members
- Be open to constructive feedback
- Be mindful of your language and actions

## Questions or Need Help?

If you have questions or need help:
1. Check existing documentation
2. Search closed issues
3. Create a new issue with the question tag
4. Join our community chat
5. Contact the maintainers

Thank you for contributing to Pang! 