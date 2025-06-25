const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function loginApi(formData, navigate) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || "Login failed");
        }

        localStorage.setItem("token", result.data.token);
        navigate('/place');
    } catch (error) {
        throw new Error(error.message || 'Sign in failed');
    }
};
