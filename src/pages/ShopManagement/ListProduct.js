import React, {useEffect, useState} from 'react';
import CreateProduct from './CreateProduct';
import "bootstrap/dist/css/bootstrap.min.css";
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {save} from "./service/ProductService";

function ListProduct() {
    let [products, setProducts] = useState([]);
    let count;
    let navigate = useNavigate()
    let [checkDelete, setCheckDelete] = useState(false)

    useEffect(() => {
        const id = localStorage.getItem('account')
        findAllById(id)

    }, [checkDelete])

    function findAllById(id) {
        axios.get("http://localhost:8080/api/products/acc/" + id).then(res => {
            setProducts(res.data)
            console.log(res.data)
        })
    }

    function update(id) {
        return navigate("/shop-management/" + id)
    }

    function deleteP(id) {
        if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
            axios.delete("http://localhost:8080/api/products/" + id)
                .then(() => {
                        setCheckDelete(!checkDelete)
                        alert("Xóa thành công!")
                    }
                )
        }
    }

    function createNew(obj) {
        save(obj, navigate).then(() => {
            setCheckDelete(!checkDelete)
        })
    }

    return (
        <>
            <CreateProduct parentCallback={createNew}/>
            <br/>
            <br/>
            <h1>Danh sách sản phẩm hiện có</h1>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>STT</th>
                        <th scope='col'>Tên</th>
                        <th scope='col'>Ảnh</th>
                        <th scope='col'>Loại sản phẩm</th>
                        <th scope='col'>Thương hiệu</th>
                        <th scope='col'>Số lượng</th>
                        <th scope='col'>Giá</th>
                        <th scope='col'>Mô tả</th>
                        <th scope='col'>Thao tác</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {products.map((p,index) => {
                        if (p.status == null) {
                        return (
                            <>
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{++count}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{p.name}</p>
                                    </td>
                                    <td>
                                        <div id={"carouselExampleIndicators" + count} className="carousel slide"
                                             style={{width: "130px"}}>
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
                                                {p.image.map((i) => (
                                                    <div className="carousel-item active">
                                                        <img style={{width:"120px", height: "120px", margin: "0 0"}} src={i.name} className="d-block w-100" alt="..."/>
                                                        <button className="carousel-control-prev" type="button"
                                                                data-bs-target={"#carouselExampleIndicators"+ count}
                                                                data-bs-slide="prev">
                                                            <span className="carousel-control-prev-icon"
                                                                  aria-hidden="true"></span>
                                                            <span className="visually-hidden">Previous</span>
                                                        </button>
                                                        <button className="carousel-control-next" type="button"
                                                                data-bs-target={"#carouselExampleIndicators"+ count}
                                                                data-bs-slide="next">
                                                            <span className="carousel-control-next-icon"
                                                                  aria-hidden="true"></span>
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
                                        <p className='fw-normal mb-1'>{p.description}</p>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            update(p.id)
                                        }}>Sửa
                                        </button>
                                        <br/>
                                        <button onClick={() => {
                                            deleteP(p.id)
                                        }}>Xóa
                                        </button>
                                    </td>
                                </tr>

                            </>
                    )

                        }
                    })}
                    </MDBTableBody>
                    </MDBTable>

                    </>
                    )
                        ;
                    }

                        export default ListProduct;
