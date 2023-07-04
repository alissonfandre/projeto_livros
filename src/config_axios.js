import axios from "axios"

//criar uma isntancia axios com a URL do beck end

export const api = axios.create({
    baseURL: 'http://localhost:3001'
});

