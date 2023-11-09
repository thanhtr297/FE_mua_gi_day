import React, {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import CreateProduct from './CreateProduct'; // Giả sử CreateProduct và ListProduct cùng folder
import "bootstrap/dist/css/bootstrap.min.css";
import {MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import axios from "axios";

function ListProduct() {
    let [products, setProducts] = useState([]);
    let count;
    useEffect(() => {
        const id = localStorage.getItem('account')
        findAllById(id)
    },[])
    function findAllById(id) {
        axios.get("http://localhost:8080/api/products/acc/" + id).then(res => {
            setProducts(res.data)
        })
    }

    return (
        <>
            <CreateProduct/>
            <br/>
            <br/>
            <h1>Danh sách sản phẩm hiện có</h1>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>STT</th>
                        <th scope='col'>Tên</th>
                        <th scope='col'>Loại sản phẩm</th>
                        <th scope='col'>Thương hiệu</th>
                        <th scope='col'>Số lượng</th>
                        <th scope='col'>Giá</th>
                        <th scope='col'>Mô tả</th>
                        <th scope='col'>Thao tác</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {products.map((p, count = 1) => {
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
                                        <p>Edit</p>
                                        <p>Delete</p>
                                    </td>
                                </tr>

                            </>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>

        </>
    );
}

export default ListProduct;
