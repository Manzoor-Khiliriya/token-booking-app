const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Failed to fetch user profile');

        return result.data;
    } catch (error) {
        throw error;
    }
};
