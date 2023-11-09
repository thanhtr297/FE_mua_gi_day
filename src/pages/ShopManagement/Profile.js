import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";

import "./Profile.scss";
import {findShop} from "./service/ProfileService";
import {CreateShop} from "./CreateShop";

export function Profile() {

    // const [showCreateModal, setShowCreateModal] = useState(false);
    const [shop,setShop] = useState({})
    const [check,setCheck] = useState(true)

    useEffect(() => {
        findShop().then((res)=>{
            setShop(res)
            console.log(res.data)
            if (res.data === undefined){
                setCheck(false)
            }
        })
    }, [check]);
const handleUpdate= () => {

}


    return (
        <>
            {/* Modal từ component CreateProduct */}
            {/*<UpdateProfile show={showCreateModal} handleClose={handleCloseCreateModal}/>*/}
            {check ?
            <div className="container2">
                <div style={{display: 'flex'}}>
                    <h1>Thông tin</h1>
                    <Button variant="warning" onClick={handleUpdate}>
                        Sửa thông tin
                    </Button>
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

            <CreateShop></CreateShop>
                </div>
            </>
            }
        </>
    )
}

export default Profile;