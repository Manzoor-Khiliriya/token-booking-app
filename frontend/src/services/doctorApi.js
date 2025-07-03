const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getDoctorById = async (doctorId, token) => {
  try {
    const response = await fetch(`${API_URL}/doctors/${doctorId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch doctor');
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDoctors = async (token) => {
  try {
    const response = await fetch(`${API_URL}/doctors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch doctors");
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

