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
    // Handle error here if needed
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
    // Handle error here if needed
    console.error("Error signing up:", error);
    throw error;
  }
};

export const getProfileAPI = async (token) => {
  try {
    const response = await config.get(`/user/management/GetProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const putUpdateProfileAPI = async (token, profileData) => {
  try {
    const response = await config.put(`/user/management/UpdateAccountProfile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  const token = localStorage.getItem("token");
  
  try {
    const response = await config.post(
      "/auth/ChangePassword",
      {
        currentPassword,
        newPassword,
        confirmNewPassword: newPassword  // Include confirmNewPassword in request body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


