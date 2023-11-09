import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {findAllCategory} from "./service/CategoryService";
import {findAllBrand} from "./service/BrandService";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./fireBase";
import {v4} from "uuid";

export default function UpdateProduct() {
    let navigate = useNavigate();
    let {id} = useParams()
    let [product, setProduct] = useState({})
    let [categories, setCategories] = useState([])
    let [brands, setBrands] = useState([])
    const [path, setPath] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        axios.get("http://localhost:8080/api/products/" + id).then((res) => {
            setProduct(res.data)
        })
    }, [id])
    useEffect(() => {
        findAllCategory().then(res => {
            setCategories(res)
        })},[]
    )
    useEffect(() => {
        findAllBrand().then(res => {
            setBrands(res)
        })},[]
    )


    const uploadImage = (files) => {
        if(!files || files.length === 0) return;
        const upload = Array.from(files).map((file) => {
            const imageRef = ref(storage,`image/${file.name +v4()}`);
            return uploadBytes(imageRef, file)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((url) => {
                    setPath((path) => [
                        ...path, {name: url}
                    ])
                })
        })
        Promise.all(upload).then()
    }
    function update(product) {
        axios.post("http://localhost:8080/api/products", product)
            .then(() => {
                alert("Thành công !")
                return navigate("/shop-management/list-product")
        })
    }
    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                Sửa
            </Button>
            <Modal show={show}
                   onHide={handleClose}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thay đổi thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={product}
                        onSubmit={(e) => {
                            update(e)
                        }}
                    enableReinitialize={true}>
                        <Form>
                            <div className="mb-3">
                                <label htmlFor={'name'} className="form-label">Tên</label>
                                <Field type={'text'} name={'name'} className={'form-control'} id="{'name'}"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'price'} className="form-label">Giá</label>
                                <Field type={'number'} name={'price'} className={'form-control'} id="{'price'}"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'quantity'} className="form-label">Số lượng</label>
                                <Field type={'number'} name={'quantity'} className={'form-control'}
                                       id="{'quantity'}"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'description'} className="form-label">Mô tả</label>
                                <Field type={'text'} name={'description'} className={'form-control'}
                                       id="{'description'}"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={'image'} className="form-label">Image</label>
                                <input type={'file'}  multiple name={"image"}  className={'form-control'} id="{'image'}"
                                       onChange={(e)=> {
                                           uploadImage(e.target.files)
                                       }}/>
                            </div>
                            <div>
                                <label htmlFor={'category'} className="form-label">Chọn loại mặt hàng</label>
                                <Field as="select" name="category.id" class="form-control">
                                    <option>--Chọn loại--</option>
                                    {categories.map((d) => {
                                        return (
                                            <option value={d.id}>{d.name}</option>
                                        )
                                    })}
                                </Field>
                            </div>
                            <div>
                                <label htmlFor={'brand'} className="form-label">Chọn thương hiệu</label>
                                <Field as="select" name="brand.id" class="form-control">
                                    <option>--Chọn thương hiệu--</option>
                                    {brands.map((d) => {
                                        return (
                                            <option value={d.id}>{d.name}</option>
                                        )
                                    })}
                                </Field>
                            </div>
                            <br/>
                            <div style={{textAlign: "center"}}>
                                <button className={'btn btn-primary'} type={'submit'} onClick={handleClose}>Sửa</button>
                            </div>

                        </Form>
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}