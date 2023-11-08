import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";
import "./Profile.scss";

export function Profile() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    return (
        <>
            {/* Modal từ component CreateProduct */}
            <UpdateProfile show={showCreateModal} handleClose={handleCloseCreateModal}/>

            <div className="container2">
                <div style={{display: 'flex'}}>
                    <h1>Thông tin</h1>
                    <Button variant="warning" onClick={handleShowCreateModal}>
                        Sửa thông tin
                    </Button>
                </div>
                <div className="profile-info">
                    <div className="profile-avatar">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZoE5vp-UIJzCrfbD7pztJhbXAHxqL_u2PcA&usqp=CAU"
                            alt="Avatar"/>
                    </div>
                    <div className="profile-details">
                        <div className="profile-name">Tên Shop</div>
                        <div className="profile-phone">Số điện thoại: 123-456-7890</div>
                        <div className="profile-address">Địa chỉ: Thành phố Hà Nội, Quận Ba Đình, Phường Trúc Bạch</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;