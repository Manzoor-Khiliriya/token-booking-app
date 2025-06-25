const API_URL = process.env.REACT_APP_API_BASE_URL;


export const createBookingToken = async (doctorId, token, slotTime) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${doctorId}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slotTime }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to book token.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};


export const getUserBookings = async (token) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch bookings');
    }

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateToken = async (bookingId, token, slotTime) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slotTime }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to update token.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async (bookingId, token) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to delete token.");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

