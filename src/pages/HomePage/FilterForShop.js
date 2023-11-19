import React, {useEffect, useState} from "react";
import {findAllCategory} from "../ShopManagement/service/CategoryService";
import {Field, Form, Formik} from "formik";
import axios from "axios";
import {STATUS} from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";
import Slider from "@mui/material/Slider";
import {formatPrice} from "../../utils/helpers";
import {findAllBrand} from "../ShopManagement/service/BrandService";
import {useParams} from "react-router-dom";


export default function FilterForShop() {
    let {id} = useParams()
    let [categories, setCategories] = useState([])
    let [brands, setBrands] = useState([])
    let [products, setProducts] = useState(null);
    const [range, setRange] = React.useState([0, 50000000]);


    useEffect(() => {
            findAllCategory().then(res => {
                setCategories(res)
            })
        }, []
    )
    useEffect(() => {
            findAllBrand().then(res => {
                setBrands(res)
            })
        }, []
    )

    function handleChanges(event, newValue) {
        setRange(newValue);
    }

    function filterForShop(filter) {
        axios.post("http://localhost:8080/api/filters/for/shop", filter).then(res => {
            setProducts(res.data)
            console.log(res.data)
        })
    }

    return (
        <>
            <Formik
                initialValues={{
                    maxPrice: range[1],
                    minPrice: range[0],
                    category: {
                        id: ""
                    },
                    brand: {
                        id: ""
                    },
                    shop: {
                        id: id
                    }
                }}
                onSubmit={(e) => {
                    filterForShop(e)
                }}
                enableReinitialize={true}>
                <Form>
                    <div style={{
                        display: 'flex',
                        width: '85%',
                        marginLeft: '55px',
                        marginTop: '-35px',
                        marginBottom: '13px'
                    }}>
                        <div style={{width: "20%", fontSize: "16px", marginLeft: '200px', marginTop: '20px'}}>
                            Từ {formatPrice(range[0])} đến {formatPrice(range[1])}
                            <Slider style={{color: "rgb(215, 0, 24)", fontSize: "5px", marginTop: '10px'}} value={range}
                                    onChange={handleChanges} valueLabelDisplay="auto"
                                    min={0}
                                    max={50000000}
                                    step={100000}/>


                        </div>
                        <div style={{fontSize: '16px', width: "20%"}}>
                            <div className={'col-md-6'} style={{marginLeft: '60px', marginTop: "18px"}}>
                                <label htmlFor={'category'} className="form-label">Mặt hàng</label>
                                <Field as="select" name="category.id" class="form-control"
                                       style={{fontSize: '16px', width: '220px'}}>
                                    <option value={null} style={{fontSize: '13px', textAlign: 'center'}}>-- Chọn loại --
                                    </option>
                                    {categories.map((d) => {
                                        return (
                                            <option value={d.id}>{d.name}</option>
                                        )
                                    })}
                                </Field>
                            </div>
                        </div>

                        <div style={{fontSize: '16px', width: "20%"}}>
                            <div className={'col-md-6'} style={{marginLeft: '80px', marginTop: "18px"}}>
                                <label htmlFor={'brand'} className="form-label">Thương hiệu</label>
                                <Field as="select" name="brand.id" class="form-control"
                                       style={{fontSize: '16px', width: '220px'}}>
                                    <option value={null} style={{fontSize: '13px', textAlign: 'center'}}>-- Thương
                                        hiệu --
                                    </option>
                                    {brands.map((b) => {
                                        return (
                                            <option value={b.id}>{b.name}</option>
                                        )
                                    })}
                                </Field>
                            </div>
                        </div>

                        <button className={"mb-3"}
                                style={{
                                    fontSize: '16px',
                                    marginTop: '50px',
                                    background: 'rgb(215, 0, 24)',
                                    marginLeft: '100px',
                                    width: '10%',
                                    height: '35px',
                                    color: 'white'
                                }}>
                            Tìm kiếm
                        </button>
                    </div>
                </Form>
            </Formik>
            <div className="containerr">
                <div className='categories py-5'>
                    <div className='categories-item'>

                            {products === STATUS.LOADING ? <Loader/> : (products === null ? ""
                                : (products.length === 0 ?
                                    <div className='categories-item'>
                                        <div className='title-md'>
                                            <h3>KẾT QUẢ TÌM KIẾM </h3>
                                        </div>
                                        <img style={{height: '150px', width: '150px', marginLeft: '550px'}}
                                             src="https://static.vecteezy.com/system/resources/thumbnails/006/208/684/small/search-no-result-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                                             alt=""/>
                                        <br/>
                                        <h3 style={{textAlign: 'center'}}>Không có sản phẩm phù hợp tiêu chí tìm
                                            kiếm</h3>
                                        <br/>

                                    </div>
                                    :
                                    <div className='categories-item'>
                                        <div className='title-md'>
                                            <h3>KẾT QUẢ TÌM KIẾM </h3>
                                        </div>
                                        <ProductList products={products}/>
                                    </div>))}
                        </div>

                </div>
            </div>
        </>


    )
}