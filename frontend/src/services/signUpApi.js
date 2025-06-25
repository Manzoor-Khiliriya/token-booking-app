const API_URL = process.env.REACT_APP_API_BASE_URL;

export async function signUpApi(userData, navigate) {
    try {
        const response = await fetch(`${API_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong during register');
        }

        localStorage.setItem("token", result.data.token);
        navigate('/place');
    } catch (error) {
        throw new Error( error.message || 'Resgistration failed');
    }
}