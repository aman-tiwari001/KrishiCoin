import axios from 'axios';
import { baseUrl } from './base_url';

export const registerUser = async (payload) => {
	try {
		const response = await axios.post(
			baseUrl + '/api/users/create-user',
			payload
		);
		return response.data;
	} catch (error) {
		console.error(
			'Error registering user:',
			error.response ? error.response.data : error.message
		);
		throw error;
	}
};
