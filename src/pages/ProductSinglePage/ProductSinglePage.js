import React, {useEffect, useState} from 'react';
import "./ProductSinglePage.scss";
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import Loader from "../../components/Loader/Loader";
import {formatPrice} from "../../utils/helpers";
import { getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import CartMessage from "../../components/CartMessage/CartMessage";
import {getProductById} from "../../service/ProductService";
import {addToCart} from "../../service/CartService";

const ProductSinglePage = () => {
  const {id} = useParams();
  const [product , setProduct] = useState({});
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  const idAccount = localStorage.getItem("account") ;

  // getting single product
  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res.data);
    })

  }, [cartMessageStatus]);

  let discountedPrice = (product?.price) - (product?.price * (product?.promotion / 100));
  if(productSingleStatus === STATUS.LOADING) {
    return <Loader />
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if(tempQty > product?.quantity) {
        tempQty = product?.quantity;
      }
      return tempQty;
    })
  }

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if(tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    })
  }

  // const addToCartHandler = (product) => {
  //   let discountedPrice = (product?.price) - (product?.price * (product?.promotion / 100));
  //   let totalPrice = quantity * discountedPrice;
  //
  //   dispatch(addToCart({...product, quantity: quantity, totalPrice, discountedPrice}));
  //   dispatch(setCartMessageOn(true));
  // }

  const addToCartHandler = (product) => {
      const cart =  {
        product : {
          id : product.id
        },
        quantity : quantity
    }
    addToCart(cart, idAccount).then()

  }
  return (
    <main className='py-5 bg-whitesmoke'>
      <div className='product-single'>
        <div className='containerr'>
          <div className='product-single-content bg-white grid'>
            <div className='product-single-l'>
              <div className='product-img'>
                <div className='product-img-zoom'>
                  <img src = {product?.image === undefined ? '' : product?.image[0]?.name } alt = "" className='img-cover' />
                </div>
                <div className='product-img-thumbs flex align-center my-2'>
                  {product?.image?.map(p=>{
                    return (
                        <div className='thumb-item'>
                          <img src = {p?.name} alt = "" className='img-cover' />
                        </div>
                    )
                  })}
                  {/*<div className='thumb-item'>*/}
                  {/*  <img src = {*/}
                  {/*    product ? (product.images ? product.images[1] : "") : ""*/}
                  {/*  } alt = "" className='img-cover' />*/}
                  {/*</div>*/}
                  {/*<div className='thumb-item'>*/}
                  {/*  <img src = {*/}
                  {/*    product ? (product.images ? product.images[2] : "") : ""*/}
                  {/*  } alt = "" className='img-cover' />*/}
                  {/*</div>*/}
                  {/*<div className='thumb-item'>*/}
                  {/*  <img src = {*/}
                  {/*    product ? (product.images ? product.images[3] : "") : ""*/}
                  {/*  } alt = "" className='img-cover' />*/}
                  {/*</div>*/}
                  {/*<div className='thumb-item'>*/}
                  {/*  <img src = {*/}
                  {/*    product ? (product.images ? product.images[4] : "") : ""*/}
                  {/*  } alt = "" className='img-cover' />*/}
                  {/*</div>*/}
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
                    <span className='text-orange fw-5' style={{marginRight : '20px'}}>Đánh giá </span>
                  </div>
                  <div className='vert-line'></div>
                  {/*<div className='brand'>*/}
                    <span className='text-orange fw-5' style={{marginRight : '20px'}}>||</span>
                  {/*  <span className='mx-1'>{product?.brand?.name}</span>*/}
                  {/*</div>*/}
                  <div className='vert-line'></div>
                  <div className='brand'>

                    <span className='mx-1 text-capitalize'>
                      {product?.count}
                    </span><span className='text-orange fw-5'>Đã bán</span>
                  </div>
                  <div>
                    <p className='para fw-3 fs-15' style={{whiteSpace: 'pre-line'}} >{product?.description}</p>
                  </div>
                </div>

                <div className = "price">
                  {/*<div className='flex align-center'>*/}
                  {/*  <div className='old-price text-gray'>*/}
                  {/*    {formatPrice(product?.price)}*/}
                  {/*  </div>*/}
                  {/*  <span className='fs-14 mx-2 text-dark'>*/}

                  {/*  </span>*/}
                  {/*</div>*/}

                  <div className='flex align-center my-1'>
                    <div className='old-price text-gray' style={{marginRight : '20px'}}>
                      {formatPrice(product?.price)}
                    </div>
                    <div className='new-price fw-5 font-poppins fs-24 text-orange' style={{marginRight : '20px'}}>
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className='discount bg-orange fs-13 text-white fw-6 font-poppins' >
                      {product?.promotion}% GIẢM
                    </div>
                  </div>
                </div>

                <div className='qty flex align-center my-4' >
                  <div className='qty-text'>Số lượng:</div>
                  <div className='qty-change flex align-center mx-3'>
                    <button type = "button" className='qty-decrease flex align-center justify-center' onClick={() => decreaseQty()}>
                      <i className='fas fa-minus'></i>
                    </button>
                    <div className = "qty-value flex align-center justify-center">{quantity}</div>
                    <button type = "button" className='qty-increase flex align-center justify-center' onClick={() => increaseQty()}>
                      <i className='fas fa-plus'></i>
                    </button>
                    <div className='qty-text' style={{marginLeft : '20px'}}>{product.quantity} sản phẩm có sẵn</div>
                  </div>
                  {
                    (product?.quantity === 0) ? <div className ='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5'>out of stock</div> : ""
                  }
                </div>

                <div className='btns'>
                  <button type = "button" className='add-to-cart-btn btn' disabled={(idAccount === product?.account?.id)}>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2' onClick={() => { addToCartHandler(product)}}>Thêm vào giỏ hàng</span>
                  </button>
                  <button type = "button" className='buy-now btn mx-3' disabled={(idAccount === product?.account?.id)}>
                    <span className='btn-text'>Mua ngay</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartMessageStatus && <CartMessage />}
    </main>
  )
}

export default ProductSinglePage