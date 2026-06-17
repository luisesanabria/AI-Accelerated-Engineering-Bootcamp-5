# Memory System for Agentic Development

## Purpose

This directory contains the **working memory system** for capturing discoveries, patterns, and decisions during development sessions. The memory system supports autonomous AI development by:

- **Tracking patterns** discovered during implementation
- **Recording decisions** made during workflow execution
- **Preserving learnings** across multiple sessions
- **Enabling context-aware** suggestions in future work

## How It Works

Think of the memory system as a learning loop:

1. **Persistent Memory** (.github/copilot-instructions.md): Contains foundational knowledge
   - Project architecture and workflow patterns
   - Development principles and testing scope
   - Agent roles and Git workflows
   - Created once, referenced always

2. **Active Memory** (.github/memory/scratch/working-notes.md): Captures real-time session work
   - Current task and approach
   - Key findings and blockers
   - Decisions made during implementation
   - Not committed to git (ephemeral)

3. **Historical Memory** (.github/memory/session-notes.md): Documents completed sessions
   - What was accomplished in each session
   - Key findings and decisions
   - Outcomes and next steps
   - Committed to git as historical record

4. **Accumulated Patterns** (.github/memory/patterns-discovered.md): Preserves learnings over time
   - Code patterns that work well
   - Common problems and solutions
   - Project-specific conventions
   - Committed to git and built upon over time

## Directory Structure

```
.github/memory/
├── README.md                 # This file - explains the memory system
├── session-notes.md          # Historical summaries of completed sessions (committed)
├── patterns-discovered.md    # Accumulated code patterns and learnings (committed)
└── scratch/                  # Active session work (not committed)
    ├── .gitignore            # Prevents scratch files from being committed
    └── working-notes.md      # Template for current session notes (ephemeral)
```

## When to Use Each File

### session-notes.md (Committed Historical Record)
**Purpose**: Document completed sessions for future reference

**When to use**:
- After completing a session or significant milestone
- When summarizing key findings from multiple activities
- When you want to preserve learnings for the next session
- At end of Step 5-0, 5-1, 5-2, etc.

**What to include**:
- Session name and date
- What was accomplished
- Key findings and decisions
- Outcomes and lessons learned
- Blockers resolved and how

**Example**:
```markdown
## Session 5-0: Bootstrap Agentic Workflow System
**Date**: 2026-06-17

### Accomplished
- Created project instructions with all workflow patterns
- Built TDD developer and code reviewer agents
- Set up prompt files for workflow automation

### Key Findings
- Auto-switching prompts reduce cognitive load
- Memory system enables learning across sessions
- Agent specifications critical for task routing

### Outcomes
- Agentic infrastructure ready for Step 5-1
- Team now has AI context across all conversations
```

### patterns-discovered.md (Committed Pattern Library)
**Purpose**: Document recurring code patterns and learnings

**When to use**:
- When a pattern emerges during implementation
- When you discover a solution to a common problem
- When you identify anti-patterns to avoid
- When you refine understanding of project conventions

**Pattern Template**:
```markdown
## Pattern: [Pattern Name]

**Context**: When this pattern applies

**Problem**: What problem does this solve?

**Solution**: How to implement this pattern

**Example**:
```code
// Code example demonstrating the pattern
```

**Related Files**: List files that use this pattern

**Why It Matters**: Why is this pattern important?
```

**Example**:
```markdown
## Pattern: Service Initialization with Empty Array

**Context**: When initializing services or data structures in Express routes

**Problem**: Services initialized as `null` can cause issues when methods are called. Better to initialize with empty arrays or objects.

**Solution**: Initialize services with empty arrays `[]` or objects `{}` rather than `null`. This allows immediate method calls without null checks.

**Example**:
```javascript
// Good
const items = [];
items.push(newItem);

// Avoid
let items = null;
// Later: items.push(newItem) → Error: Cannot read property 'push' of null
```

**Related Files**: 
- packages/backend/src/app.js - Service initialization pattern
- packages/backend/src/index.js - Data structure setup

**Why It Matters**: Prevents runtime errors and reduces defensive coding. Makes code more predictable.
```

### scratch/working-notes.md (Ephemeral Session Notes)
**Purpose**: Capture real-time work during active development

**When to use**:
- At the start of each session or activity
- As you discover new information
- When decisions are made during implementation
- When you hit blockers or interesting findings

**When NOT to commit**:
- This file is specifically designed to be ephemeral
- It's overwritten or discarded at session end
- At end of session, summarize key findings into session-notes.md

**Template**:
```markdown
# Working Notes - [Session Name] - [Date]

## Current Task
[What are you working on right now?]

## Approach
[What strategy are you using?]

## Key Findings
[Important discoveries as you work]

## Decisions Made
[Key decisions and their rationale]

## Blockers
[Anything blocking progress and how to resolve]

## Next Steps
[What comes next?]

## Notes
[Miscellaneous observations]
```

