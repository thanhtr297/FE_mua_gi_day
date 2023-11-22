import axios from "axios";

const notificationShop = (id) => {
    return axios.get("http://localhost:8080/api/notification/shop/" + id );
}
const notificationUser = (id) => {
    return axios.get("http://localhost:8080/api/notification/user/" + id );
}
export {notificationShop ,notificationUser}