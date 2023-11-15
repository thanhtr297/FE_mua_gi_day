import React, {useEffect, useState} from "react";
import {listBillDetailByShop} from "../../service/OrderService";
import {STATUS} from "../../utils/status";
import Loader from "../Loader/Loader";
import BillList from "./BillList";
import {userCheck} from "../../service/UserService";

export default function AllOrder() {
    const idAcc = localStorage.getItem("account")
    const [user, setUser] = useState([]);
    const [billDetail, setBillDetail] = useState([]);

    const [demo, setDemo] = useState(true)
    useEffect(() => {
        userCheck(idAcc).then(res => {
            setUser(res.data)
        })

        listBillDetailByShop(idAcc).then(res => {
            setBillDetail(res.data);
        })
    }, [demo]);
    const listBillByUser = new Array(user.length).fill(0);
    if (billDetail.length > 0) {
        for (let i = 0; i < user.length; i++) {
            let product = [];
            for (let j = 0; j < billDetail.length; j++) {
                if (billDetail[j]?.bill?.account?.username === user[i]) {
                    product.push(billDetail[j])
                }
            }
            listBillByUser[i] = product;
        }
    }

    const m1 = () => {

    }

    return (
        <div style={{backgroundColor: '#f6f6f6' ,fontSize : '15px' }}>
            <div style={{display: 'flex' ,backgroundColor: 'rgb(232, 232, 232)' ,marginBottom : '15px' ,fontSize : '17px' ,height: '55px'}}>
                <div style={{marginLeft : '25px' ,marginTop : '12px'}}>Sản phẩm</div>
                <div style={{marginLeft : '380px' ,marginTop : '12px'}}>
                    <p>Tổng đơn hàng</p>
                </div>
                <div style={{marginLeft : '55px' ,marginTop : '12px'}}>
                    <p>Trạng thái</p>
                </div>
                <div style={{marginLeft : '150px' ,marginTop : '12px'}}>
                    <p>Thao tác</p>
                </div>
            </div>
            <div>
                {listBillByUser.map((item) => (
                    (item.length > 0) ?
                        <div className=''>
                            <div >
                                <div style={{fontWeight: 'bold'}}>Khách hàng : {item[0]?.bill?.account?.username} - {item[0]?.bill?.phone}</div>
                                <div>Địa chỉ :{item[0]?.bill?.address}
                                    ,{item[0]?.bill?.wards?.name}
                                    ,{item[0]?.bill?.wards?.district?.name}
                                    ,{item[0]?.bill?.wards?.district?.city?.name} </div>
                            </div>

                            {
                                item === STATUS.LOADING ? <Loader/> : <BillList items={item} test={m1}/>
                            }
                        </div>
                        :
                        <div></div>
                ))}
            </div>

        </div>
    )
}