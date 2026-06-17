# Patterns Discovered - Code Patterns and Project Learnings

This file documents recurring patterns discovered during development. It serves as a pattern library for future implementation.

## Pattern Template

When documenting a pattern, use this template:

```markdown
## Pattern: [Pattern Name]

**Context**: When/where this pattern applies (e.g., "Service initialization in Express routes")

**Problem**: What problem or limitation does this solve?

**Solution**: How to implement this pattern correctly

**Example**:
```javascript
// Code example showing correct implementation
```

**Related Files**: 
- packages/backend/src/app.js
- packages/backend/src/index.js

**Why It Matters**: Why is this pattern important for this project?

**Discovered In**: Session X or which activity/step revealed this pattern

**Status**: Active (currently used), Deprecated, or Alternative
```

## Example Pattern Entry

## Pattern: Service Initialization with Empty Array

**Context**: When initializing services or data structures in Express routes and handlers

**Problem**: Services initialized as `null` can cause runtime errors when methods are called without null checks. This adds defensive coding overhead and makes code harder to reason about.

**Solution**: Initialize services and collections with empty arrays `[]` or empty objects `{}` rather than `null`. This allows immediate method calls (like `.push()` or `.map()`) without needing guard clauses.

**Example**:
```javascript
// Good Pattern - Initialize with empty array
const items = [];
items.push(newItem);        // Works immediately
items.map(item => item.id); // No null check needed

// Avoid - Initialize with null
let items = null;
items.push(newItem);        // Error: Cannot read property 'push' of null
// Requires null checks:
if (items) {
  items.push(newItem);
}
```

**Related Files**: 
- packages/backend/src/app.js - Service initialization
- packages/backend/src/index.js - Data structure setup

**Why It Matters**: 
- Prevents "Cannot read property of null/undefined" runtime errors
- Reduces defensive coding (no null checks needed)
- Makes code more predictable and easier to test
- Aligns with JavaScript best practices for data initialization

**Discovered In**: Session 5-0, during bootstrap of agentic workflow - identified as critical pattern for avoiding test failures

**Status**: Active - apply consistently in backend service initialization

---

## Additional Patterns (To Be Discovered)

As you work through Sessions 5-1 through 5-5, patterns will emerge in these areas:

### Testing Patterns (Expected)
- Test structure for API endpoints
- Mocking patterns for dependencies
- Assertion patterns for React components
- Setup/teardown patterns for test suites

### Code Quality Patterns (Expected)
- Naming conventions for variables and functions
- Error handling patterns
- Data validation patterns
- Component composition patterns for React

### Git/Workflow Patterns (Expected)
- Conventional commit message patterns
- Branch naming conventions
- Pull request patterns
- Commit organization patterns

### API Design Patterns (Expected)
- Request/response structure conventions
- Error response format
- Status code usage
- Endpoint naming conventions

### Frontend Patterns (Expected)
- State management patterns
- Component organization patterns
- Props drilling vs other solutions
- Effect hook usage patterns

### Debugging Patterns (Expected)
- Common test failure causes
- Root cause analysis approaches
- Systematic debugging methods

## How to Add Patterns

1. **When discovered**: Document immediately in session's working-notes.md
2. **At session end**: Move mature patterns to this file with full documentation
3. **Reference in code**: Link related files where pattern is used
4. **Status tracking**: Mark as Active if widely used, Deprecated if replaced
5. **Cross-reference**: Link related patterns together

## Pattern Index by Category

### Initialization Patterns
- Service Initialization with Empty Array

### Testing Patterns
- (To be added)

### Component Patterns
- (To be added)

### Error Handling Patterns
- (To be added)

### Git Workflow Patterns
- (To be added)

## Using These Patterns

During implementation:
1. **Check this file** before starting new code sections
2. **Apply existing patterns** to maintain consistency
3. **Document new patterns** as they emerge
4. **Reference in code reviews** when discussing quality

This pattern library grows with each session, making the codebase increasingly consistent and predictable.
