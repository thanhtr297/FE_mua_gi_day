import axios from "axios";
import {toast} from "react-toastify";

 const showCartDetailUserSelect = (idCarts) => {
    return new Promise((resolve) => {
        resolve(
            axios.post("http://localhost:8080/api/carts/showProductUserSelect" , idCarts)
                .then((response) => {
                    return response.data
                }).catch(() => {
                toast.error("Lỗi không đặt được hàng")
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
                    toast.success("Đặt hàng thành công, vui lòng chờ chủ shop xác nhận !")
                    navigate("/user-management/order/confirm")
                }).catch(() => {
                toast.error("Lỗi không đặt được hàng")
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
                    toast.success("Nhận hàng thành công!")
                }).catch(() => {
                toast.error("Lỗi không nhận được hàng!")
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
                        toast.success("Hủy đơn hàng thành công!")
                    }  else {
                        toast.error("Bạn cần nhập lý do hủy đơn hàng")
                    }
                }).catch(() => {
                toast.error("Lỗi không hủy được đơn hàng")
            })
        )
    })
}

export {showCartDetailUserSelect, showBillByAccountAndStatus,saveBill, cancelBill, cancelBillByReason, receive}