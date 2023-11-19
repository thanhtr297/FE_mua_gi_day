import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {cancelBillByReason} from "../../service/BillService";

function Cancel({ id, onCancelClick }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reason, setReason] = useState('');

    const handleReason = (event) => {
        setReason(event.target.value);
    };

    return (
        <>
            <button style={{marginLeft: "7px", marginTop: "2px"}} type="button" className='delete-btn text-dark' onClick={handleShow}>
                Hủy đơn
            </button>

            <Modal  style={{scale: "1.2", marginTop: "200px"}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lý do hủy đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label></Form.Label>
                            <Form.Control as="textarea" rows={5} style={{ height: "100px" , fontSize:"15px"}} value={reason} onChange={handleReason} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button type={"submit"} variant="primary" onClick={() => {
                        handleClose();
                        cancelBillByReason(id, reason).then()
                    }}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



export default Cancel;

