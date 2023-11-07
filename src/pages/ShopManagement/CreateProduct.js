import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateProduct({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Tạo Sản Phẩm Mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sản phẩm" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productPrice">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control type="number" placeholder="Nhập giá" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productQuantity">
                        <Form.Label>Số lượng</Form.Label>
                        <Form.Control type="number" placeholder="Nhập số lượng" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImages">
                        <Form.Label>Thêm ảnh</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productDetails">
                        <Form.Label>Chi tiết</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập chi tiết sản phẩm" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Lưu Sản Phẩm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateProduct;
