import React, {useContext, useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {deleteById, save} from "./service/ProductService";
import {MdDeleteOutline} from "react-icons/md";
import {CiEdit} from "react-icons/ci";
import {MdCreateNewFolder} from "react-icons/md";
import ReactPaginate from "react-paginate";
import './styles.scss';
import {AppContext} from "../../Context/AppContext";


function ListProduct() {
    let [products, setProducts] = useState([]);
    let navigate = useNavigate()
    let [checkDelete, setCheckDelete] = useState(false)
    const [page, setPage] = useState(0);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const {toggleFlag , isFlag} = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('account');
            const response = await axios.get('http://localhost:8080/api/products/acc/' + id);
            const allProducts = response.data;

            const startIndex = page * perPage;
            const endIndex = startIndex + perPage;
            const paginatedProducts = allProducts.slice(startIndex, endIndex);

            setProducts(paginatedProducts);
            setTotalPages(Math.ceil(allProducts.length / perPage));
        };

        fetchData();
    }, [page, perPage, isFlag]);
    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected);
    };

    function update(id) {
        return navigate("/shop-management/" + id)
    }

    function deleteP(id) {
        if (window.confirm("Bạn có muốn xóa sản phẩm này không?")) {
            deleteById(id)
                .then(() => {
                        setCheckDelete(!checkDelete)
                        toggleFlag()
                        alert("Xóa thành công!")
                    }
                )
        }
    }

    return (
        <>
            <div style={{display: 'flex'}}>
                <Link to={'/shop-management/create'}>
                    <MdCreateNewFolder style={{color: 'black', fontSize: '30px'}}/>
                </Link>
                <h1 style={{marginLeft: '350px'}}>Danh sách sản phẩm</h1> <div style={{marginTop: '10px',marginLeft:'280px'}}>
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination-container'}
                    activeClassName={'active'}
                />
            </div>
            </div>
            <br/>
            <br/>
            <MDBTable style={{fontSize: '16px'}}>
                <MDBTableHead>
                    <tr style={{textAlign: 'center'}}>
                        <th style={{background: 'white', color: 'black'}}>STT</th>
                        <th style={{background: 'white', color: 'black'}}>Tên</th>
                        <th style={{background: 'white', color: 'black'}}>Ảnh</th>
                        <th style={{background: 'white', color: 'black'}}>Loại sản phẩm</th>
                        <th style={{background: 'white', color: 'black'}}>Thương hiệu</th>
                        <th style={{background: 'white', color: 'black'}}>Số lượng</th>
                        <th style={{background: 'white', color: 'black'}}>Giá</th>
                        <th style={{background: 'white', color: 'black'}}>Thao tác</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {products.map((p, index) => {
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
                                            <div className="carousel-indicators">
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
                                                    <div className={`carousel-item ${imageIndex === 0 ? 'active' : ''}`}
                                                         key={imageIndex}>
                                                        <img style={{width: "120px", height: "120px", margin: "0 0"}}
                                                             src={i.name} className="d-block w-100" alt="..."/>
                                                        <button className="carousel-control-prev" type="button"
                                                                data-bs-target={"#carouselExampleIndicators" + index}
                                                                data-bs-slide="prev">
                                                            <span className="carousel-control-prev-icon"
                                                                  aria-hidden="true"></span>
                                                            <span className="visually-hidden">Previous</span>
                                                        </button>
                                                        <button className="carousel-control-next" type="button"
                                                                data-bs-target={"#carouselExampleIndicators" + index}
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
                                        <div style={{display: 'flex', marginLeft: '10px', marginTop: '-10px'}}>
                                            <button onClick={() => {
                                                update(p.id)
                                            }} style={{fontSize: '26px'}}><CiEdit/>
                                            </button>

                                            <button onClick={() => {
                                                deleteP(p.id)
                                            }} style={{fontSize: '26px', marginLeft: '5px'}}><MdDeleteOutline/>
                                            </button>
                                        </div>
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
