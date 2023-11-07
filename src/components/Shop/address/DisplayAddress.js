import React, {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import {IoLocationSharp} from "react-icons/io5";
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import {findAllCity, findAllDistrictByIdCity, findAllWardsByIdDistrict} from "./service/AddressService";


export default function DisplayAddress() {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [address, setAddress] = useState("")
    const [coords, setCoords] = useState({});

    const Icon = ({text}) => <div>{text}</div>;

    const find = async () => {
        const result = await geocodeByAddress(address)
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



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoords({lat: latitude, lng: longitude})
        })
        findAllCity().then((result) => {
            setCities(result);
        })
    }, [])
    return (
        <>
            <div className={"container"}>
                <label>Thành phố</label>
                    <select id={"select-city"} onChange={(e) => {
                        const idCity = e.target.value;
                        displayDistrictByIdCity(idCity)
                    }} className={"form-select"}>
                        <option>--Chọn thành phố--</option>
                        {cities.map((c) => {
                            return(
                                <option value={c.id}>{c.name}</option>
                            )
                        })}
                    </select>
                <label>Quận/huyện</label>
                <select id={"select-district"} onChange={(e) => {
                    const idDistrict = e.target.value;
                    displayWardsByIdDistrict(idDistrict)}} className={"form-select"}>
                    <option>--Chọn Quận/Huyện--</option>
                    {districts.map((d) => {
                        return(
                            <option value={d.id}>{d.name}</option>
                        )
                    })}
                </select>
                <label>xã/phường</label>
                <select id={"select-district"} className={"form-select"}>
                    <option>--Chọn xã/phường--</option>
                    {wards.map((w) => {
                        return(
                            <option value={w.id}>{w.name}</option>
                        )
                    })}
                </select>
                <input type={"text"} value={address} onChange={(e) => {
                    setAddress(e.target.value)
                }}/>

                <button onClick={find}>Search</button>

                <div style={{width: "500px", height: "300px"}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyDMiGZOTOALGy9BSxtBskshowrlS-eyYFs"}}
                        defaultCenter={coords}
                        defaultZoom={15}
                        center={coords}
                    >
                        <Icon
                            lat={coords.lat}
                            lng={coords.lng}
                            text={<IoLocationSharp color={"red"} size={24}/>}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        </>
    )
}


