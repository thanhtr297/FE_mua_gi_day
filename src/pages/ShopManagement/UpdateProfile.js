import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
    findAllCity,
    findAllDistrictByIdCity,
    findAllWardsByIdDistrict
} from "../../components/Shop/address/service/AddressService";
import {geocodeByAddress, getLatLng} from "react-google-places-autocomplete";

function UpdateProfile({ show, handleClose }) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phone, setPhone] = useState('');
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [address, setAddress] = useState("")
    const [coords, setCoords] = useState({});
    const [fullAddress, setFullAddress] = useState("");
    const [nameCity, setNameCity] = useState("");
    const [nameDistrict, setNameDistrict] = useState("");
    const [nameWards, setNameWards] = useState("");




    const Icon = ({text}) => <div>{text}</div>;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        })
        findAllCity().then((result) => {
            setCities(result);
        })


    }, [])

    const find = async () => {
        setFullAddress(address+", "+nameWards +", "+nameDistrict+", "+nameCity)
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
        find().then(() => handleClose)
        // Đóng modal sau khi lưu thông tin

    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px' }}>Sửa thông tin cá nhân</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="profileName">
                        <Form.Label style={{ fontSize: '18px' }}>Tên shop</Form.Label>
                        <Form.Control style={{ fontSize: '16px' }} type="text" placeholder="Nhập tên shop" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profilePhone">
                        <Form.Label style={{ fontSize: '18px' }}>Số đện thoại</Form.Label>
                        <Form.Control style={{ fontSize: '16px' }} type="text" placeholder="Nhập số điện thoại" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImages">
                        <Form.Label style={{ fontSize: '18px' }}>Avatar</Form.Label>
                        <Form.Control style={{ fontSize: '16px' }} type="file" multiple />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ fontSize: '18px' }}>Địa chỉ</Form.Label>
                        <Form.Select style={{ fontSize: '16px' }}  placeholder="Nhập thành phố" onChange={(e) => {
                            const textCity = e.target.value;
                            setNameCity(textCity.split("-")[1])
                            displayDistrictByIdCity(textCity.split("-")[0])
                        }} className={"form-select"}>
                            <option>--Chọn thành phố--</option>
                            {cities.map((c) => {
                                return(
                                    <option value={c.id+"-"+c.name}>{c.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ fontSize: '18px' }}>Địa chỉ</Form.Label>
                        <Form.Select style={{ fontSize: '16px' }}  placeholder="Nhập Quận/huyện" onChange={(e) => {
                            const textDistrict = e.target.value;
                            setNameDistrict(textDistrict.split("-")[1])
                            displayWardsByIdDistrict(textDistrict.split("-")[0])}} className={"form-select"}>
                            <option>--Chọn Quận/Huyện--</option>
                            {districts.map((d) => {
                                return(
                                    <option value={d.id+"-"+d.name}>{d.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ fontSize: '18px' }}>Địa chỉ</Form.Label>
                        <Form.Select style={{ fontSize: '16px' }} placeholder="Nhập Quận/huyện" onChange={(e) => {
                            const textWards = e.target.value;
                            setNameWards(textWards.split("-")[1])
                        }}>
                            <option>--Chọn xã/phường--</option>
                            {wards.map((w) => {
                                return(
                                    <option value={w.id+"-"+w.name}>{w.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label style={{ fontSize: '18px' }}>Địa chỉ</Form.Label>
                        <Form.Control style={{ fontSize: '16px' }} type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => {
                            setAddress(e.target.value)
                        }}/>
                    </Form.Group>
                    {/*<label>Thành phố</label>*/}
                    {/*<select style={{color: 'black'}} id={"select-city"} onChange={(e) => {*/}
                    {/*    const textCity = e.target.value;*/}
                    {/*    setNameCity(textCity.split("-")[1])*/}
                    {/*    displayDistrictByIdCity(textCity.split("-")[0])*/}
                    {/*}} className={"form-select"}>*/}
                    {/*    <option >--Chọn thành phố--</option>*/}
                    {/*    {cities.map((c) => {*/}
                    {/*        return(*/}
                    {/*            <option value={c.id+"-"+c.name}>{c.name}</option>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</select>*/}
                    {/*<label>Quận/huyện</label>*/}
                    {/*<select style={{color: 'black'}} id={"select-district"} onChange={(e) => {*/}
                    {/*    const textDistrict = e.target.value;*/}
                    {/*    setNameDistrict(textDistrict.split("-")[1])*/}
                    {/*    displayWardsByIdDistrict(textDistrict.split("-")[0])}} className={"form-select"}>*/}
                    {/*    <option>--Chọn Quận/Huyện--</option>*/}
                    {/*    {districts.map((d) => {*/}
                    {/*        return(*/}
                    {/*            <option value={d.id+"-"+d.name}>{d.name}</option>*/}

                    {/*        )*/}
                    {/*    })}*/}
                    {/*</select>*/}
                    {/*<label>xã/phường</label>*/}
                    {/*<select style={{color: 'black'}} id={"select-district"} className={"form-select"} onChange={(e) => {*/}
                    {/*    const textWards = e.target.value;*/}
                    {/*    setNameWards(textWards.split("-")[1])*/}
                    {/*}}>*/}
                    {/*    <option>--Chọn xã/phường--</option>*/}
                    {/*    {wards.map((w) => {*/}
                    {/*        return(*/}
                    {/*            <option value={w.id+"-"+w.name}>{w.name}</option>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</select>*/}
                    {/*<input type={"text"} value={address} onChange={(e) => {*/}
                    {/*    setAddress(e.target.value)*/}
                    {/*}}/>*/}
                    {/*<div>{fullAddress}</div>*/}
                    {/*<button onClick={find}>Search</button>*/}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ fontSize: '16px' }}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave} style={{ fontSize: '16px' }}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateProfile;
