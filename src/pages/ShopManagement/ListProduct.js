import React, {useEffect, useState} from 'react';
import CreateProduct from './CreateProduct';
import "bootstrap/dist/css/bootstrap.min.css";
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {deleteById, save} from "./service/ProductService";

function ListProduct() {
    let [products, setProducts] = useState([]);
    let navigate = useNavigate()
    let [checkDelete, setCheckDelete] = useState(false)

    useEffect(() => {
        const id = localStorage.getItem('account')
        findAllById(id)

    }, [checkDelete])

    function findAllById(id) {
        axios.get("http://localhost:8080/api/products/acc/" + id).then(res => {
            setProducts(res.data)
        })
    }

    function update(id) {
        return navigate("/shop-management/" + id)
    }

    function deleteP(id) {
        if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
            deleteById(id)
                .then(() => {
                        setCheckDelete(!checkDelete)
                        alert("Xóa thành công!")
                    }
                )
        }
    }


    return (
        <>
            <Link to={'/shop-management/create'} className={'btn btn-primary'} style={{fontSize: '12px'}}>Thêm sản phẩm mới</Link>
            <br/>
            <br/>
            <h1  style={{textAlign: "center"}}>Danh sách sản phẩm</h1>
            <br/>
            <br/>
            <MDBTable style={{fontSize: '16px'}}>
                <MDBTableHead >
                    <tr style={{textAlign:'center'}}>
                        <th style={{background:'white',color:'black'}}>STT</th>
                        <th style={{background:'white',color:'black'}}>Tên</th>
                        <th style={{background:'white',color:'black'}}>Ảnh</th>
                        <th style={{background:'white',color:'black'}}>Loại sản phẩm</th>
                        <th style={{background:'white',color:'black'}}>Thương hiệu</th>
                        <th style={{background:'white',color:'black'}}>Số lượng</th>
                        <th style={{background:'white',color:'black'}}>Giá</th>
                        <th style={{background:'white',color:'black'}}>Thao tác</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {products.map((p,index) => {
                        return (
                            <>
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{++index}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.name}</p>
                                    </td>
                                    <td>
                                        <div id={"carouselExampleIndicators" + index} className="carousel slide"
                                             style={{width: "130px", marginLeft: '35px'}}>
                                            <div className="carousel-indicators" >
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="0" className="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            </div>
                                            <div className="carousel-inner">
                                                {p.image.map((i, imageIndex) => (
                                                    <div className={`carousel-item ${imageIndex === 0 ? 'active' : ''}`} key={imageIndex}>
                                                        <img style={{width:"120px", height: "120px", margin: "0 0"}} src={i.name} className="d-block w-100" alt="..."/>
                                                        <button className="carousel-control-prev" type="button"
                                                                data-bs-target={"#carouselExampleIndicators"+ index}
                                                                data-bs-slide="prev">
                                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                            <span className="visually-hidden">Previous</span>
                                                        </button>
                                                        <button className="carousel-control-next" type="button"
                                                                data-bs-target={"#carouselExampleIndicators"+ index}
                                                                data-bs-slide="next">
                                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                            <span className="visually-hidden">Next</span>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.category.name}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.brand.name}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.quantity}</p>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.price}</p>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            update(p.id)
                                        }} className={'btn btn-warning'} style={{fontSize: '12px'}}>Sửa
                                        </button>
                                        <br/>
                                        <br/>
                                        <button onClick={() => {
                                            deleteP(p.id)
                                        }} className={'btn btn-danger'} style={{fontSize: '12px'}}>Xóa
                                        </button>
                                    </td>
                                </tr>

                            </>
                    )


                    })}
                    </MDBTableBody>
                    </MDBTable>

                    </>
                    )
                        ;
                    }

                        export default ListProduct;
