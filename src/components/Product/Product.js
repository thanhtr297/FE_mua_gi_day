import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {
  console.log(product)
  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>- {product?.promotion} %</div>
        <div className='product-item-img'>
          <img className='img-cover' src = {product?.image[0]?.name} alt = {product.name} />
        </div>
        <div className='product-item-info fs-14'>
          {/*<div className='brand'>*/}
          {/*  <span></span>*/}
          {/*  <span className='fw-7'>{product?.brand?.name}</span>*/}
          {/*</div>*/}
          <div className='title py-2' style={{
            overflow: 'hidden',
            maxHeight: '3.8em'}}>
            {product?.name}
          </div>
          <div className='price flex align-center justify-center'>
            <span className='old-price'>
              {formatPrice(product?.price)}
            </span>
            <span className='discount fw-6' style={{fontSize : '20px' , marginLeft : '15px'}}>
              {formatPrice(product?.price/100 *(100 - product?.promotion))}
            </span>
            <span style={{marginLeft : '15px'}} >
                Đã bán {product?.count}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product