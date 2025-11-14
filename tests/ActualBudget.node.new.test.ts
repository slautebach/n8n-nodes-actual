require('dotenv').config();
import { ActualBudget } from '../nodes/ActualBudget/ActualBudget.node';
import { IExecuteFunctions } from 'n8n-workflow';
import * as api from '@actual-app/api';
import * as fs from 'fs';

// Integration tests for Actual Budget.
// These tests connect to a live instance of Actual Budget.
// To run them, create a .env file in the project root with:
// ACTUAL_SERVER_URL=http://localhost:5006
// ACTUAL_SERVER_PASSWORD=your-password
// ACTUAL_SYNC_ID=your-budget-id

const createExecuteFunctions = (parameters: { [key: string]: any }) => ({
	getCredentials: jest.fn().mockResolvedValue({
		serverURL: process.env.ACTUAL_SERVER_URL,
		password: process.env.ACTUAL_SERVER_PASSWORD,
		syncId: process.env.ACTUAL_SYNC_ID,
	}),
	getNode: jest.fn(),
	getNodeParameter: jest.fn((name: string) => parameters[name]),
	getInputData: jest.fn().mockReturnValue([
		{},
	]),
	helpers: {
		returnJsonArray: jest.fn((data) => data),
	},
} as unknown as IExecuteFunctions);

describe('ActualBudget Node', () => {
	describe('execute', () => {
		describe('Integration Tests', () => {
			beforeAll(async () => {
				try {
					const dataDirPath = 'tests/dataDir';
					if (fs.existsSync(dataDirPath)) {
						fs.rmSync(dataDirPath, { recursive: true, force: true });
					}
					fs.mkdirSync(dataDirPath, { recursive: true });
					await api.init({
						serverURL: process.env.ACTUAL_SERVER_URL,
						password: process.env.ACTUAL_SERVER_PASSWORD,
						dataDir: dataDirPath,
					});
					await api.downloadBudget(process.env.ACTUAL_SYNC_ID as string);
				} catch (error) {
					console.error('Failed to initialize Actual Budget API:', error);
					throw error;
				}
			});

			afterAll(async () => {
				await api.shutdown();
			});

            describe('Account Operations', () => {
                let testAccountId: string | null = null;
                const accountName = `Test Account ${Date.now()}`;

                afterEach(async () => {
                    // Clean up the test account if it exists
                    if (testAccountId) {
                        try {
                            await api.deleteAccount(testAccountId);
                        } catch (error) {
                            // Ignore errors if the account was already deleted
                        }
                        testAccountId = null;
                    }
                });

                it('should create an account', async () => {
                    const node = new ActualBudget();
                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'create',
                        name: accountName,
                        type: 'checking',
                    });

                    const result = await node.execute.call(executeFunctions);
                    testAccountId = result[0][0].json.data;
                    expect(testAccountId).toBeDefined();

                    const accounts = await api.getAccounts();
                    const newAccount = accounts.find((a: any) => a.id === testAccountId);
                    expect(newAccount).toBeDefined();
                    expect(newAccount?.name).toBe(accountName);
                });

                it('should get an account', async () => {
                    const node = new ActualBudget();
                    testAccountId = await api.createAccount({ name: accountName, type: 'checking' });

                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'get',
                        accountId: testAccountId,
                    });

                    const result = await node.execute.call(executeFunctions);
                    const account = result[0][0].json.data;
                    expect(account).toBeDefined();
                    expect(account.name).toBe(accountName);
                });

                it('should update an account', async () => {
                    const node = new ActualBudget();
                    testAccountId = await api.createAccount({ name: accountName, type: 'checking' });
                    const updatedAccountName = `Updated ${accountName}`;

                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'update',
                        accountId: testAccountId,
                        name: updatedAccountName,
                    });

                    await node.execute.call(executeFunctions);

                    const accounts = await api.getAccounts();
                    const updatedAccount = accounts.find((a: any) => a.id === testAccountId);
                    expect(updatedAccount).toBeDefined();
                    expect(updatedAccount?.name).toBe(updatedAccountName);
                });

                it('should close an account', async () => {
                    const node = new ActualBudget();
                    testAccountId = await api.createAccount({ name: accountName, type: 'checking' });

                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'close',
                        accountId: testAccountId,
                    });

                    await node.execute.call(executeFunctions);

                    const accounts = await api.getAccounts();
                    const closedAccount = accounts.find((a: any) => a.id === testAccountId);
                    expect(closedAccount).toBeDefined();
                    expect(closedAccount?.closed).toBe(true);
                });

                it('should reopen an account', async () => {
                    const node = new ActualBudget();
                    testAccountId = await api.createAccount({ name: accountName, type: 'checking', closed: true });

                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'reopen',
                        accountId: testAccountId,
                    });

                    await node.execute.call(executeFunctions);

                    const accounts = await api.getAccounts();
                    const reopenedAccount = accounts.find((a: any) => a.id === testAccountId);
                    expect(reopenedAccount).toBeDefined();
                    expect(reopenedAccount?.closed).toBe(false);
                });

                it('should delete an account', async () => {
                    const node = new ActualBudget();
                    testAccountId = await api.createAccount({ name: accountName, type: 'checking' });

                    const executeFunctions = createExecuteFunctions({
                        resource: 'account',
                        operation: 'delete',
                        accountId: testAccountId,
                    });

                    await node.execute.call(executeFunctions);

                    const accounts = await api.getAccounts();
                    const deletedAccount = accounts.find((a: any) => a.id === testAccountId);
                    expect(deletedAccount).toBeUndefined();
                    testAccountId = null; // Prevent afterEach from trying to delete it again
                });
            });
            describe('Utility Operations', () => {
                it('should run a query', async () => {
                    const node = new ActualBudget();
                    const executeFunctions = createExecuteFunctions({
                        resource: 'utility',
                        operation: 'runQuery',
                        query: 'SELECT * FROM accounts LIMIT 1',
                    });

                    const result = await node.execute.call(executeFunctions);
                    const data = result[0][0].json.data;
                    expect(data).toBeDefined();
                    expect(Array.isArray(data)).toBe(true);
                });

                it('should sync', async () => {
                    const node = new ActualBudget();
                    const executeFunctions = createExecuteFunctions({
                        resource: 'utility',
                        operation: 'sync',
                    });

                    const result = await node.execute.call(executeFunctions);
                    const data = result[0][0].json.data;
                    expect(data).toBe('OK');
                });

                it('should convert amount to integer', async () => {
                    const node = new ActualBudget();
                    const executeFunctions = createExecuteFunctions({
                        resource: 'utility',
                        operation: 'amountToInteger',
                        amount: 123.45,
                    });

                    const result = await node.execute.call(executeFunctions);
                    const data = result[0][0].json.data;
                    expect(data).toBe(12345);
                });

                it('should convert integer to amount', async () => {
                    const node = new ActualBudget();
                    const executeFunctions = createExecuteFunctions({
                        resource: 'utility',
                        operation: 'integerToAmount',
                        amount: 12345,
                    });

                    const result = await node.execute.call(executeFunctions);
                    const data = result[0][0].json.data;
                    expect(data).toBe('123.45');
                });
            });
        });
    });
});
