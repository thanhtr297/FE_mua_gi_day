import React, {useEffect, useState} from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";
import ReactPaginate from "react-paginate";

const ProductList = ({products}) => {
    return (
        <div className='product-lists grid bg-whitesmoke my-3'>
            {
                products.map(product => {
                    let discountedPrice = (product.price) - (product.price * (product.promotion / 100));

                    return (
                        <div>
                            <Product key={product.id} product={{...product, discountedPrice}}/>

                        </div>

                    )
                })
            }
        </div>
    )
}

export default ProductList