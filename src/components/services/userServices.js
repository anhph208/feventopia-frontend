import config from '../../utils/cus-axios';

export const loginAPI = async (userName, password) => {
    try {
        const response = await config.post('/auth/SignIn', {
            userName,
            password
        });

        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error) {
        // Handle error here if needed
        console.error('Error signing in:', error);
        throw error;
    }
};
