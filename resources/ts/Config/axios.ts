import axios from 'axios'
import {selectToken} from "../Stores/Reducers/AuthSlice";
import {store} from "../Stores/store";

const api = axios.create({
   baseURL: "http://localhost/",
});

api.interceptors.request.use((config) => {
    const token = selectToken(store.getState());
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        return error.response;
    }
    return error;
});

export default api;
