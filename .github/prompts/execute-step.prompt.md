---
name: Execute Step
description: "Execute instructions from the current GitHub Issue step"
agent: tdd-developer
---

# Execute Step Prompt

## Purpose

This prompt executes instructions from a GitHub Issue step autonomously. It reads the step details from an issue, parses the activities, and executes them systematically.

## Usage

```
/execute-step [issue-number]
```

**Parameters**:
- `issue-number` (optional): The GitHub issue number. If not provided, finds the main exercise issue automatically.

## What It Does

1. **Find the Issue**: If no issue number provided, uses `gh issue list --state open` to find the exercise issue (contains "Exercise:" in title)
2. **Get Issue Details**: Uses `gh issue view <issue-number> --comments` to fetch the issue and all comments
3. **Parse Instructions**: Looks for step instructions in the issue body or comments
4. **Extract Activities**: Identifies all `:keyboard: Activity:` sections to execute
5. **Execute Systematically**: Runs each activity in order, documenting progress
6. **Provide Guidance**: Explains what each activity does before executing
7. **Stop Before Commit**: Does NOT commit or push changes (that's the job of `/commit-and-push`)
8. **Inform Next Steps**: Tells user to run `/validate-step` to check criteria

## Constraints

- **Testing scope**: Follow testing constraints from .github/copilot-instructions.md
  - NO e2e frameworks (Playwright, Cypress, Selenium)
  - NO browser automation tools
  - Use Jest + Supertest (backend) and React Testing Library (frontend) only
- **Follow the TDD workflow**: When implementing features, write tests FIRST
- **Create files**: When activities ask to create files, create them with proper structure
- **Run tests**: After code changes, run appropriate test suite
- **No commits**: Stop after completing activities; user runs `/commit-and-push` separately

## Example Execution

User runs: `/execute-step 42`

Agent response:
```
Reading issue #42: "Exercise: Build TODO App with TDD"

Found Step 5-0 with activities:
1. ⌨️ Activity: Create Project Instructions File
2. ⌨️ Activity: Create Memory System
3. ⌨️ Activity: Create TDD Developer Agent
...

Executing Activity 1: Create Project Instructions File
  - Creating .github/copilot-instructions.md
  - Adding sections: Project Context, Documentation References, etc.
  ✅ Complete

Executing Activity 2: Create Memory System
  - Creating .github/memory/README.md
  - Creating .github/memory/session-notes.md
  ...
  ✅ Complete

[Continues through all activities...]

All activities complete!
Next step: Run /validate-step 5-0 to check success criteria
```

## Implementation Details

### Finding the Exercise Issue

```bash
gh issue list --state open --search "Exercise:" --limit 1
```

### Getting Issue with Comments

```bash
gh issue view <issue-number> --comments
```

### Parsing Step Structure

Looks for these patterns:
- `# Step N-M:` - Step header
- `⌨️ Activity:` - Activity descriptions
- `Success Criteria:` - Validation criteria

### Executing Activities

For each activity:
1. Parse the description
2. Extract code examples or instructions
3. Create files or run commands as specified
4. Verify completion
5. Report status

## Related Prompts

- `/commit-and-push`: Used after completing activities to commit and push changes
- `/validate-step`: Used after completion to verify success criteria

## Tools Used

- `execute`: Run gh CLI commands and other executables
- `read`: Read issue content and existing files
- `edit`: Create and modify files
- `search`: Find relevant code or documentation
- `todo`: Track activity progress
