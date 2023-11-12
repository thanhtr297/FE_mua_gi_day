import React, {useEffect, useState} from 'react';
import './/Login.scss';
import {Formik, Form, ErrorMessage, Field} from 'formik';
import {emailCheck, register, sendMail, userCheck} from "../../service/UserService";
import {Link, useNavigate} from "react-router-dom";
export default function Register() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [otp, setOtp] = useState('');
    const [otpCheck, setOtpCheck] = useState('1');
    const [listMailCheck, setListEmailCheck] = useState([]);
    const [listUserCheck, setListUserCheck] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        userCheck().then(res => {
            setListUserCheck(res.data)
        })
        emailCheck().then(res => {
            setListEmailCheck(res.data)
        })
    }, []);

    const handleButtonClick = () => {
        const acc = JSON.parse(localStorage.getItem("acc"))
        if(acc !== null) {
            register({ username: acc.username,
                password: acc.password,
                email: acc.email,}).then((res) => {
            }).then((res) => {
                alert('Đăng kí thành công vui lòng đăng nhập lại')
                navigate('/login')
            })
        }else {
            alert('Vui lòng điền đủ thông tin') ;
        }
    };
        const onSubmit = (values) => {
            if (!isButtonDisabled) {
                setIsButtonDisabled(true);

                const timer = setInterval(() => {
                    setCountdown((prevCountdown) => {
                        if (prevCountdown === 1) {
                            clearInterval(timer);
                            setIsButtonDisabled(false);
                            return 30;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);
            }
            sendMail({
                name : createRandomFourDigitNumber() ,
                username : values.username ,
                email : values.email,
                password : values.password ,
            }).then((res) => { if(res.status === 200) {
                console.log(res)
                alert("Vui lòng kiểm tra hòm thư của bạn")
                setOtp(res.data.name + ''); // Thiết lập giá trị OTP ban đầu
                localStorage.setItem("acc", JSON.stringify(res.data))
                const timer = setInterval(() => {
                    localStorage.removeItem("acc")
                    setOtp(createRandomFourDigitNumber()); // Thiết lập giá trị OTP thành 0 sau 10 giây
                    clearInterval(timer); // Huỷ bỏ setInterval
                }, 60000);
            } else if (res.status === 202) {
                alert('Thao tác quá hạn vui lòng thử lại')
                navigate("/")
            }
            })
        };

        return (
            <div className={'login-container col-12 col-sm-4 '}>
                <div className={'title'}>Đăng Ký</div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        email: '',
                    }}
                    validationSchema={
                        require("yup").object().shape({
                            username: require("yup")
                                .string()
                                .matches(/^[a-zA-Z0-9_]+$/, "Tên tài khoản không hợp lệ")
                                .required("Vui lòng nhập user.") .test('unique', 'Tài khoản đã tồn tại', (value) => {
                                    return !listUserCheck.includes(value);
                                }),
                            password: require("yup")
                                .string()
                                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm số, chữ thường và chữ hoa")
                                .required("Vui lòng nhập password."),
                            email: require("yup")
                                .string()
                                .email("Email không hợp lệ.")
                                .required("Vui lòng nhập email.").test('unique', 'Email đã tồn tại', (value) => {
                                    return !listMailCheck.includes(value);
                                }),
                        })
                    }
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div>
                                <label className={'text'} htmlFor="username" style={{fontSize : '16px'}}>Tên đăng nhập</label>
                                <Field type="text" name="username" />
                                <ErrorMessage  className={'formik-error-message'} name="username" component="div"/>
                            </div>

                            <div>
                                <label className={'text'} htmlFor="password" style={{fontSize : '16px'}}>Mật khẩu</label>
                                    <Field type="password" name="password" />
                                <ErrorMessage className={'formik-error-message'} name="password" component="div"/>
                            </div>
                            <div>
                                <label className={'text'} htmlFor="email" style={{fontSize : '16px'}}>Email</label>
                                <div style={{display : 'flex'}}>
                                    <div>
                                        <Field type="text" name="email" style={{width : '410px'}}/>
                                        <ErrorMessage className={'formik-error-message'} name="email" component="div"/>
                                    </div>
                                    <div>
                                        <button  className={'button-send-email'} disabled={isButtonDisabled}  type={'submit'}>
                                               {isButtonDisabled ? `Gửi lại ( ${countdown} s)` : "Gửi mã"}
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <label className={'number'} htmlFor="otp" style={{fontSize : '16px'}}><b>Nhập mã xác nhận</b></label>
                                <div style={{display : 'flex' , }}>
                                <input style={{width : '100px'}} type="text" onChange={(event) => setOtpCheck(event.target.value)}/>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                <button type="button" onClick={handleButtonClick} style={{fontSize : '16px'}} className={(otp == otpCheck) ? "active" : "" }  disabled={!(otp == otpCheck)}>
                   <b>Đăng kí</b>
                </button>
                <div className={'back'}>


                </div>
            </div>
        );
    function createRandomFourDigitNumber() {
        const min = 100000; // Số nguyên dương nhỏ nhất có 4 chữ số
        const max = 999999; // Số nguyên dương lớn nhất có 4 chữ số
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
    }

