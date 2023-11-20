import axios from "axios";
import {API_URL} from "../utils/config";

export const findCommentByIdP = (id) => {
    return axios.get(`${API_URL}/api/comments/product/${id}`);
}
export const saveComment = (comment) => {
    return axios.post(`${API_URL}/api/comments/`, comment);
}
