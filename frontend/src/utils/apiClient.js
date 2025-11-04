import axios from "axios";

const API_BASE = "/api";
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan token di setiap request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor response untuk refresh token otomatis
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // Jika token expired
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Tunggu refresh token selesai
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        // Minta access token baru
        const { data } = await axios.post(`${API_BASE}/auth/refresh`, {
          refreshToken,
        });

        const newToken = data.token;
        localStorage.setItem("token", newToken);

        apiClient.defaults.headers.Authorization = "Bearer " + newToken;
        processQueue(null, newToken);

        // Ulangi request yang gagal
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Jika bukan error 401 → biarkan
    return Promise.reject(error);
  }
);

export default apiClient;
