import Axios from "../config/axiosConfig";
import {LIST_MESSAGE_FRIEND, LIST_MESSAGE_IN_FRIEND, LOGIN, REGISTER, SEND_MESSAGE} from "../API/api";

const UserService = {
    login: async (user) => {
        return await Axios.post(LOGIN, user);
    },
    register: async (user) => {
        return await Axios.post(REGISTER, user);
    },
    checkLogin: async (user) => {
        return await Axios.post('/fail', user);
    },
    messageAllFriend: async (id) => {
        return await Axios.get(LIST_MESSAGE_FRIEND+id);
    },
    messageAllInFriend: async (id,principal) => {
        return await Axios.post(LIST_MESSAGE_IN_FRIEND+id,principal);
    },
    sendMessage: async (message) => {
        return await Axios.post(SEND_MESSAGE,message);
    },
}
export default UserService;