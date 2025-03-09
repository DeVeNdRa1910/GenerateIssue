import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
})

export const login = async (data: { email: string; password: string }) => {
    const resp = await api.post("/api/login", data);
    return resp.data;
};

export const createUser = async (data: FormData) => {
    const resp = await api.post("/api/userCreate", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return resp.data;
};

export const createAdmin = async (data: FormData) => {
    const resp = await api.post("/api/adminCreate", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return resp.data;
};