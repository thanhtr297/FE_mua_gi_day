import React, {useEffect, useState} from "react";
import {changeOrder, listOrder} from "../../service/OrderService";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export default function Pending() {
    const navigate = useNavigate();
    const idAcc = parseInt(localStorage.getItem("account"))
    const [listAllOrder, setListAllOrder] = useState([]);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        const cart = {
            confirm: "1",
            account: {
                id: idAcc
            }
        }
        listOrder(cart).then(res => {
            setListAllOrder(res.data)
        })
    }, [check]);
    const handleFail = () => {

    }
    const handleOk = (idCart) => {
        const cart = {
            id: idCart,
            confirm: "2",
            account: {
                id: idAcc
            }
        }
        changeOrder(cart).then((res) => {
            alert("thành công")
            navigate('/shop-management/order-management/confirm')
            setCheck(!check);
        })
    }
    return (
        <>
            {listAllOrder.length !== 0 ?
                <MDBTable style={{fontSize: '16px'}}>
                    <MDBTableHead>
                        <tr style={{textAlign: 'center'}}>
                            <th style={{background: 'white', color: 'black'}}>STT</th>
                            <th style={{background: 'white', color: 'black'}}>Sản phẩm</th>
                            <th style={{background: 'white', color: 'black'}}>Số lượng</th>
                            <th style={{background: 'white', color: 'black'}}>Tổng tiền</th>
                            <th style={{background: 'white', color: 'black'}}>Người mua</th>
                            <th style={{background: 'white', color: 'black'}}>Số điện thoại</th>
                            <th style={{background: 'white', color: 'black'}}>Địa chỉ</th>
                            <th style={{background: 'white', color: 'black'}}>Xác nhận</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {listAllOrder.map((order, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-3'>
                                                    <p className='fw-bold mb-1'>{++index}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{order?.product?.name}</p>
                                            <img style={{width: "50px", height: "50px", margin: "0 0"}}
                                                 src={order?.product?.image[0]?.name} className="d-block w-100"
                                                 alt="..."/>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{order?.quantity}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{order?.price * order?.quantity}</p>
                                        </td>

                                        <td>
                                            <p className='fw-normal mb-1'>{order?.cart?.user?.name}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{order?.cart?.user?.phone}</p>
                                        </td>
                                        <td>
                                            <p className='fw-normal mb-1'>{order?.cart?.user?.address}
                                                ,{order?.cart?.user?.wards?.name}
                                                ,{order?.cart?.user?.wards?.district?.name}
                                                ,{order?.cart?.user?.wards?.district?.city?.name}</p>
                                        </td>

                                        <td>
                                            <div>
                                                <button><i className={"fa-solid fa-check"} style={{
                                                    color: '#f23607',
                                                    fontSize: '25px',
                                                    padding: '10px'
                                                }} onClick={() => handleOk(order?.cart?.id)}></i>
                                                </button>
                                                <i className={'fa-solid fa-xmark'}
                                                   style={{color: '#f23607', fontSize: '25px', padding: '10px'}}
                                                   ></i>
                                            </div>

                                        </td>
                                    </tr>

                                </>
                            )


                        })}
                    </MDBTableBody>
                </MDBTable>
                : <div>Trống</div>}
        </>
    )
}