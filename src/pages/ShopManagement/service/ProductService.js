import axios from "axios";

export const findAllProduct = () => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/products")
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}
export const findOneProduct = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/products/" + id)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}
export const save = (product, navigate) => {
    return new Promise((resolve) =>{
        resolve(
            axios.post("http://localhost:8080/api/products", product)
                .then(() => {
                    alert("Thành công !")
                    return navigate("/shop-management/list-product")
                }).catch(() => {
                alert("Thất bại !")
                return navigate ("/shop-management/list-product")
            })
        )
    })
}
export const deleteById = (id) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/products/" +id)
                .then(response => {
                    return response.data
                }).catch(() => {
                return {}
            })
        )
    })
}