import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function UpdateProfile({ show, handleClose }) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    const handleSave = () => {
        // Lưu thông tin đã chỉnh sửa tại đây
        console.log('Tên:', name);
        console.log('Avatar:', avatar);
        console.log('Số điện thoại:', phone);
        console.log('Thành phố:', city);
        console.log('Quận:', district);
        console.log('Xã:', ward);

        // Đóng modal sau khi lưu thông tin
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="profileName">
                        <Form.Label style={{ fontSize: '18px' }}>Tên shop</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên shop" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profilePhone">
                        <Form.Label style={{ fontSize: '18px' }}>Số đện thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productQuantity">
                        <Form.Label style={{ fontSize: '18px' }}>Địa chỉ</Form.Label>
                        <Form.Control type="number" placeholder="Nhập thành phố" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImages">
                        <Form.Label style={{ fontSize: '18px' }}>Avatar</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
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
