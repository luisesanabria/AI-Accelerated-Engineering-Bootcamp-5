---
name: Commit and Push
description: "Analyze changes, generate commit message, and push to feature branch"
agent: null
---

# Commit and Push Prompt

## Purpose

This prompt analyzes your changes using Git, generates a meaningful conventional commit message, and pushes to your specified feature branch. It handles the entire Git workflow for committing your work.

## Usage

```
/commit-and-push
```

When prompted, provide the branch name (e.g., `feature/agentic-workflow`).

**Important**: This prompt is intentionally agent-agnostic (no agent specified) because Git operations are context-independent and work the same way regardless of which agent you're using.

## What It Does

1. **Validates Input**: Asks for branch name if not provided
2. **Analyzes Changes**: Uses `git diff --staged` to see what will be committed
3. **Generates Message**: Creates a conventional commit message based on changes
4. **Creates/Switches Branch**: 
   - Checks if branch exists with `git branch -a`
   - Creates branch if needed: `git checkout -b <branch-name>`
   - Switches to branch if exists: `git checkout <branch-name>`
5. **Stages Changes**: Runs `git add .`
6. **Commits**: Commits with the generated message
7. **Pushes**: Pushes to GitHub with `git push origin <branch-name>`
8. **Reports**: Shows commit details and push confirmation

## Branch Naming Convention

Follow these patterns for branch names:

- **Features**: `feature/<descriptive-name>`
  - Example: `feature/agentic-workflow`
  - Example: `feature/todo-filtering`
- **Bug Fixes**: `fix/<descriptive-name>`
  - Example: `fix/backend-test-failure`
  - Example: `fix/component-rendering-issue`
- **Chores**: `chore/<descriptive-name>`
  - Example: `chore/update-dependencies`
  - Example: `chore/cleanup-console-logs`
- **Documentation**: `docs/<descriptive-name>`
  - Example: `docs/api-documentation`
  - Example: `docs/setup-guide`

## Commit Message Format

Messages follow conventional commits:

```
<type>: <description>

[optional body for detailed explanation]
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Build, dependencies, tooling
- `docs:` - Documentation changes
- `test:` - Test additions/fixes
- `refactor:` - Code refactoring
- `style:` - Formatting, code style (no logic changes)
- `perf:` - Performance improvements

**Examples**:
```
feat: Bootstrap agentic workflow system with agents and prompts
fix: Resolve backend test failure in app.js for POST endpoint
chore: Install and configure Jest for testing
docs: Add memory system documentation and workflow patterns
test: Add unit tests for todo filtering logic
refactor: Extract validation logic into separate function
```

## Automatic Branch Creation

The prompt automatically:
- **Checks if branch exists**: `git branch -a | grep <branch-name>`
- **Creates if needed**: `git checkout -b <branch-name>`
- **Switches if exists**: `git checkout <branch-name>`

**You don't need to create the branch manually** - the prompt handles it!

## Example Execution

User: `/commit-and-push`

Prompt asks: "What branch should I push to? (e.g., feature/agentic-workflow)"

User: `feature/agentic-workflow`

Prompt response:
```
Analyzing changes...

Files changed:
  - .github/copilot-instructions.md (new)
  - .github/memory/README.md (new)
  - .github/agents/tdd-developer.agent.md (new)
  - .github/prompts/execute-step.prompt.md (new)
  [4 files changed]

Generating commit message...

Generated message:
  feat: Bootstrap agentic workflow system with agents and prompts

Checking branch...
  Branch 'feature/agentic-workflow' does not exist
  Creating new branch...
  ✅ Branch created

Staging changes...
  ✅ All changes staged

Committing...
  ✅ Committed with message: "feat: Bootstrap agentic workflow system with agents and prompts"

Pushing to GitHub...
  ✅ Pushed to origin/feature/agentic-workflow

Complete! Your changes are now on GitHub.
GitHub Actions will validate your changes and post the next step instructions to the issue.
```

## Branch Protection

**Important notes**:
- **Never commit to main**: Always use a feature branch
- **GitHub Actions validates**: Changes on main are protected by automated validation
- **Pull requests required**: Changes go to main only through PR review
- **Staging strategy**:
  - Work on feature branches
  - Use this prompt to push changes
  - Create/review PRs for main branch
  - GitHub Actions posts next step automatically

## Related Prompts

- `/execute-step`: Used before this to complete step activities
- `/validate-step`: Used after this to verify success criteria

## Tools Used

- `execute`: Run Git commands (checkout, add, commit, push)
- `read`: Check current state and git status
- `todo`: Track commit progress

## Requirements

- Git repository initialized
- GitHub access configured (for `git push`)
- Changes staged or ready to commit
- Branch name provided when prompted

## Tips

1. **Clear commit messages**: Use descriptive messages that future developers will understand
2. **Atomic commits**: Each commit should be a logical unit of work
3. **Frequent commits**: Commit regularly rather than massive single commits
4. **Reference issues**: Consider adding issue numbers to messages for traceability
   - Example: `fix: Resolve #42 - backend test failure in app.js`
5. **Preview before committing**: Run `git diff --staged` to review changes first

This prompt is your Git workflow automation - it handles all the repetitive Git work so you can focus on development!
