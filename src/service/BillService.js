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

 const showCartDetailUserSelect = (idCarts) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/showProductUserSelect" , idCarts)
                .then((response) => {
                    return response.data
                }).catch(() => {
                alert("Lỗi không đặt được hàng")
            })
        )
    })
}

 const showBillByAccountAndStatus = (idAccount, status) => {
    return new Promise((resolve) => {
        resolve(
            axios.get("http://localhost:8080/api/bills?idAccount="+idAccount+"&status="+status)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

 const saveBill = (idAccount,idCartDetails, navigate) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/save/bill?idAccount="+idAccount,idCartDetails)
                .then(() => {
                    alert("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !")
                    navigate("/user-management/order/confirm")
                }).catch(() => {
                alert("Lỗi không đặt được hàng")
            })
        )
    })
}
export {showCartDetailUserSelect, showBillByAccountAndStatus,saveBill}