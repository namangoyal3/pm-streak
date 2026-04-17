# TDD Guide — Test First, Verify Always

## Task
Before writing any feature, write a failing test. Before committing, run the full test suite.

## PM Streak Testing Stack
Run tests with: `npm test` (Jest)

## Test File Locations
- `__tests__/` — unit tests next to the files they test
- `scripts/test-*.js` — integration tests for scripts

## Required Test Per Feature Type

### New API Route
```typescript
// Test: returns 401 without auth, 200 with valid session
// Test: validates input, returns 400 for bad data
// Test: returns expected shape of JSON
```

### Billing/Payment Changes
```typescript
// Test: trial creates entitlement in DB
// Test: checkout session creates with correct price
// Test: webhook handles success + failure cases
```

### Frontend Component
```typescript
// Test: renders with required props
// Test: shows loading state
// Test: shows error state
```

## CI Gate
All tests must pass before `git push`. No exceptions for "quick fixes."

## Output
Test coverage report after each test run