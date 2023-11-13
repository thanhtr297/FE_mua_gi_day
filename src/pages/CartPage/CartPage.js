import React, {useEffect, useState} from 'react';
import "./CartPage.scss";
import {shopping_cart} from '../../utils/images';
import {Link} from 'react-router-dom';
import {formatPrice} from '../../utils/helpers';
import {deleteAllProductFromCart, deleteProductFromCart, showCart, updateQuantity} from "../../service/CartService";


const CartPage = () => {
    const [carts, setCarts] = useState([])
    const idAccount = localStorage.getItem("account")
    let [checkDelete, setCheckDelete] = useState(false)
    let [totalPrice, setTotalPrice] = useState([])
    const [totalPrices, setTotalPrices] = useState([]);
    let [idCart, setIdCart] = useState();
    const [quantitys, setQuantitys] = useState([]);



    useEffect(() => {
        showCart(idAccount).then((response) => {
            setCarts(response)
            console.log(response)
        })
    }, [checkDelete, idAccount])

    useEffect(() => {
        const singleSumPrice = (cart) => {
            const productPrice = cart.product.price - (cart.product.price * cart.product.promotion / 100);
            return productPrice * cart.quantity;
        };

        const sumPrice = carts.map((cart) => singleSumPrice(cart));
        setTotalPrices(sumPrice);

        let totalPrice = 0;
        for (let i = 0; i < sumPrice.length; i++) {
            totalPrice += sumPrice[i];
        }
        setTotalPrice(totalPrice);
    }, [carts]);


    useEffect(() => {
        carts.map((c) => {
            return(
                setIdCart(c.cart.id)
            )
        })
    })

    useEffect(() => {
        const sumQuantity = (cart) => {
            const qty = cart.quantity;
            return qty;
        };
        const singleQuantity = carts.map((cart) => sumQuantity(cart));
        setQuantitys(singleQuantity)

    }, [carts]);


    const increaseQty = (maxQty, index, quantity, idProduct, idCart) => {
        setQuantitys((prevQty) => {
            const newQtys = [...prevQty];
            let newQty = newQtys[index] + 1;
            if (newQty > maxQty) {
                newQty = maxQty;
                alert("Số lượng sản phẩm bạn muốn mua đã hết hàng");
            }
            newQtys[index] = newQty;
            return newQtys;
        });
        // updateQuantityInDB(quantity, idProduct, idCart);
    };

    const decreaseQty = (quantity, idProduct, idCart, index) => {
        setQuantitys((prevQty) => {
            const newQtys = [...prevQty];
            let newQty = newQtys[index] - 1;
            if (newQty < 1) {
                newQty = 1;
                alert("Số lượng sản phẩm phải lớn hơn 0");
            }
            newQtys[index] = newQty;
            return newQtys;
        });

            // updateQuantityInDB(quantity, idProduct, idCart);
    };



    const updateQuantityInDB = (idProduct, quantity, idCart) => {
        updateQuantity(idProduct, quantity, idCart).then()

    }
    function deleteProduct(idCartDetail) {
        if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
            deleteProductFromCart(idCartDetail).then(() => {
                setCheckDelete(!checkDelete);
                alert("Xóa sản phẩm thành công!")
            })
        }
    }

    function deleteAll(idCart) {
        if (window.confirm("Bạn có muốn xóa tất cả sản phẩm không trong giỏ hàng không?")) {
            deleteAllProductFromCart(idCart).then(() => {
                setCheckDelete(!checkDelete);
                alert("Xóa sản phẩm thành công!")
            })
        }
    }




    if (carts.length === 0) {
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
                <div className='cart-ctable'>
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
                                <span className='cart-ctxt'>Số tiền</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Thao tác</span>
                            </div>
                        </div>
                    </div>

                    <div className='cart-cbody bg-white'>
                        {
                            carts.map((cart, index) => {
                                return (
                                    <div className='cart-ctr py-5' key={cart?.id}>
                                        {/*{setIdCart(cart?.cart.id)}*/}
                                        <div className='cart-ctd'>
                                            <span className='cart-ctxt'>{index + 1}</span>
                                        </div>
                                        <div className='cart-ctd' style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                style={{ width: "60px", height: "50px", marginRight: "20px" }}
                                                src={cart.product.image[0].name}
                                                alt="..."
                                            />
                                            <span className='cart-ctxt'>{cart.product.name}</span>
                                        </div>
                                        <div className='cart-ctd'>
                                          <span className='cart-ctxt'>
                                           (<del>{formatPrice(cart.product.price)}</del>) / {formatPrice(cart.product.price - (cart.product.price * cart.product.promotion / 100))}
                                          </span>
                                        </div>
                                        <div className='cart-ctd'>
                                            <div className='qty-change flex align-center'>
                                                <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => {decreaseQty(index)}}>
                                                    <i className='fas fa-minus'></i>
                                                </button>
                                                <div className='qty-value flex align-center justify-center'>
                                                    {/*{quantitys[index]}*/}
                                                    <input style={{width: "15px", fontStyle: "2px", textAlign: "center"}}
                                                        type="text"
                                                        value={quantitys[index]}
                                                        onChange={(e) => {
                                                            const newQty = parseInt(e.target.value);
                                                            setQuantitys[index](newQty)
                                                            if (newQty >= 1 && newQty <= cart.product.quantity) {
                                                                updateQuantityInDB(newQty, cart.product.id, cart.cart.id);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => {increaseQty(cart.product.quantity, index)}}>
                                                    <i className='fas fa-plus'></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className='cart-ctd'>
                                            <span
                                                className='cart-ctxt text-orange fw-5'>{formatPrice(totalPrices[index])}</span>
                                        </div>

                                        <div className='cart-ctd'>
                                            <button type="button" className='delete-btn text-dark'
                                                    onClick={() => deleteProduct(cart.id)}>Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                        <div className='cart-cfoot-l'>
                            <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4'
                                    onClick={() => {deleteAll(idCart)}}>
                                <i className='fas fa-trash'></i>
                                <span className='mx-1'>Xóa tất cả sản phẩm</span>
                            </button>
                        </div>

                        <div className='cart-cfoot-r flex flex-column justify-end'>
                            <div className='total-txt flex align-center justify-end'>
                                {/*<div className='font-manrope fw-5'>Total ({itemsCount}) items:</div>*/}
                                <div className='font-manrope fw-10' style={{fontSize: "15px", fontStyle: "normal", marginTop: "5px"}}>Tổng tiền:</div>
                                <span className='text-orange fs-22 mx-2 fw-6'>{formatPrice(totalPrice)}</span>
                            </div>

                            <button type="button" className='checkout-btn text-white bg-orange fs-16'>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage