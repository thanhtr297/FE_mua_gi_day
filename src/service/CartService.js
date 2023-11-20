import axios from "axios";
import IntegrationNotistack from "../components/Notification/Notification";
import Notification from "../components/Notification/Notification";

export const addToCart = (cart, id) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/add?idAccount="+id, cart)
                .then(() => {
                    // alert("Thêm sản phẩm thành công !")
                    IntegrationNotistack()
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

export const deleteProductFromCart = (idCartDetail) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/carts/"+idCartDetail)
                .then(response => {
                    return response.data
                }).catch(() => {
                    return []
            })
        )
    })
}
export const deleteAllProductFromCart = (idCart) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/carts/deleteAll/"+idCart)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

export const updateQuantity = (quantity, idProduct, idCart) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/update?quantity="+quantity+"&&idProduct="+idProduct+"&&idCart="+idCart)
                .then(() => {
                    console.log("Cập nhật số lượng thành công")
                }).catch(() => {
                return []
            })
        )
    })
}