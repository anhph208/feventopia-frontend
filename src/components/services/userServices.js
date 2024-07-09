// userService.js
import config from "../../utils/cus-axios"; // Import your API configuration

export const loginAPI = async (userName, password) => {
  try {
    const response = await config.post("/auth/SignIn", {
      userName,
      password,
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signupAPI = async (userData) => {
  try {
    const response = await config.post("/auth/SignUp", userData);

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const getProfileAPI = async () => {
  try {
    const response = await config.get(`/user/management/GetProfile`);

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return profile data
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const putUpdateProfileAPI = async (profileData, token) => {
  let headers = {
    Authorization: `Bearer ${token}`,
  };

  if (profileData instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await config.put('/user/management/UpdateAccountProfile', profileData, {
      headers: headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return updated profile data
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const changePasswordAPI = async (currentPassword, newPassword) => {
  try {
    const response = await config.post(
      "/auth/ChangePassword",
      {
        currentPassword,
        newPassword,
        confirmNewPassword: newPassword  // Include confirmNewPassword in request body
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return success message or updated data if needed
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

export const rechargeAPI = async (rechargeData) => {
  try {
    const response = await config.post("/payment/Recharge", null, {
      params: {
        amount: rechargeData.amount,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error during recharge:", error);
    throw error;
  }
};

export const getAllEventForVisitorAPI = async (pageNumber = 1, pageSize = 8, category, status) => {
  try {
    const response = await config.get("/event/GetAllEventForVisitor", {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Category: category,
        Status: status,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const pagination = JSON.parse(response.headers['x-pagination']);
      return {
        events: response.data, // Adjust based on actual response structure
        pagination, // Contains TotalCount, PageSize, CurrentPage, TotalPages, HasNext, HasPrevious
      };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getAllEventForOtherAPI = async (pageNumber = 1, pageSize = 8, category, status) => {
  try {
    const response = await config.get("/event/GetAllEvent", {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        Category: category,
        Status: status,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const pagination = JSON.parse(response.headers['x-pagination']);
      return {
        events: response.data, // Adjust based on actual response structure
        pagination, // Contains TotalCount, PageSize, CurrentPage, TotalPages, HasNext, HasPrevious
      };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventDetailsAPI = async (eventId) => {
  try {
    const response = await config.get("/event/GetEventById", {
      params: {
        id: eventId,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the event details
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

export const buyTicketAPI = async (orderDetails) => {
  try {
    const response = await config.post('/ticket/BuyTicket', orderDetails);
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the created order details
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating event order:", error);
    throw error;
  }
};

export const getAllProfileTransactionAPI = async (pageNumber = 1, pageSize = 10) => {
  try {
    const response = await config.get('/payment/GetAllProfileTransaction', {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      const pagination = JSON.parse(response.headers['x-pagination']);
      return {
        transactions: response.data, // Adjust based on actual response structure
        pagination, // Contains TotalCount, PageSize, CurrentPage, TotalPages, HasNext, HasPrevious
      };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching profile transactions:", error);
    throw error;
  }
};

export const getAllProfileTicketAPI = async (pageNumber = 1, pageSize = 5) => {
  try {
    const response = await config.get('/ticket/GetAllOwnTicketInfo', {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      const pagination = JSON.parse(response.headers['x-pagination']);
      return {
        tickets: response.data,
        pagination, // Contains TotalCount, PageSize, CurrentPage, TotalPages, HasNext, HasPrevious
      };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const searchEventAPI = async (query) => {
  try {
    const response = await config.get("/event/SearchEventByName", {
      params: {
        name: query, // Ensure this matches the backend parameter name
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the search results
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("Error searching for events:", error);
    throw error;
  }
};

export const createEventAPI = async (eventData, category) => {
  try {
    const response = await config.post('/event/CreateEvent', eventData, {
      params: {
        category: category, // Pass category as a query parameter
      },
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the created event data
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};