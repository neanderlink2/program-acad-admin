import axios from 'axios';
import { signOut } from '../configs/firebaseConfig';
import store from '../configs/middlewares';

export const URL_BASE_API = process.env.NODE_ENV === 'production' ?
    'https://program-acad-api.azurewebsites.net/api'
    :
    //'https://program-acad-api.azurewebsites.net/api'
    'http://localhost:9000/api';

const api = axios.create({
    baseURL: URL_BASE_API
});

api.interceptors.request.use(async config => {
    const token = store.getState().account.auth.token;

    if (token) {
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getRequest = async (url, params) => {
    return api.get(url, { params });
}

export const postRequest = async (url, body, params) => {
    return api.post(url, body, { params });
}

export const putRequest = async (url, body, params) => {
    return api.put(url, body, { params });
}

export const deleteRequest = async (url, params) => {
    return api.delete(url, { params });
}

export const patchRequest = async (url, body, params) => {
    return api.patch(url, body, { params });
}

export const formatErrors = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return error.response.data.map((e) => e.detail);
            case 401:
                signOut();
                return ["Não autorizado"];
            case 404:
                return ["Nenhum dado foi encontrado"];
            default:
                return ["Erro interno do servidor"];
        }
    }
    return [];
};

export default api;