import axios from "axios";
import {LoginType} from "../types/genericTypes";
const URL = "http://localhost:3000/login";

export const fetchLogin = async (username: string, password: string) => {
    const response = await axios.post(URL, {
        username: username,
        password: password
    });
    return response.data;
};
