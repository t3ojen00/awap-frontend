import axios from "axios";

// Shift this variable to an environment file in production
export const BASE_API_URL = "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    // If token exists, attach it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config; // Return the modified config
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle forbidden responses
apiClient.interceptors.response.use(
  (response) => {
    // Return the response if everything is okay
    return response;
  },
  (error) => {
    // Check if the response status is 403 (Forbidden)
    if (error.response && error.response.status === 403) {
      // Navigate to login route if forbidden
      // If using React Router
      window.location.href = "/login"; // This will redirect to the login page

      // If using react-router-dom with useHistory, you can do:
      // const history = useHistory();
      // history.push('/login');

      // Optionally, you can clear the stored auth token here
      localStorage.removeItem("authToken");

      // You can also show an alert or notification here if necessary
      alert(
        "Session expired or you do not have permission. Please log in again."
      );

      return Promise.reject(error);
    }

    // If the error is not a 403, just return the error
    return Promise.reject(error);
  }
);

export default apiClient;
