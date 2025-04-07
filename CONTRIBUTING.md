# Contributing to Pang

Thank you for your interest in contributing to Pang! This document provides guidelines and instructions for contributing to the project.

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
- Tasks should include:
  - Clear description
  - Story points estimate (using Fibonacci: 1, 2, 3, 5, 8, 13, 21)
  - Requirements
  - Acceptance criteria
  - Dependencies and blockers
  - Priority level (P0-P3)

### Bugs and Questions
- Bugs and questions should be created as **GitHub Issues**
- Examples of bugs/questions:
  - Game crashes or errors
  - Unexpected behavior
  - Performance issues
  - Clarification needed about functionality
  - Technical questions
- Bug reports should include:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details
  - Screenshots/videos if applicable
  - Error messages/logs if available

## Bug Report Template

When creating a bug report, please use this template:

```markdown
## Description
[A clear and concise description of the bug]

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
```

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

## Priority Levels
- P0: Critical - Must be completed first
- P1: High - Essential for basic game functionality
- P2: Medium - Important for good user experience
- P3: Low - Nice to have, can be completed later

## Story Points Scale
Story points follow the Fibonacci sequence:
- 1 SP: Trivial task
- 2 SP: Simple task
- 3 SP: Small task
- 5 SP: Medium task
- 8 SP: Large task
- 13 SP: Complex task
- 21 SP: Very complex task

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
   - Start with type: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
   - Include task/issue reference if applicable
   - Keep messages clear and concise

5. **Pull Requests**
   - Reference related tasks or issues
   - Include brief description of changes
   - Ensure all tests pass
   - Request review from maintainers

## Code Style Guidelines

[Your existing code style guidelines here]

## Testing Guidelines

[Your existing testing guidelines here]

## Documentation Guidelines

[Your existing documentation guidelines here]

## Questions or Need Help?

If you have questions or need help:
1. Check existing documentation
2. Search closed issues
3. Create a new issue with the question tag
4. Join our community chat [link]

Thank you for contributing to Pang! 