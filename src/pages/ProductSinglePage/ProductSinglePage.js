import React, {useEffect, useState} from 'react';
import "./ProductSinglePage.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getSingleProductStatus} from '../../store/productSlice';
import {STATUS} from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import {getCartMessageStatus} from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";
import {getProductById} from "../../service/ProductService";
import {addToCart} from "../../service/CartService";
import {findShop} from "../ShopManagement/service/ProfileService";
import {SnackbarProvider, useSnackbar} from "notistack";
import Button from "react-bootstrap/Button";
import IntegrationNotistack from "../../components/Notification/Notification";

const ProductSinglePage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const productSingleStatus = useSelector(getSingleProductStatus);
    const [quantity, setQuantity] = useState(1);
    const cartMessageStatus = useSelector(getCartMessageStatus);
    let idAccount = localStorage.getItem("account");
    let navigate = useNavigate()
    const [idShop , setIdShop] = useState(0);


    // getting single product
    useEffect(() => {
        findShop(idAccount).then((res) => {
            setIdShop(res.id) ;
        }).catch( () =>{

        })
        getProductById(id).then((res) => {
            setProduct(res.data);
        })

    }, [cartMessageStatus]);

    let discountedPrice = (product?.price) - (product?.price * (product?.promotion / 100));
    if (productSingleStatus === STATUS.LOADING) {
        return <Loader/>
    }

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.quantity) {
                tempQty = product?.quantity;
            }
            return tempQty;
        })
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) {
                tempQty = 1;
            }
            return tempQty;
        })
    }
    const addToCartHandler = (product) => {
        const cart = {
            product: {
                id: product.id
            },
            quantity: quantity
        }
        addToCart(cart, idAccount).then()

    }

    function shopProfile(id) {
        return navigate("/shop-management/shop-profile/" + id)
    }
    function saveToBill ()  {
        addToCartHandler(product)
        navigate("/cart");
    }

    return (
        <main className='py-5 bg-whitesmoke'>
            <div className='product-single'>
                <div className='containerr'>
                    <div className='product-single-content bg-white grid'>
                        <div className='product-single-l'>
                            <div className='product-img'>
                                <div className='product-img-zoom'  style={{border : '1px solid black'}}>
                                    <img style={{width: '350px', height: '350px', marginLeft: '100px' ,marginTop: '10px'}}
                                         src={product?.image === undefined ? '' : product?.image[0]?.name} alt=""
                                         className='img-cover'/>
                                </div>
                                <div className='product-img-thumbs flex align-center my-2'>
                                    {product?.image?.map(p => {
                                        return (
                                            <div className='thumb-item'>
                                                <img src={p?.name} alt="" className='img-cover'/>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>

                        <div className='product-single-r'>
                            <div className='product-details font-manrope'>
                                <div className='title fs-20 fw-5'>{product?.name}</div>

                                <div className='info flex align-center flex-wrap fs-14'>
                                    <div className='rating'>

                    <span className='mx-1'>
                      {/*{product?.rating}*/}
                        5 *
                    </span>
                                        <span className='text-orange fw-5'
                                              style={{marginRight: '20px'}}>Đánh giá </span>
                                    </div>
                                    <div className='vert-line'></div>
                                    {/*<div className='brand'>*/}
                                    <span className='text-orange fw-5' style={{marginRight: '20px'}}>||</span>
                                    {/*  <span className='mx-1'>{product?.brand?.name}</span>*/}
                                    {/*</div>*/}
                                    <div className='vert-line'></div>
                                    <div className='brand'>

                    <span className='mx-1 text-capitalize'>
                      {product?.count}
                    </span><span className='text-orange fw-5'>Đã bán</span>
                                    </div>
                                    <div>
                                        <p className='para fw-3 fs-15'
                                           style={{whiteSpace: 'pre-line'}}>{product?.description}</p>
                                    </div>
                                </div>

                                <div className="price">
                                    <div className='flex align-center my-1'>
                                        <div className='old-price text-gray' style={{marginRight: '20px'}}>
                                            {formatPrice(product?.price)}
                                        </div>
                                        <div className='new-price fw-5 font-poppins fs-24 text-orange'
                                             style={{marginRight: '20px'}}>
                                            {formatPrice(discountedPrice)}
                                        </div>
                                        <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                                            {product?.promotion}% GIẢM
                                        </div>
                                    </div>
                                </div>

                                <div className='qty flex align-center my-4'>
                                    <div className='qty-text'>Số lượng:</div>
                                    <div className='qty-change flex align-center mx-3'>
                                        <button type="button" className='qty-decrease flex align-center justify-center'
                                                onClick={() => decreaseQty()}>
                                            <i className='fas fa-minus'></i>
                                        </button>
                                        <div className="qty-value flex align-center justify-center">{quantity}</div>
                                        <button type="button" className='qty-increase flex align-center justify-center'
                                                onClick={() => increaseQty()}>
                                            <i className='fas fa-plus'></i>
                                        </button>
                                        <div className='qty-text' style={{marginLeft: '20px'}}>{product.quantity} sản
                                            phẩm có sẵn
                                        </div>
                                    </div>
                                    {
                                        (product?.quantity === 0) ? <div
                                            className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out
                                            of stock</div> : ""
                                    }
                                </div>

                                <div className='btns'>
                                    <button type="button" className='add-to-cart-btn btn'
                                            disabled={idShop === product?.shop?.id}>
                                        <i className='fas fa-shopping-cart'></i>
                                        <span className='btn-text mx-2' onClick={() => {
                                            addToCartHandler(product)
                                        }}>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button type="button" className='buy-now btn mx-3'
                                            disabled={idShop === product?.shop?.id} onClick={() => {saveToBill()}}>
                                        <span className='btn-text'>Mua ngay</span>
                                    </button>
                                    {/*<IntegrationNotistack addClick = {() => addToCartHandler(product)}></IntegrationNotistack>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {cartMessageStatus && <CartMessage/>}
            <br/>
            <br/>
            <br/>
            <div className='product-single-r'>
                <div className='product-single'>
                    <div className='containerr'>
                        <div className='product-single-content bg-white grid'>
                            <div style={{display: 'flex'}}>
                                <img src={product?.shop?.avatar} alt=""
                                     style={{height: '80px', width: '80px', borderRadius: '50px'}}/>
                                <div style={{marginLeft: '20px'}}>
                                    <h3>
                                        {product?.shop?.name}
                                    </h3>
                                    <div>
                                        <button style={{padding: '10px', border: '1px solid #d70018'}}
                                                type="button" className="comic-button">
                                            Chat ngay
                                        </button>

                                        <button onClick={() => {
                                            shopProfile(product?.shop?.id)
                                        }}
                                                style={{
                                                    padding: '10px',
                                                    border: '1px solid #d70018',
                                                    marginLeft: '10px'
                                                }}
                                                className="comic-button">Xem Shop
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default ProductSinglePage