**Example**:
```markdown
# Working Notes - Step 5-1 TDD Execution - 2026-06-17

## Current Task
Fixing failing backend tests in app.js using Red-Green-Refactor

## Approach
1. Run test suite to identify failures
2. Analyze each failing test
3. Implement minimal code to pass
4. Refactor while keeping tests green

## Key Findings
- Test expects specific error message format
- Service initialization needs empty array pattern
- Mock data structure differs from production

## Decisions Made
- Use empty array for service items (prevents null errors)
- Add validation before processing requests
- Follow existing error message conventions

## Blockers
- None currently

## Next Steps
- Continue through remaining test failures
- Refactor code after all tests pass
- Run /validate-step to check success criteria

## Notes
- Pattern: Service initialization discovered - should add to patterns-discovered.md
```

## How AI Uses This Memory

During development, AI will:

1. **Read persistent memory** (copilot-instructions.md) at start of each conversation
   - Understand project structure and principles
   - Know which agents to use for different tasks
   - Follow workflow patterns and Git conventions

2. **Check working memory** (scratch/working-notes.md) during active session
   - Reference current task and approach
   - Recall decisions made earlier in session
   - Avoid repeating blockers already resolved

3. **Reference historical memory** (session-notes.md) when starting new sessions
   - Understand what was accomplished previously
   - Learn from past decisions and outcomes
   - Build on previous progress

4. **Apply accumulated patterns** (patterns-discovered.md) during implementation
   - Use proven solutions to common problems
   - Avoid repeating mistakes
   - Maintain consistency with project conventions

## The Learning Loop

```
Session Starts
    ↓
[Read] Persistent Memory (copilot-instructions.md)
    ↓
[Create] Working Memory (scratch/working-notes.md)
    ↓
[Work] Execute activities and capture findings
    ↓
[Update] Working Memory with discoveries and decisions
    ↓
[Discover] Code patterns that should be recorded
    ↓
Session Ends
    ↓
[Summarize] Key findings → session-notes.md
[Document] Patterns discovered → patterns-discovered.md
[Clean] Remove scratch/working-notes.md (ephemeral)
    ↓
Next Session Starts
    ↓
[Reference] Historical Memory (session-notes.md)
[Apply] Accumulated Patterns (patterns-discovered.md)
    ↓
Cycle continues...
```

## Memory System Rules

**What Gets Committed** (in git history):
- session-notes.md - Historical session summaries
- patterns-discovered.md - Accumulated code patterns
- Updates to these files become part of project history

**What Stays Ephemeral** (in .gitignore):
- scratch/working-notes.md - Active session notes
- Discarded at end of session
- Prevents cluttering git history with temporary notes

**Reading Memory**:
- AI automatically reads committed memory files at start of conversations
- AI checks working memory during active sessions
- Always reference memory when context-appropriate

**Writing Memory**:
- Write to working-notes.md during active development (temporary)
- Write to session-notes.md at end of session (permanent)
- Write to patterns-discovered.md when pattern emerges (permanent)

## Best Practices

1. **Keep Notes Concise**: Focus on key findings, not detailed logs
2. **Use Structure**: Leverage templates to keep notes organized
3. **Reference Files**: Always link to related code files
4. **Update Regularly**: Capture findings as they emerge
5. **Review at Session Start**: Always check session-notes.md and patterns-discovered.md
6. **Summarize Patterns**: Move findings from working-notes.md to patterns-discovered.md
7. **Version Control**: Commit memory updates along with code changes

## Example: Complete Memory Workflow

**During Session 5-1 (Active Development)**:
1. Create scratch/working-notes.md to track current work
2. Discover service initialization pattern
3. Document in working-notes.md under "Key Findings"

**After Session 5-1 (End of Day)**:
1. Summarize session accomplishments → session-notes.md
2. Extract service initialization pattern → patterns-discovered.md
3. Remove scratch/working-notes.md (it stays ephemeral)

**During Session 5-2 (Next Session)**:
1. Read session-notes.md - understand what was accomplished
2. Reference patterns-discovered.md - remember service initialization pattern
3. Apply pattern when implementing new features
4. Create new scratch/working-notes.md for this session
5. Continue the cycle...

## Result

By the end of Session 5, your memory system will contain:
- **Persistent**: Foundational project knowledge (copilot-instructions.md)
- **Historical**: 5+ completed session summaries (session-notes.md)
- **Patterns**: 5-10 discovered and documented patterns (patterns-discovered.md)
- **Active**: Current session work being captured (scratch/working-notes.md)

This creates a **learning system** where AI becomes smarter and more effective with each session, understanding your project's patterns, conventions, and successful approaches.
