import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Set your API base URL
});

// Request Interceptor (optional, e.g., to add authentication token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for Error Handling
api.interceptors.response.use(
  (response) => response, // Pass the response through if it’s successful
  (error) => {
    if (error.response) {
      // You can handle different status codes here
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Redirect to login page
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden - Show an appropriate message
          alert("You do not have permission to perform this action.");
          break;
        case 404:
          // Not found - Show a custom 404 error message
          alert("The resource you requested could not be found.");
          break;
        case 500:
          // Internal server error - Show a generic error message
          alert("An error occurred on the server. Please try again later.");
          break;
        default:
          // Other errors
          alert(data.message || "An error occurred. Please try again.");
          break;
      }
    } else if (error.request) {
      // Network error or no response from server
      alert(
        "No response from the server. Please check your network connection."
      );
    } else {
      // Other unknown error
      alert("An error occurred. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default api;
