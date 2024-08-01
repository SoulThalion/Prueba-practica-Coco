import axios from "axios";


export const app = axios.create({
    baseURL: "http://localhost:8000/api"
})

export default app