import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://192.168.1.104:7124',
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'accept': '*/*',
        'Content-Type': 'application/ json',
}
});
export const useAuthInstance = () => {
    const api = axios.create({
        baseURL: 'https://192.168.1.104:7124',
        timeout: 10000,
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/ json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Access-Control-Allow-Origin': '*',
        },
    });

    return api;
}
export const useAuthInstanceWithBearer = (bearer: string) => {
    const api = axios.create({
        baseURL: 'https://192.168.1.104:7124',
        timeout: 10000,
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/ json',
            Authorization: `Bearer ${bearer}`,
            'Access-Control-Allow-Origin': '*',
        },
    });

    return api;
}