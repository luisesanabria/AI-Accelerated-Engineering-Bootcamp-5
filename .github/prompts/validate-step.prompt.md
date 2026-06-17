---
name: Validate Step
description: "Validate that all success criteria for the current step are met"
agent: code-reviewer
---

# Validate Step Prompt

## Purpose

This prompt systematically validates that you've completed all success criteria for a step. It reads the step requirements from the GitHub Issue and checks each criterion against your current workspace state.

## Usage

```
/validate-step <step-number>
```

**Parameters**:
- `step-number` (REQUIRED): The step to validate (e.g., `5-0`, `5-1`, `5-2`)

## What It Does

1. **Find the Issue**: Uses `gh issue list --state open` to find the main exercise issue (contains "Exercise:" in title)
2. **Get Issue Details**: Uses `gh issue view <issue-number> --comments` to fetch issue with all comments
3. **Parse Success Criteria**: Searches for "# Step {step-number}:" and extracts "Success Criteria" section
4. **Check Each Criterion**: Systematically verifies each requirement
5. **Report Status**: Shows ✅ for complete items and ❌ for incomplete items
6. **Provide Guidance**: Gives specific guidance for any incomplete items

## Example Validation

User: `/validate-step 5-0`

Prompt response:
```
Validating Step 5-0: Bootstrap Your Agentic Workflow System

Success Criteria:
✅ Created .github/copilot-instructions.md with workflow principles and doc links
✅ Created .github/memory/README.md explaining the memory system
✅ Created .github/memory/session-notes.md as historical session template
✅ Created .github/memory/patterns-discovered.md with pattern template
✅ Created .github/memory/scratch/ directory with .gitignore
✅ Created .github/memory/scratch/working-notes.md template for active session notes
✅ Created .github/agents/tdd-developer.agent.md
✅ Created .github/agents/code-reviewer.agent.md
✅ Created .github/prompts/execute-step.prompt.md
✅ Created .github/prompts/commit-and-push.prompt.md
✅ Created .github/prompts/validate-step.prompt.md
✅ Committed and pushed all customizations to feature/agentic-workflow branch
✅ GitHub Actions workflow validated all required files and posted Step 5-1

RESULT: ✅ STEP 5-0 COMPLETE

All success criteria met! You're ready for Step 5-1.
Next steps: Look for Step 5-1 instructions in the issue.
```

## What It Checks

For each criterion, the validator:

1. **File Existence**: Checks if required files were created
   ```bash
   test -f <file-path> && echo "Found"
   ```

2. **File Content**: Verifies files contain expected sections/patterns
   ```bash
   grep -l "<expected-pattern>" <file-path>
   ```

3. **Directory Structure**: Confirms directory hierarchy
   ```bash
   test -d <directory-path> && echo "Directory exists"
   ```

4. **Git Status**: Checks commits and branches
   ```bash
   git log --oneline -n 5
   git branch -v
   ```

5. **Tests**: Runs test suites to verify passing
   ```bash
   npm test -- --passWithNoTests
   ```

6. **Code Quality**: Checks for linting issues when relevant
   ```bash
   npm run lint
   ```

7. **Configuration**: Verifies expected configuration exists
   ```bash
   grep "<pattern>" <config-file>
   ```

## Step Validation Flow

```
User runs: /validate-step 5-0
    ↓
Find exercise issue on GitHub
    ↓
Get issue with all comments
    ↓
Search for "# Step 5-0:" section
    ↓
Extract "Success Criteria:" list
    ↓
For each criterion:
  - Check against workspace state
  - Report ✅ if complete
  - Report ❌ if incomplete
    ↓
Summarize results
    ↓
Provide guidance for incomplete items
    ↓
Tell user next steps
```

## Response Format

The validator provides:

```
Validating Step [N-M]: [Step Title]

Success Criteria:
[List of checks with ✅ or ❌]

RESULT: ✅ STEP COMPLETE or ❌ STEP INCOMPLETE

Summary:
- [X/Y] criteria met
- [Details of any incomplete items]

Guidance for incomplete items:
- Item not done: [Specific guidance on how to complete]
- Another item: [How to fix]

Next steps:
- Recommended actions to complete any missing items
- Link to Step [N-M+1] when available
```

## When to Use

**Use /validate-step when**:
- You think you've completed a step
- You want to verify success before moving forward
- You need to know what's still missing
- You want detailed guidance on incomplete items
- Before starting the next step (to ensure nothing was missed)

**Example Timing**:
1. Run `/execute-step 5-0` (complete the activities)
2. Run `/commit-and-push` (commit your work)
3. Run `/validate-step 5-0` (verify completion)
4. See next step posted automatically by GitHub Actions
5. Run `/execute-step 5-1` (continue to next step)

## Success Criteria Types

Validators check multiple criterion types:

| Type | Example | How Checked |
|------|---------|------------|
| **File Creation** | ".github/copilot-instructions.md created" | File exists on disk |
| **Directory Structure** | ".github/memory/ directory with subdirs" | Directory and files exist |
| **Content Pattern** | "File contains 'Development Principles' section" | grep for expected text |
| **Code Quality** | "All tests passing" | npm test exit code 0 |
| **Linting** | "No ESLint errors" | npm run lint exit code 0 |
| **Git Artifacts** | "Committed to feature/agentic-workflow" | git log and git branch |
| **Configuration** | "pytest.ini exists with proper config" | File content matches pattern |
| **Automation** | "GitHub Actions validated step" | Check for workflow run |

## Related Prompts

- `/execute-step`: Used before this to complete step activities
- `/commit-and-push`: Used between execute and validate to save work

## Tools Used

- `execute`: Run gh CLI and system commands (test, grep, git)
- `read`: Check file contents
- `search`: Find code patterns and configurations
- `todo`: Track validation progress

## Pro Tips

1. **Early validation**: Run /validate-step early if unsure about requirements
2. **Multiple checks**: Run /validate-step even when step seems complete - catches edge cases
3. **Read guidance**: Pay attention to specific guidance for incomplete items
4. **Address gaps**: Complete any missing items before pushing
5. **Celebrate wins**: ✅ all criteria means you nailed it!

This prompt is your quality assurance gate - it ensures you've met all requirements before moving forward!
