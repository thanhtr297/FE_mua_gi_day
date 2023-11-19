import axios from "axios";

export const findOneShop = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/shops/" + id)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}