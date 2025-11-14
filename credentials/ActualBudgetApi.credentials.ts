import { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

/**
 * Represents the credentials for the Actual Budget API.
 * This class defines the properties required to connect to an Actual Budget instance,
 * including the server URL, password, and sync ID.
 */
export class ActualBudgetApi implements ICredentialType {
	// The name of the credential type.
	name = 'actualBudgetApi';
	// The display name for the credential type in the n8n UI.
	displayName = 'Actual Budget API';
	// URL to the official documentation for the Actual Budget API.
	documentationUrl = 'https://actualbudget.org/docs/api/';
	// Defines the properties required for the credential.
	properties: INodeProperties[] = [
		{
			displayName: 'Server URL',
			name: 'serverURL',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
		{
			displayName: 'Sync ID',
			name: 'syncId',
			type: 'string',
			default: '',
			required: true,
			description: 'The Sync ID of the Budget you want to work on',
		},
	];

	/**
	 * Defines a test request to verify the credentials.
	 * This request attempts to log in to the Actual Budget server using the provided credentials.
	 */
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.serverURL}}',
			url: '=/account/login',
			method: 'POST',
			body: {
				loginMethod: 'password',
				password: '={{$credentials?.password}}',
			},
		},
	};
}
