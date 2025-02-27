export const baseURL = import.meta.env.VITE_SERVER_API;
const SummaryApi = {
    register: {
        url: `/api/register`,
        method: "post",
    },
    login: {
        url: `/api/login`,
        method: "post",
    },
    logout: {
        url: `/api/logout`,
        method: "post",
    },
    refreshToken: {
        url: `/api/refreshToken`,
        method: "post",
    },
    getProfile: {
        url: `/api/profile`,
        method: "get",
    },
    updateUser: {
        url: `/api/user/update`,
        method: "PATCH",
    },
    uploadMedia: {
        url: `api/upload`,
        method: "POST",
    },
    findUser: {
        url: `api/findUser`,
        method: "POST"
    }

}
export default SummaryApi;