import axios from "axios";

export const addToCart = (cart, id) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/add?idAccount="+id, cart)
                .then(() => {
                    alert("Thêm sản phẩm thành công !")
                }).catch(() => {
                alert("Thêm sản phẩm thất bại")
            })
        )
    })
}

export const showCart = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/carts/"+id)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}