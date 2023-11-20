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

 const cancelBill = (idBill) => {
    return new Promise((resolve) => {
        resolve(
            axios.delete("http://localhost:8080/api/bills/"+idBill)
                .then(response => {
                    return response.data
                }).catch(() => {
                return []
            })
        )
    })
}

const receive = (idBill) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/receive?idBill="+idBill)
                .then(() => {
                    alert("Bạn đã nhận hàng thành công!")
                }).catch(() => {
                alert("Lỗi")
            })
        )
    })
}
const cancelBillByReason = (idBill, reason) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/bills/cancel?idBill="+idBill+"&reason="+reason)
                .then(() => {
                    if(reason.length > 0) {
                    alert("Hủy đơn hàng thành công!") }
                    else {
                        alert("Bạn cần nhập lý do hủy đơn hàng")
                    }
                }).catch(() => {
                alert("Lỗi không hủy được đơn hàng")
            })
        )
    })
}

export {showCartDetailUserSelect, showBillByAccountAndStatus,saveBill, cancelBill, cancelBillByReason, receive}