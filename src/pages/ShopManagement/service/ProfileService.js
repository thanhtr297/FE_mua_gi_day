import axios from "axios";

export const findShop = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/shops/account/"+1)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}