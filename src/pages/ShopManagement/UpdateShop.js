import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "./fireBase";
import {v4} from "uuid";
import {LoadingButton} from "./LoadingButton";
import {saveShop} from "./service/ProfileService";
import {useNavigate} from "react-router-dom";
import {
    findAllCity,
    findAllDistrictByIdCity,
    findAllWardsByIdDistrict
} from "../../components/Shop/address/service/AddressService";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";

export function CreateShop() {
    const [idCtity,setIdCity] = useState(0)
    const [idDistrict,setIdDistrict] = useState(0)
    const [idWards,setIdWards] = useState(0)
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
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        })
        findAllCity().then((result) => {
            setCities(result);
        })


    }, [])
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
                setLoading(false);
            })
        })
    }

    function create(values) {

        const data = {
            ...values,
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
        saveShop(data, navigate).then(()=>{
            console.log(data)
            console.log(idWards,idDistrict,idCtity)
            alert("done")
        })
    }

    return (
        <>
            <div className={'container3'} style={{width: "500px"}}>
                {/*<h3>Tạo ngay</h3>*/}
                <Formik initialValues={{
                    id: '',
                    name: '',
                    phone: '',
                    avatar: '',
                    address: '',
                }} onSubmit={e => {
                    create(e)
                }}>
                    <Form>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'name'} className="form-label">Tên shop: </label>
                            <Field type={'text'} name={'name'} className={'form-control'} id="{'name'}"/>
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'avatar'} className="form-label">Ảnh đại diện</label>
                            <Field type={'file'} name={'avatar'} className={'form-control'} id="{'avatar'}"
                                   onChange={(e) => handledImage(e.target.files[0])}/>
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'phone'} className="form-label">Số điện thoại: </label>
                            <Field type={'text'} name={'phone'} className={'form-control'} id="{'phone'}"/>
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'city'} className="form-label">Thành phố</label>
                            <select name={'address.wards.district.city.id'}  onChange={(e) => {
                                const textCity = e.target.value;
                                setNameCity(textCity.split("-")[1])
                                displayDistrictByIdCity(textCity.split("-")[0])
                                setIdCity(textCity.split("-")[0])
                            }} className={"form-select"}>
                                <option>--Chọn thành phố--</option>
                                {cities.map((c) => {
                                    return (
                                        <option value={c.id + "-" + c.name}>{c.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <label htmlFor={'district'} className="form-label">Quận/huyện</label>
                            <select name={'address.wards.district.id'} onChange={(e) => {
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
                            <select name={'address.wards.id'} onChange={(e) => {
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
                            <Field type={'text'} name={'address'} className={'form-control'} id="{'address'}"
                            />
                        </div>
                        <div className="mb-3" style={{fontSize: '16px'}}>
                            <LoadingButton loading={loading}/>
                            {/*<button className={'btn btn-primary'}>Save</button>*/}
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}