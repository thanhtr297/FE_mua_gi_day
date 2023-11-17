import React, {useEffect, useState} from "react";

import axios from "axios";
import {useParams} from "react-router-dom";
import {STATUS} from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Product from "../../components/Product/Product";
import {FaShoppingBag} from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdStarBorder } from "react-icons/md";
import { SlUserFollowing } from "react-icons/sl";
import { MdJoinInner } from "react-icons/md";







export default function ShopProfile() {
    let {id} = useParams()
    let [shop, setShop] = useState({});
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/api/products/shop/" + id).then((response) => {
            setProducts(response.data)
        })
    }, [id])
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
                                <div style={{display: 'flex',width:'650px'}}>
                                    <img src={shop?.avatar} alt=""
                                         style={{height: '80px', width: '80px', borderRadius: '50px'}}/>
                                    <div style={{marginLeft: '20px'}}>
                                        <h3>
                                            {shop?.name}
                                        </h3>
                                        <div>
                                            <button style={{padding: '10px', border: '1px solid white'}}
                                                    type="button" className="comic-button">
                                                Chat ngay
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{marginLeft:'80px',marginTop:'3px'}}>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <FaShoppingBag/>
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}> Sản phẩm</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>{products.length}</p>


                                        </div>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <SlUserFollow />
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}>Đang theo dõi:</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>8</p>
                                        </div>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <IoChatboxEllipsesOutline />
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}>Tỷ lệ phản hồi chat:</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>99% (Trong vài giờ)</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{marginLeft:'80px',marginTop:'3px'}}>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <MdStarBorder />
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}> Đánh giá</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>4.9 (10,1k đánh giá)</p>

                                        </div>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <SlUserFollowing />
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}>Người theo dõi:</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>32,4k</p>

                                        </div>
                                        <div style={{display: 'flex', fontSize: '16px'}}>
                                            <MdJoinInner />
                                            <p style={{marginTop: '-5px', marginLeft: '5px'}}>Tham gia:</p>
                                            <p style={{marginTop:'-5px',marginLeft:'5px',color:'orange'}}>1 ngày trước</p>
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