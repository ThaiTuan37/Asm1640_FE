import apiClient from "./apiClient";

const commentApi = {
    getAll: (contributionId) => {
        const url = `comments/${contributionId}`;
        return apiClient.get(url);
    },
    create: (data) => {
        const url = '/comments/create';
        return apiClient.post(url, data);
    },
    // update: (data) => {
    //     const url = `/users/update/${data.userId}`;
    //     return apiClient.put(url, data);
    // },
    // delete: (userId) => {
    //     const url = `/users/delete/${userId}`;
    //     return apiClient.delete(url);
    // },
    // getDetail: (userId) => {
    //     const url = `/users/${userId}`;
    //     return axiosClient.get(url);
    // },
    // getUserUpdate: () => {
    //     const url = 'users/update';
    //     return axiosClient.get(url);
    // }
}

export default commentApi;


