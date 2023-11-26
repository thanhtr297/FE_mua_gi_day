import Axios from "../config/axiosConfig";
import { LIST_MESSAGE_IN_FRIEND,  SEND_MESSAGE} from "../API/api";

const UserService = {

    messageAllFriend: async (fromUserId, toUserId) => {
        return await Axios.post("/allFriend?fromUserId="+fromUserId+"&&toUserId="+toUserId);
    },
    messageAllInFriend: async (id,principal) => {
        return await Axios.post(LIST_MESSAGE_IN_FRIEND+id,principal);
    },
    sendMessage: async (message) => {
        return await Axios.post(SEND_MESSAGE,message);
    },
}
export default UserService;