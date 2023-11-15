import axios from "axios";

// export const saveBill = (bill, navigate) => {
//     return new Promise((resolve) => {
//         resolve(
//             axios.post("http://localhost:8080/api/bills/", bill)
//                 .then(() => {
//                     alert("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !")
//                     navigate("/info")
//                 }).catch(() => {
//                 alert("Lỗi không đặt được hàng")
//             })
//         )
//     })
// }

export const addToBill = (idCarts, navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/", idCarts)
                .then(() => {
                    alert("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !")
                    navigate("/info")
                }).catch(() => {
                alert("Lỗi không đặt được hàng")
            })
        )
    })
}

export const showBillByAccount = (idAccount) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bills?idAccount="+idAccount)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

export const saveToBill = (idAccount,bills, navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/save?idAccount="+idAccount, bills )
                .then(() => {
                    alert("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !")
                    navigate("/")
                }).catch(() => {
                alert("Lỗi không đặt được hàng")
            })
        )
    })
}