import axios from "axios";

export const findShop = (idAcc) => {

    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/shops/account/"+idAcc)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}
export const saveShop = (data,navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/shops/",data)
                .then(response => {
                    return navigate("/shop-management/demo")
                }).catch(() => {

            })
        )
    })
}