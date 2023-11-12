import React, {useEffect, useState} from "react";
import {
    findAllCity,
    findAllDistrictByIdCity,
    findAllWardsByIdDistrict
} from "../../components/Shop/address/service/AddressService";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./fireBase";
import {v4} from "uuid";
import {Field, Form, Formik} from "formik";
import {LoadingButton} from "./LoadingButton";
import {findShop, saveShop} from "./service/ProfileService";
import {useNavigate} from "react-router-dom";

export default function Demo() {
    const [idCtity, setIdCity] = useState(0)
    const [idDistrict, setIdDistrict] = useState(0)
    const [idWards, setIdWards] = useState(0)
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [address, setAddress] = useState("")
    const [coords, setCoords] = useState({});
    const [fullAddress, setFullAddress] = useState("");
    const [nameCity, setNameCity] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWards, setNameWards] = useState("");
    const [shop, setShop] = useState({})
    const [check, setCheck] = useState(true)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        })
        findAllCity().then((result) => {
            setCities(result);
        })
        const idAcc = localStorage.getItem("account")
        findShop(idAcc).then((res) => {
           if (res ===''){
               setShop({})
           } else {
               setShop(res)
           }
        })
    }, [check])


    const find = async () => {
        setFullAddress(address + ", " + nameWards + ", " + nameDistrict + ", " + nameCity)
        const result = await geocodeByAddress(fullAddress)
        const latLng = await getLatLng(result[0])
        setCoords(latLng)
    }

    function displayDistrictByIdCity(id) {
        findAllDistrictByIdCity(id).then((result) => {
            setDistricts(result);
        })
    }

    function displayWardsByIdDistrict(id) {
        findAllWardsByIdDistrict(id).then((result) => {
            setWards(result)
        })
    }


    const handleSave = () => {
        // Lưu thông tin đã chỉnh sửa tại đây
        find().then()
        // Đóng modal sau khi lưu thông tin

    };
    const handledImage = (file) => {
        if (file === null) return;
        const imageRef = ref(storage, `image/${file.name + v4()}`)
        setLoading(true);
        uploadBytes(imageRef, file).then(snapshot => {
            getDownloadURL(snapshot.ref).then(url => {
                setAvatar(url)
                console.log(url)
                setLoading(false);
            })
        })
    }

    function save(e) {

        const idAcc = localStorage.getItem("account")
        e = {
            ...e,
            id: shop.id,
            avatar: avatar,
            account: {
                id: idAcc
            },
            wards: {
                id: idWards,
                district: {
                    id: idDistrict,
                    city: {
                        id: idCtity
                    }
                }
            }
        }
        console.log(e)
        saveShop(e, navigate).then(()=>{
            alert("Lưu thành công!")
            setCheck(true)
        })
    }

    return (
        <>
            <div className={'container'} style={{width: '85%', height: "500px"}}>
                <button className={'btn btn-warning'} onClick={() => {
                setCheck(!check)}}>Update</button>&ensp;
                <div className={'row'} style={{height: "200px"}}>

                    <div className={'col-md-4'} style={{ marginBottom: '40px'}}>
                        {shop.avatar == null ?
                            <img style={{width: '200px', height: '200px', marginLeft: '40px',
                                borderRadius: '50%'}}
                                 src={'https://facebookninja.vn/wp-content/uploads/2023/06/anh-dai-dien-mac-dinh-zalo.jpg'}
                                 alt="Avatar"/>
                            :
                            <img style={{width: '200px', height: '200px', marginLeft: '40px',
                                borderRadius: '50%'}}
                                src={shop.avatar}
                                alt="Avatar"/>}
                    </div>
                    <div className={'col-md-2'}></div>
                    <div className={'col-md-6'}>
                        <div>Đây là map</div>
                    </div>
                </div>
                <div className={'row'} style={{height: "250px"}}>
                    <Formik initialValues={shop}
                    enableReinitialize={true}
                            onSubmit={e => {
                                save(e)
                            }}>
                        <Form>
                            <div className={'row'} style={{height: "250px"}}>
                                <div className={'col-md-6'} style={{width: '40%'}}>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'name'} className="form-label">Tên shop: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'} name={'name'} className={'form-control'} id="{'name'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'avatar'} className="form-label">Ảnh đại diện</label>
                                        <Field style={{fontSize: '16px'}} type={'file'} name={'avatar1'} className={'form-control'} id="{'avatar'}"
                                               onChange={(e) => handledImage(e.target.files[0])}/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'phone'} className="form-label">Số điện thoại: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'} name={'phone'} className={'form-control'} id="{'phone'}"/>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <br/>
                                        <LoadingButton loading={loading}/>
                                        {/*<button className={'btn btn-primary'}>Save</button>*/}

                                    </div>
                                </div>
                                <div className={'col-md-6'} style={{width: '40%', marginLeft: '100px'}}>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'city'} className="form-label">Thành phố</label>
                                        <select style={{fontSize: '16px'}} disabled={check}  name={'address.wards.district.city.id'} onChange={(e) => {
                                            const textCity = e.target.value;
                                            setNameCity(textCity.split("-")[1])
                                            displayDistrictByIdCity(textCity.split("-")[0])
                                            setIdCity(textCity.split("-")[0])
                                        }} className={"form-select"}>
                                            <option >--Chọn thành phố--</option>
                                            {cities.map((c) => {
                                                return (
                                                    <option value={c.id + "-" + c.name}>{c.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'district'} className="form-label">Quận/huyện</label>
                                        <select style={{fontSize: '16px'}} disabled={check} name={'address.wards.district.id'} onChange={(e) => {
                                            const textDistrict = e.target.value;
                                            setNameDistrict(textDistrict.split("-")[1])
                                            displayWardsByIdDistrict(textDistrict.split("-")[0])
                                            setIdDistrict(textDistrict.split("-")[0])
                                        }} className={"form-select"}>
                                            <option>--Chọn Quận/Huyện--</option>
                                            {districts.map((d) => {
                                                return (
                                                    <option value={d.id + "-" + d.name}>{d.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'wards'} className="form-label">Phường/xã</label>
                                        <select style={{fontSize: '16px'}} disabled={check} name={'address.wards.id'} onChange={(e) => {
                                            const textWards = e.target.value;
                                            setNameWards(textWards.split("-")[1])
                                            setIdWards(textWards.split("-")[0])
                                        }} className={"form-select"}>
                                            <option>--Chọn xã/phường--</option>
                                            {wards.map((w) => {
                                                return (
                                                    <option value={w.id + "-" + w.name}>{w.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3" style={{fontSize: '16px'}}>
                                        <label htmlFor={'address'} className="form-label">Số nhà: </label>
                                        <Field style={{fontSize: '16px'}} disabled={check} type={'text'} name={'address'} className={'form-control'}
                                               id="{'address'}"
                                        />
                                    </div>

                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>

            </div>
        </>
    )
}