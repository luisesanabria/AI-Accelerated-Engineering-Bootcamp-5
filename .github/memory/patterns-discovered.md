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

---

## Pattern: Supertest API Test Structure

**Context**: Writing integration tests for Express REST endpoints in the backend

**Problem**: Inconsistent test structure makes tests hard to read and maintain; missing assertions leave bugs undetected.

**Solution**: Use `describe` blocks per resource, nested `describe` blocks per HTTP method, and assert status code + response body shape.

**Example**:
```javascript
describe('GET /todos', () => {
  it('should return an array of todos', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

**Related Files**: `packages/backend/src/app.test.js`

**Why It Matters**: Consistent structure makes it easy to scan tests and understand API contract at a glance.

**Discovered In**: Step 5-1

**Status**: Active

---

## Pattern: ESLint Error Batch Fix by Category

**Context**: Resolving many ESLint errors across multiple files

**Problem**: Fixing errors one-at-a-time is slow and inconsistent; missing some while fixing others.

**Solution**: Run `eslint` to get full error list, group by rule (unused-vars, no-console, style), fix all of one category at once before moving to the next.

**Example**:
```bash
# 1. Get full report
npx eslint src/ --format compact

# 2. Fix all unused-vars first
# 3. Then fix all no-console
# 4. Then fix style issues
# 5. Re-run to verify zero errors
```

**Related Files**: `packages/frontend/src/`, `packages/backend/src/`

**Why It Matters**: Batch fixing by category is faster, reduces mistakes, and keeps the diff focused and reviewable.

**Discovered In**: Step 5-2

**Status**: Active

---

## Pattern: Conditional Empty State Rendering

**Context**: React components that display lists which may be empty

**Problem**: Showing a blank space when a list is empty is confusing; users don't know if it's loading or just empty.

**Solution**: Render a dedicated empty state message when the list length is zero.

**Example**:
```jsx
{todos.length === 0 ? (
  <p className="empty-state">No todos yet. Add one above!</p>
) : (
  <ul>{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
)}
```

**Related Files**: `packages/frontend/src/App.jsx`

**Why It Matters**: Improves UX clarity; tests can assert on the empty state text to verify conditional logic.

**Discovered In**: Step 5-3

**Status**: Active

---

## Pattern: Error Boundary via State

**Context**: React components that fetch data from an API

**Problem**: API failures crash silently or show raw error objects; users see a broken UI.

**Solution**: Store error messages in component state and render a user-friendly error banner conditionally.

**Example**:
```jsx
const [error, setError] = useState(null);

const fetchTodos = async () => {
  try {
    const data = await api.getTodos();
    setTodos(data);
  } catch (err) {
    setError('Failed to load todos. Please try again.');
  }
};

return error ? <div className="error">{error}</div> : <TodoList todos={todos} />;
```

**Related Files**: `packages/frontend/src/App.jsx`

**Why It Matters**: Prevents silent failures; React Testing Library can assert on error message text to verify error handling logic.

**Discovered In**: Step 5-3

**Status**: Active

---

## Additional Patterns (To Be Discovered)

As you work through future sessions, patterns will emerge in these areas:

### Testing Patterns
- Supertest API Test Structure (Step 5-1)
- React Testing Library Conditional Render Test (Step 5-3)

### Code Quality Patterns
- ESLint Error Batch Fix by Category (Step 5-2)

### Git/Workflow Patterns
- Conventional Commit per Step (Step 5-1 through 5-3)

### API Design Patterns
- RESTful CRUD with Express and In-Memory Storage (Step 5-1)

### Frontend Patterns
- Conditional Empty State Rendering (Step 5-3)
- Error Boundary via State (Step 5-3)

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
- Supertest API Test Structure
- React Testing Library Conditional Render Test

### Component Patterns
- Conditional Empty State Rendering
- Error Boundary via State

### Code Quality Patterns
- ESLint Error Batch Fix by Category

### Git Workflow Patterns
- Conventional Commit per Step

## Using These Patterns

During implementation:
1. **Check this file** before starting new code sections
2. **Apply existing patterns** to maintain consistency
3. **Document new patterns** as they emerge
4. **Reference in code reviews** when discussing quality

This pattern library grows with each session, making the codebase increasingly consistent and predictable.
