import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";

import "./Profile.scss";
import {findShop, saveShop} from "./service/ProfileService";
import {CreateShop} from "./CreateShop";
import {Link, useNavigate} from "react-router-dom";
export function Profile() {
    const navigate = useNavigate();
    const [shop,setShop] = useState({})
    const [check,setCheck] = useState(false)

    useEffect(() => {
        const idAcc = localStorage.getItem("account")
        findShop(idAcc).then((res)=>{
            setShop(res)
            if (res !== ''){
                setCheck(true)
            }
        })
    }, [check]);
const createNew= (values) => {
    saveShop(values, navigate).then(()=>{
        alert("Thêm thành công!")
    })
}
   const handleUpdate = (id) => {

   }

    return (
        <>
            {check ?
            <div className="container2">
                <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Thông tin</h1>
                    <Link to={'/shop-management/profile/update/'+shop?.id} style={{fontSize:'14px'}} variant="warning" >
                        Sửa thông tin
                    </Link>
                </div>
                <div className="profile-info">
                    <div className="profile-avatar">
                        <img
                            src= {shop.avatar}
                            alt="Avatar"/>
                    </div>
                    <div className="profile-details">
                        <div className="profile-name">Tên Shop: {shop.name}</div>
                        <div className="profile-phone">Số điện thoại: {shop.phone}</div>
                        <div className="profile-address">
                            Địa chỉ: {shop.address} ,
                            {shop.wards?.name},
                            {shop.wards?.district?.name} ,
                            {shop.wards?.district?.city?.name}
                        </div>
                    </div>
                </div>
            </div>
            :
            <>
                <h2>Bạn chưa đăng ký shop của mình, vui lòng đăng ký!</h2>
                <div style={{marginLeft:'30%'}}>

            <CreateShop parentCallback={createNew}></CreateShop>
                </div>
            </>
            }
        </>
    )
}

export default Profile;