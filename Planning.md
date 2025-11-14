
## Unimplemented API Features

Based on a review of the `@actual-app/api` documentation and the existing codebase, the following features are not yet implemented in this n8n node:

### Accounts
- `closeAccount(id)`
- `createAccount(account)`
- `deleteAccount(id)`
- `getAccount(id)`
- `reopenAccount(id)`
- `updateAccount(id, fields)`

### Payees
- `createPayee(payee)`
- `deletePayee(id)`
- `getPayee(id)`
- `updatePayee(id, fields)`

### Rules
- `createRule(rule)`
- `deleteRule(id)`
- `getRule(id)`
- `updateRule(id, fields)`

### Schedules
- `createSchedule(schedule)`
- `deleteSchedule(id)`
- `getSchedule(id)`
- `updateSchedule(id, fields)`

### Transactions
- `deleteTransaction(id)`
- `getTransaction(id)`

### Miscellaneous
- `runQuery(query)`
- `sync()`
- `runBankSync()`
- `utils.amountToInteger(amount)`
- `utils.integerToAmount(amount)`

## Implementation Task List

Here is a task list for implementing the missing features:

### Account Operations
- [x] Implement `closeAccount` operation.
- [x] Implement `createAccount` operation.
- [x] Implement `deleteAccount` operation.
- [x] Implement `getAccount` operation.
- [x] Implement `reopenAccount` operation.
- [x] Implement `updateAccount` operation.

### Payee Operations
- [x] Implement `createPayee` operation.
- [x] Implement `deletePayee` operation.
- [x] Implement `getPayee` operation.
- [x] Implement `updatePayee` operation.

### Rule Operations
- [x] Implement `createRule` operation.
- [x] Implement `deleteRule` operation.
- [x] Implement `getRule` operation.
- [x] Implement `updateRule` operation.

### Schedule Operations
- [x] Implement `createSchedule` operation.
- [x] Implement `deleteSchedule` operation.
- [x] Implement `getSchedule` operation.
- [x] Implement `updateSchedule` operation.

### Transaction Operations
- [x] Implement `deleteTransaction` operation.
- [x] Implement `getTransaction` operation.

### Utility Operations
- [x] Implement `runQuery` operation.
- [x] Implement `sync` operation.
- [x] Implement `runBankSync` operation.
- [x] Implement `amountToInteger` utility function.
- [x] Implement `integerToAmount` utility function.
