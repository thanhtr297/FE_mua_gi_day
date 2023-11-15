import React, {useEffect, useState} from "react";

import axios from "axios";
import {useParams} from "react-router-dom";
import {STATUS} from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Product from "../../components/Product/Product";


export default function ShopProfile() {
    let {id} = useParams()
    let [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const idC = localStorage.getItem('account')
        axios.get("http://localhost:8080/api/products/acc/" + idC).then((response) => {
            setProducts(response.data)
        }, [])


    }, [])
    useEffect(() => {
        axios.get("http://localhost:8080/api/shops/" + id).then((res) => {
            setShop(res.data)

        })
    }, [id])
    return (
        <>
            <div>
                <div className='product-single-r'>
                    <div className='product-single'>
                        <div className='containerr'>
                            <div className='product-single-content bg-white grid'>
                                <div style={{display: 'flex'}}>
                                    <img src={shop?.avatar} alt=""
                                         style={{height: '80px', width: '80px', borderRadius: '50px'}}/>
                                    <div style={{marginLeft: '20px'}}>
                                        <h3>
                                            {shop?.name}
                                        </h3>
                                        <div>
                                            <button style={{padding: '10px', border: '1px solid #d70018'}}
                                                    type="button" className="comic-button">
                                                Chat ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="containerr">
                    <div className='categories-item'>
                        <div className='title-md'>
                            <h3>Top sản phẩm bán chạy nhất </h3>
                        </div>
                    </div>
                    <br/>
                    <br/>


                    <br/>
                    <br/>
                    <div className='categories py-5'>
                        <div className='categories-item'>
                            <div>
                                <div className='title-md'>
                                    <h3>Tất cả sản phẩm của shop</h3>
                                </div>
                                <div className='product-lists grid bg-whitesmoke my-3'>
                                    {products.map((product) => {
                                            return (
                                                <Product key={product.id} product={{...product}}/>
                                            )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

// export default ShopProfile()