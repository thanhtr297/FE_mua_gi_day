import axios from "axios";

const listOrder = (cartDTO) => {
    return axios.post("http://localhost:8080/api/cartDetails/shop" ,cartDTO );
}
const changeOrder = (cartDTO) => {
    return axios.post("http://localhost:8080/api/cartDetails/changeOrder" ,cartDTO );
}
const allOrderByShop = (idAcc) => {
    return axios.get("http://localhost:8080/api/cartDetails/allOrder/" + idAcc );
}
export {listOrder ,allOrderByShop ,changeOrder}