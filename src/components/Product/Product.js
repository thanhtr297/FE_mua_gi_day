import React from 'react';
import { Link } from 'react-router-dom';
import {formatPrice} from "../../utils/helpers";
import "./Product.scss";

const Product = ({product}) => {
  return (
    <Link to = {`/product/${product?.id}`} key = {product?.id}>
      <div className='product-item bg-white'>
        <div className='category'>- {product?.promotion} %</div>
        <div className='product-item-img'>
          <img  className='img-cover' src = {product?.image[0]?.name} alt = {product.name}  style={{width : '200px',height : '200px' ,marginLeft: '16px', marginTop : '40px' }}/>
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
          <div className=''>
            <div>
            {/*   <span className='old-price'>*/}
            {/*  {formatPrice(product?.price)}*/}
            {/*</span>*/}
              <span className='discount fw-6' style={{fontSize : '20px', color :'red' }}>
              {formatPrice(product?.price/100 *(100 - product?.promotion))}
            </span>
            </div>
              <div style={{display : 'flex' , marginTop: '15px'}}>
                  <div>
                      <span>Đánh giá : 1</span>
                  </div>
                  <div style={{}}>
                    <span style={{marginLeft : '80px'}} >
                    Đã bán {product?.count}
                    </span>
                    </div>
              </div>


          </div>

        </div>
      </div>
    </Link>
  )
}

export default Product