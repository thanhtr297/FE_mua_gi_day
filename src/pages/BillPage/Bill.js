import React, {useEffect, useState} from 'react';
import "./BillPage.scss";
import {shopping_cart} from '../../utils/images';
import {Link, useNavigate} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {showBillByAccount} from "../../service/BillService";


const Bill = () => {
    const idAccount = localStorage.getItem("account")
    const navigate = useNavigate()
    const [bills, setBills] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        showBillByAccount(idAccount).then((response) => {
            setBills(response)
        })
    }, [idAccount])

    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < bills.length; i++) {
            totalPrice += bills[i].total;
        }
        setTotalPrice(totalPrice);
    }, [bills]);

    function addToBill() {
        navigate("/bill")
    }


    if (bills.length === 0) {
        return (
            <div className='containerr my-5'>
                <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
                    <img src={shopping_cart} alt=""/>
                    <span className='fw-6 fs-15 text-gray'>Your shopping cart is empty.</span>
                    <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Go shopping Now</Link>
                </div>
            </div>
        )
    }

    return (
        <div className='cart bg-whitesmoke'>
            <div className='containerr'>
                <div className='cart-ctable1'>
                    <div className='cart-chead bg-white' style={{height: "50px"}}>
                        <h3 style={{color: "red", paddingTop: "5px"}}>Địa chỉ nhận hàng :</h3>
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
                                            {/*<button type="button" className='delete-btn text-dark'*/}
                                            {/*        onClick={() => deleteProduct(cart.id)}>Delete*/}
                                            {/*</button>*/}
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
                            <div className='total-txt flex align-center justify-end'>
                                {/*<div className='font-manrope fw-5'>Total ({itemsCount}) items:</div>*/}
                                <div className='font-manrope fw-10'
                                     style={{fontSize: "15px", fontStyle: "normal", marginTop: "5px"}}>Tổng tiền:
                                </div>
                                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                            </div>

                            <button style={{marginLeft: "1050px"}} type="button" className='checkout-btn text-white bg-orange fs-16' onClick={() => {
                                addToBill()
                            }}>Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bill