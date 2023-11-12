import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Field, Form, Formik} from "formik";
import {storage} from "./fireBase";
import {findAllCategory} from "./service/CategoryService";
import {findAllBrand} from "./service/BrandService";
import uploadImage from "./service/Upload";
import {LoadingButton} from "./LoadingButton";
import {useNavigate} from "react-router-dom";
import {save} from "./service/ProductService";


function CreateProduct(props) {
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState([]);
    let [categories, setCategories] = useState([])
    let [brands, setBrands] = useState([])
    const [show, setShow] = useState(false);
    let navigate = useNavigate();


    useEffect(() => {
            findAllCategory().then(res => {
                setCategories(res)
            })
            findAllBrand().then(res => {
                setBrands(res)
            })
        }, []
    )

    function create(e) {
        e.image = path
        save(e, navigate)
    }


    const upload = (files) => {
        uploadImage(storage, files, setPath, setLoading)
    }


    return (
        <>
            <div className={'container'} style={{width: '85%', height: "500px"}}>
                <h1 style={{textAlign: "center"}}>Thêm sản phẩm mới</h1>
                <Formik

                    initialValues={{
                        name: '',
                        price: '',
                        quantity: '',
                        description: '',
                        category: {
                            id: ""
                        },
                        brand: {
                            id: ""
                        },
                        account: {
                            id: localStorage.getItem('account')
                        },
                        shop: {
                            id: localStorage.getItem('account')
                        }

                    }}
                    onSubmit={(e) => {
                        create(e)
                    }}
                    enableReinitialize={true}
                >

                        <Form>
                            <div className={'row'} style={{height: "250px"}}>
                                <div className={'col-md-6'} style={{width: '40%'}}>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'name'} className="form-label">Tên</label>
                                        <Field style={{fontSize: '16px'}} type={'text'} name={'name'}
                                               className={'form-control'} id="{'name'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'price'} className="form-label">Giá</label>
                                        <Field style={{fontSize: '16px'}} type={'number'} name={'price'}
                                               className={'form-control'} id="{'price'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'quantity'} className="form-label">Số lượng</label>
                                        <Field style={{fontSize: '16px'}} type={'number'} name={'quantity'}
                                               className={'form-control'}
                                               id="{'quantity'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'description'} className="form-label">Mô tả</label>
                                        <Field style={{fontSize: '16px'}} type={'text'} name={'description'}
                                               className={'form-control'}
                                               id="{'description'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <br/>
                                        <LoadingButton loading={loading}/>
                                    </div>

                                </div>
                                <div className={'col-md-6'} style={{width: '40%', marginLeft: '100px'}}>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'image'} className="form-label">Image</label>
                                        <input style={{fontSize: '16px'}} type={'file'} multiple name={"image"}
                                               className={'form-control'}
                                               id="{'image'}"
                                               onChange={(e) => {
                                                   upload(e.target.files)
                                               }}/>
                                    </div>
                                    <div style={{fontSize: '16px'}}>
                                        <label htmlFor={'category'} className="form-label">Chọn loại mặt hàng</label>
                                        <Field as="select" name="category.id" class="form-control"
                                               style={{fontSize: '16px'}}>
                                            <option style={{fontSize: '13px'}}>--Chọn loại--</option>
                                            {categories.map((d) => {
                                                return (
                                                    <option value={d.id}>{d.name}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div style={{fontSize: '16px', marginTop: '9px'}}>
                                        <label htmlFor={'brand'} className="form-label">Chọn thương hiệu</label>
                                        <Field as="select" name="brand.id" class="form-control"
                                               style={{fontSize: '16px'}}>
                                            <option style={{fontSize: '13px'}}>--Chọn thương hiệu--</option>
                                            {brands.map((d) => {
                                                return (
                                                    <option value={d.id}>{d.name}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <br/>

                                </div>
                            </div>
                            <br/>


                        </Form>

                </Formik>
            </div>
        </>

    );
}

export default CreateProduct;
