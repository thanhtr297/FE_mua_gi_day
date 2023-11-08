import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";

export function Profile() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    return (
        <>
            <Button variant="warning" onClick={handleShowCreateModal}>
                Sửa thông tin
            </Button>

            {/* Modal từ component CreateProduct */}
            <UpdateProfile show={showCreateModal} handleClose={handleCloseCreateModal} />
        </>
    );
}

export default Profile;