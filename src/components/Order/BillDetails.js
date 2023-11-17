import React, {useContext, useEffect, useState} from "react";
import {formatPrice} from "../../utils/helpers";
import {Field, Form, Formik} from "formik";
import {acceptOrder, rejectionOrder} from "../../service/OrderService";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../Context/AppContext";

const BillDetails = (props) => {
    const [total, setTotal] = useState(0);
    const {toggleFlag } = useContext(AppContext);
    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < props.bill?.length; i++) {
            sum += total + props.bill[i]?.quantity * props.bill[i]?.price
        }
        setTotal(sum)
    }, []);

    const onSubmit = (values) => {
        rejectionOrder(props.bill, values.reason).then((res) => {
            alert("Hủy thành công !")

            toggleFlag()

        })
    };
    const acp = () => {
        acceptOrder(props.bill).then((res) => {
            alert("Xác nhận thành công")
            toggleFlag()

        })
    }
    return (
        <>
            <div style={{display: 'flex', fontSize: '15px', marginTop: '5px', marginLeft: '15px'}}>
                <div>
                    {props.bill?.map((item) => (
                        <div style={{display: 'flex', marginBottom: '15px'}}>
                            <table>
                                <tbody>
                                <tr>
                                    <td style={{width: '85px', textAlign: 'left'}}><img
                                        style={{width: "65px", height: "65px"}}
                                        src={item?.product?.image[0]?.name} className="d-block w-100"
                                        alt="..."/></td>
                                    <td style={{width: '330px', textAlign: 'left'}}>
                                        <p className='fw-normal mb-1' style={{
                                            overflow: 'hidden',
                                            maxHeight: '3em'
                                        }}>{item?.product?.name}</p>
                                    </td>
                                    <td style={{marginLeft: '25px'}}><p className='fw-normal mb-1'>x{item?.quantity}</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
                <div style={{marginTop: '20.3px', marginLeft: '20px'}}>
                    <p style={{marginTop: '6.5px'}}>{formatPrice(total)}</p>
                </div>
                <div>
                    <div style={{marginTop: '26px', marginLeft: '90px'}}>
                        {(props.bill[0]?.bill?.status === "Đơn hủy" || props.bill[0]?.bill?.status === "Đơn bị hủy") ?
                            <div><p style={{fontWeight: 'bold'}}> {props.bill[0]?.bill?.status}</p>
                                <p>Lý do :{props.bill[0]?.bill?.reason}</p>
                            </div> :
                            <div>
                                <p style={{fontWeight: 'bold'}}> {props.bill[0]?.bill?.status}</p>
                            </div>

                        }


                    </div>
                </div>
                <div style={{marginTop: '26px', marginLeft: '70px'}}>
                    {(props.bill[0]?.bill?.status === "Chờ xác nhận") ?
                        <div>
                            <button onClick={acp} style={{fontWeight: 'bold' , color : 'green'}}>Chấp nhận <i className="fa-solid fa-check" style={{color: '#17b563'}}></i></button>
                            <div>
                                <Formik
                                    initialValues={{}}
                                    onSubmit={onSubmit}
                                >
                                    <Form>
                                        <div>
                                            <button type="submit" >Hủy</button>
                                            <Field type="text" id="firstName" name="reason" style={
                                                {marginLeft: '10px', marginTop: '10px', width: '200px', height: '50px',}
                                            } placeholder="Lý do " title={"Vui lòng nhập đầy đủ thông tin"} required/>
                                        </div>

                                    </Form>
                                </Formik>
                            </div>
                        </div> :
                        <div style={{marginLeft: '28px'}}><p> {props.bill[0]?.bill?.status}</p></div>

                    }
                </div>

            </div>
        </>
    )
}


export default BillDetails;