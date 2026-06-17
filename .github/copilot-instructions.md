# Copilot Instructions - AI-Accelerated Engineering Bootcamp: TODO Application

## Project Context

This is a full-stack TODO application with React frontend and Express backend, designed for iterative, feedback-driven development.

**Current Phase**: Backend stabilization and frontend feature completion

**Architecture**: 
- Frontend: React with testing using React Testing Library
- Backend: Express.js with Jest + Supertest for testing
- Database: TBD (architecture phase)

## Documentation References

Reference these documents to understand project structure and workflows:

- [docs/project-overview.md](docs/project-overview.md) - Architecture, tech stack, and complete structure
- [docs/testing-guidelines.md](docs/testing-guidelines.md) - Test patterns and standards for backend and frontend
- [docs/workflow-patterns.md](docs/workflow-patterns.md) - Development workflow guidance and best practices

These docs provide the authoritative reference for how to work on this codebase.

## Development Principles

Follow these core principles when implementing features or fixes:

1. **Test-Driven Development**: Red-Green-Refactor cycle
   - Write tests first (RED: test fails)
   - Implement code to pass (GREEN: test passes)
   - Refactor while keeping tests passing (REFACTOR)

2. **Incremental Changes**: Small, testable modifications
   - Each change should be focused and testable
   - Run tests after each change
   - Validate with automated tests before moving forward

3. **Systematic Debugging**: Use test failures as guides
   - Read test failure messages carefully
   - Understand what the test expects
   - Fix the code to match expectations

4. **Validation Before Commit**: All tests pass, no lint errors
   - Run full test suite before committing
   - Fix linting issues as part of code review
   - Verify no warnings in build output

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

**Backend Testing**:
- Jest for unit tests
- Supertest for API integration tests
- Test Express endpoints, middleware, and business logic

**Frontend Testing**:
- React Testing Library for component unit and integration tests
- Test component rendering, user interactions, conditional logic
- Manual browser testing for complete UI verification

**DO NOT SUGGEST**:
- End-to-end test frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Reason: Keep lab focused on unit/integration tests without additional complexity

**Testing Approach by Context**:

- **Backend API Changes**: Write Jest tests FIRST (RED), then implement code (GREEN), then refactor (REFACTOR)
- **Frontend Component Features**: Write React Testing Library tests FIRST (RED) for component behavior, then implement code (GREEN), then refactor (REFACTOR). Follow with manual browser testing for complete UI flows.
- **This is true TDD**: Test first, then code to pass the test

## Workflow Patterns

Describe the development workflows to follow:

1. **TDD Workflow**: Write/fix tests → Run → Fail → Implement → Pass → Refactor
   - Use tdd-developer agent for this workflow
   - Focus on small, incremental changes
   - Each change should be testable

2. **Code Quality Workflow**: Run lint → Categorize issues → Fix systematically → Re-validate
   - Use code-reviewer agent for this workflow
   - Group similar issues for batch fixing
   - Maintain test coverage while fixing

3. **Integration Workflow**: Identify issue → Debug → Test → Fix → Verify end-to-end
   - Combine multiple modes when needed
   - Verify across frontend and backend
   - Test complete feature flows

## Agent Usage

When working on different types of tasks, switch to the appropriate specialized agent:

- **tdd-developer**: For test-related work and Red-Green-Refactor cycles
  - Use when writing tests first for new features
  - Use when fixing failing tests
  - Use when implementing code to pass tests
  - Handles both new features (test first) and existing test fixes

- **code-reviewer**: For addressing lint errors and code quality improvements
  - Use when fixing ESLint errors
  - Use when refactoring for code quality
  - Use when analyzing code patterns
  - Use when validating success criteria

- **copilot-customization**: For creating or updating AI infrastructure
  - Use when creating new agents
  - Use when updating instructions or prompts
  - Use when designing workflow automation

## Memory System

- **Persistent Memory**: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- **Working Memory**: .github/memory/ directory contains discoveries and patterns
- **During active development**: Take notes in .github/memory/scratch/working-notes.md (not committed to git)
- **End of session**: Summarize key findings into .github/memory/session-notes.md (committed)
- **Recurring patterns**: Document code patterns in .github/memory/patterns-discovered.md (committed)
- **Reference memory**: Check these files when providing context-aware suggestions and learnings

## Workflow Utilities

GitHub CLI commands available for workflow automation (available to all modes):

- **List open issues**: `gh issue list --state open`
- **Get issue details**: `gh issue view <issue-number>`
- **Get issue with comments**: `gh issue view <issue-number> --comments`
- **Exercise issue identification**: The main exercise issue will have "Exercise:" in the title
- **Step extraction**: Steps are posted as comments on the main issue
- **Usage**: Use these commands when /execute-step or /validate-step prompts are invoked

## Git Workflow

Follow these Git conventions and strategies:

**Commit Format**:
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`, `style:`, etc.
- Example: `feat: Add todo item filtering by status`
- Example: `fix: Resolve backend test failure in app.js`
- Example: `chore: Update dependencies`

**Branch Strategy**:
- Feature branches: `feature/<descriptive-name>`
- Bug fix branches: `fix/<descriptive-name>`
- Chore branches: `chore/<descriptive-name>`
- Never commit directly to `main` - always use a feature branch

**Commit Process**:
- Stage all changes before committing: `git add .`
- Commit with descriptive message: `git commit -m "message"`
- Push to the correct branch: `git push origin <branch-name>`
- Create pull request when ready for review

**Branch Protection**:
- All changes must go through feature branches
- GitHub Actions validates changes before they can be merged
- Main branch represents stable, tested code
