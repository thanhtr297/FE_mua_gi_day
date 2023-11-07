import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateProduct from './CreateProduct'; // Giả sử CreateProduct và ListProduct cùng folder

function ListProduct() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    return (
        <>
            <Button variant="primary" onClick={handleShowCreateModal}>
                Tạo Sản Phẩm Mới
            </Button>

            {/* Modal từ component CreateProduct */}
            <CreateProduct show={showCreateModal} handleClose={handleCloseCreateModal} />
        </>
    );
}

export default ListProduct;
