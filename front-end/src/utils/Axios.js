import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAccessToken(refreshToken);
                    if (newAccessToken) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return Axios(originalRequest);
                    }
                } catch (refreshError) {

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

const refreshAccessToken = async (refreshToken) => {
    try {

        const response = await axios({
            method: 'post',
            url: `${baseURL}/api/refreshToken`,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        });

        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};

export default Axios;