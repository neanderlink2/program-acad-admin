import axios, { AxiosError } from 'axios';
import store from '../configs/middlewares';
import { signOut } from '../configs/firebaseConfig';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'https://programacadapipresentation20200109114653.azurewebsites.net/api'
        :
        'https://programacadapipresentation20200109114653.azurewebsites.net/api'
});

api.interceptors.request.use(async config => {
    const user = store.getState().login.user;

    if (user && user.token) {
        console.log(user.token);
        config.headers.Authorization = `Bearer ${user.token}`;
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