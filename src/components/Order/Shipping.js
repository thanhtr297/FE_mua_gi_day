import React, {useEffect, useState} from "react";
import {allOrderByShop, listOrder} from "../../service/OrderService";
import {MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";

export default function Shipping() {
    const idAcc = parseInt(localStorage.getItem("account"))
    const [listAllOrder, setListAllOrder] = useState([]);
    useEffect(() => {
      const cart =  {
            confirm: "2",
            account: {
                id: idAcc
            }
        }
        console.log(cart)
        listOrder(cart).then(res => {
            setListAllOrder(res.data)
        })
    }, []);
    return (
        <>
            {listAllOrder.length !== 0 ?
                <MDBTable style={{fontSize: '16px'}}>
                    <MDBTableHead >
                        <tr style={{textAlign:'center'}}>
                            <th style={{background:'white',color:'black'}}>STT</th>
                            <th style={{background:'white',color:'black'}}>Sản phẩm</th>
                            <th style={{background:'white',color:'black'}}>Số lượng</th>
                            <th style={{background:'white',color:'black'}}>Tổng tiền</th>
                            <th style={{background:'white',color:'black'}}>Người mua</th>
                            <th style={{background:'white',color:'black'}}>Số điện thoại</th>
                            <th style={{background:'white',color:'black'}}>Địa chỉ</th>
                            <th style={{background:'white',color:'black'}}>Trạng thái</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {listAllOrder.map((order,index) => {
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
                                            <img style={{width:"50px", height: "50px", margin: "0 0"}} src={order?.product?.image[0]?.name} className="d-block w-100" alt="..."/>
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
                                            {
                                                ( order?.cart?.confirm == 1 ) ? 'đang chờ duyệt'
                                                    : ( order?.cart?.confirm == 2 ? 'đang giao hàng' :
                                                        (( order?.cart?.confirm == 3 ? 'đơn hàng bị từ chối vì ' + order?.cart?.reason : 'đơn hàng bị hủy do khách ' + order?.cart?.reason  )))
                                            }
                                            {/*<button onClick={() => {*/}
                                            {/*    // update(p.id)*/}
                                            {/*}} className={'btn btn-warning'} style={{fontSize: '12px'}}>Chấp nhận*/}
                                            {/*</button>*/}
                                            {/*<br/>*/}
                                            {/*<br/>*/}
                                            {/*<button onClick={() => {*/}
                                            {/*    // deleteP(p.id)*/}
                                            {/*}} className={'btn btn-danger'} style={{fontSize: '12px'}}>Hủy*/}
                                            {/*</button>*/}
                                        </td>
                                    </tr>

                                </>
                            )


                        })}
                    </MDBTableBody>
                </MDBTable>
                : <div>Trống</div> }
        </>
    )
}