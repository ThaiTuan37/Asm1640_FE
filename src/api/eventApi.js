import apiClient from "./apiClient";

const eventApi = {
    getAll: () => {
        const url = '/events';
        return apiClient.get(url);
    },
    create: (data) => {
        const url = '/events/createEvent';
        return apiClient.post(url, data);
    },
    detail: (id) => {
        const url = `/events/detail/${id}`;
        return apiClient.get(url);
    },
    update: (id, data) => {
        const url = `events/updateEvent/${id}`;
        return apiClient.put(url, data);
    },
    download: (eventId) => {
        const url = `/events/download/${eventId}`;
        return apiClient.get(url, {
            responseType: 'blob'  // Set the responseType to blob
        })
        .then(blob => {
            return blob;
            
        })
        .catch(error => {
            throw error
        });
    },
    
};

export default eventApi;
