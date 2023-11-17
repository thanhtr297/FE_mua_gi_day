import React, {useEffect, useState} from 'react';
import "./BillUser.scss";
import {shopping_cart} from '../../utils/images';
import {Link, useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {cancelBill, showBillByAccountAndStatus} from "../../service/BillService";
import {findUserByAccount} from "../../pages/UserManagement/Service/UserService";
import { GiCancel } from "react-icons/gi";


const ShippingUser = () => {
    const idAccount = localStorage.getItem("account")
    const navigate = useNavigate()
    const [bills, setBills] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [user, setUser] = useState({})
    const status = "Đang giao"
    const [check, setCheck] = useState(true)


    useEffect(() => {
        showBillByAccountAndStatus(idAccount, status).then((response) => {
            setBills(response)
        })
    }, [check])

    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < bills.length; i++) {
            totalPrice += bills[i].total;
        }
        setTotalPrice(totalPrice);
    }, [bills]);

    useEffect(() => {
        console.log(idAccount)
        findUserByAccount(idAccount).then((res) => {
            setUser(res)
        })
    },[])

    function cancelBillDetail(idBillDetail) {
        if (window.confirm("Bạn có muốn hủy sản phẩm không ?")) {
            cancelBill(idBillDetail).then(() => {
                setCheck(!check);
                alert("Hủy sản phẩm thành công!")
            })
        }
    }



    function changeAddress() {
        navigate(("/user-management/profile"))
    }


    if (bills.length === 0) {
        return (
            <div className='containerr my-5'>
                <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
                    <img src={shopping_cart} alt=""/>
                    <span className='fw-6 fs-15 text-gray'>Đơn hàng trống</span>
                    <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Mua hàng ngay!</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='cart bg-whitesmoke'>
            <div className='containerr'>
                <div className='cart-ctable1'>
                    <div className='cart-chead bg-white' style={{height: "50px"}}>
                        <div style={{display: "flex"}}><h3 style={{color: "red", paddingTop: "11px"}}>Địa chỉ nhận hàng :</h3>
                            <b style={{fontSize: "15px", marginLeft:"10px", marginTop: "10px" }}>{user?.name}  ({user?.phone})</b>
                            <p style={{fontSize: "13px", marginLeft: "15px", marginTop: "12px"}}>{user?.address} {user?.wards?.name}, {user?.wards?.district?.name}, {user?.wards?.district?.city?.name}</p>

                            <button   style={{marginLeft: "50px", marginTop: "3px"}} type="button" className='delete-btn text-danger' onClick={() =>{
                                changeAddress()
                            }}>Thay đổi
                            </button>

                        </div>

                    </div>
                </div>
                <div className='cart-ctable1'>
                    <div className='cart-chead bg-white'>
                        <div className='cart-ctr fw-6 font-manrope fs-15'>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>STT</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Sản phẩm</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Đơn giá</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Số lượng</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Thành tiền</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Thao tác </span>
                            </div>
                        </div>
                    </div>

                    <div className='cart-cbody bg-white'>
                        {
                            bills.map((bill, index) => {
                                return (
                                    <div className='cart-ctr py-5' key={bill?.id}>
                                        <div className='cart-ctd'>
                                            <span className='cart-ctxt'>{index + 1}</span>
                                        </div>
                                        <div className='cart-ctd' style={{display: 'flex', alignItems: 'center'}}>
                                            <img
                                                style={{width: "60px", height: "50px", marginRight: "20px"}}
                                                src={bill.product.image[0].name}
                                                alt="..."
                                            />
                                            <span className='cart-ctxt'>{bill.product.name}</span>
                                        </div>
                                        <div className='cart-ctd'>
                                          <span className='cart-ctxt'>
                                           (<del>{formatPrice(bill.product.price)}</del>) / {formatPrice(bill.price)}
                                          </span>
                                        </div>
                                        <div className='cart-ctd' style={{marginLeft: "27px"}}>
                                            <span className='cart-ctxt'>{bill.quantity}</span>

                                        </div>
                                        <div className='cart-ctd'>
                                            <span
                                                className='cart-ctxt text-orange fw-5'>{formatPrice(bill.total)}</span>
                                        </div>

                                        <div className='cart-ctd'>
                                            <GiCancel style={{scale: "1.5", color: "D70018"}} onClick={() => {
                                                cancelBillDetail(bill.id)
                                            }}/>
                                            <button style={{marginLeft: "15px", marginTop: "2px"}} type="button" className='delete-btn text-dark'
                                                    onClick={() => {
                                                        cancelBillDetail(bill.id)
                                                    }}>Hủy đơn
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                        {/*<div className='cart-cfoot-l'>*/}
                        {/*    <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4'*/}
                        {/*            onClick={() => {*/}
                        {/*                deleteAll(idCart)*/}
                        {/*            }}>*/}
                        {/*        <i className='fas fa-trash'></i>*/}
                        {/*        <span className='mx-1'>Xóa tất cả sản phẩm</span>*/}
                        {/*    </button>*/}
                        {/*</div>*/}

                        <div className='cart-cfoot-r flex flex-column justify-end'>
                            <div  style={{marginLeft: "900px"}} className='total-txt flex align-center justify-end'>
                                {/*<div className='font-manrope fw-5'>Total ({itemsCount}) items:</div>*/}
                                <div className='font-manrope fw-10'
                                     style={{fontSize: "15px", fontStyle: "normal", marginTop: "5px"}}>Tổng tiền:
                                </div>
                                <span  className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingUser