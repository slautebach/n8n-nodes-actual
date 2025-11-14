## Unimplemented API Features

Based on a review of the `@actual-app/api` documentation and the existing codebase, the following features are not yet implemented in this n8n node:

### Accounts
- `closeAccount(id)`
- `createAccount(account)`
- `deleteAccount(id)`
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
- [x] Implement `reopenAccount` operation.
- [x] Implement `updateAccount` operation.

### Payee Operations
- [x] Implement `createPayee` operation.
- [x] Implement `deletePayee` operation.
- [x] Implement `getPayee` operation.
- [x] Implement `updatePayee` operation.

### Rule Operations
- [ ] Implement `createRule` operation.
- [ ] Implement `deleteRule` operation.
- [ ] Implement `getRule` operation.
- [ ] Implement `updateRule` operation.

### Schedule Operations
- [ ] Implement `createSchedule` operation.
- [ ] Implement `deleteSchedule` operation.
- [ ] Implement `getSchedule` operation.
- [ ] Implement `updateSchedule` operation.

### Transaction Operations
- [ ] Implement `deleteTransaction` operation.
- [ ] Implement `getTransaction` operation.

### Utility Operations
- [ ] Implement `runQuery` operation.
- [ ] Implement `sync` operation.
- [ ] Implement `runBankSync` operation.
- [ ] Implement `amountToInteger` utility function.
- [ ] Implement `integerToAmount` utility function.