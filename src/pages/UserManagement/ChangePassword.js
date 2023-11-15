import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findUserByAccount, savePass, sendmail} from "../../service/UserService";

export default function ChangePassword() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [otpCheck, setOtpCheck] = useState('1');
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const [passwordError,setPasswordError] = useState("")

    useEffect(() => {
        const id = localStorage.getItem("account")
        findUserByAccount(id).then((res) => {
            setUser(res.data)
        })
    }, []);
    // Hàm để validate mật khẩu
    function validatePassword(pass) {
        const errors = {};
        if (!pass) {
            errors.password = 'Bắt buộc phải nhập mật khẩu mới';
        } else if (pass.length < 8) {
            errors.password = 'Mật khẩu mới phải có ít nhất 8 ký tự';
        } else if (!/\d/.test(pass) || !/[a-zA-Z]/.test(pass)) {
            errors.password = 'Mật khẩu mới phải bao gồm cả chữ và số';
        }
        return errors;
    }


    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPasswordNew(newPassword);
        const errors = validatePassword(newPassword);
        setPasswordError(errors)
    }
    const handlePasswordConfirmChange = (event) => {
        const passwordconfirm = event.target.value;
        const errors = {}
        if (passwordconfirm!==passwordNew){
            errors.cfpass = ("Xác thực mật khẩu không đúng, vui lòng nhập lại!")
        }
        setPasswordError(errors)
    }

    const onSubmit = () => {
        if (!isButtonDisabled) {
            setIsButtonDisabled(true);

            const timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer);
                        setIsButtonDisabled(false);
                        return 3;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        sendmail({
            name : createRandomFourDigitNumber() ,
            username : user.id ,
            email : user.email,
            password :  password,
        }).then((res) => {
            if(res.status === 200) {
            console.log(res)
            alert(`Mã xác thực đã được gửi đến email ${user.email}`)
                setPasswordError('')
            setOtp(res.data.name + ''); // Thiết lập giá trị OTP ban đầu
            localStorage.setItem("acc", JSON.stringify(res.data))
            const timer = setInterval(() => {
                localStorage.removeItem("acc")
                setOtp(createRandomFourDigitNumber()); // Thiết lập giá trị OTP thành 0 sau 10 giây
                clearInterval(timer); // Huỷ bỏ setInterval
            }, 40000);
        } else if (res.status === 202) {
            alert('Thao tác quá hạn vui lòng thử lại')
            navigate("//user-management/change-password")
        }
        }).catch(()=>{
            const errors = {}
            errors.check = "Mật khẩu cũ không đúng"
            setPasswordError(errors)
        })
    };

    const savePassword=()=>{
            const userNew = user;
            userNew.password = passwordNew
            savePass(userNew).then(()=>{
                alert("Cập nhật mật khẩu thành công!")
                navigate("/")
            })
    }
    return (
        <>
            <div className={'login-container col-12 col-sm-4 '} style={{fontSize:'14px'}}>
                <div className={'title'}>Đổi mật khẩu</div>
                <div className={'text'}>Mật khẩu cũ</div>
                <div className={'input-password'}>
                    <input type={isShowPassword === true ? 'text' : 'password'}
                           placeholder={'Nhập mật khẩu cũ'}
                           // value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPassword(!isShowPassword)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.check}</div>}</div>

                <div className={'text'}>Mật khẩu mới</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordNew === true ? 'text' : 'password'}
                                                         placeholder={'8-15 ký tự có ít nhất 1 ký tự in hoa'}
                                                         onChange={handlePasswordChange}/>
                    <i className={isShowPasswordNew === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordNew(!isShowPasswordNew)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.password}</div>}</div>
                <div className={'text'}>Nhập lại mật khẩu</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordConfirm === true ? 'text' : 'password'}
                           placeholder={'Xác nhận lại mật khẩu'}
                           onChange={handlePasswordConfirmChange}/>
                    <i className={isShowPasswordConfirm === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.cfpass}</div>}</div>

                <div style={{display:'flex'}}>
                    <div>
                        <label className={'number'} htmlFor="otp" style={{fontSize : '16px'}}><b>Nhập mã xác nhận</b></label>
                        <div style={{display : 'flex',width:'100px' }}>
                            <input style={{width : '100px'}} type="text" onChange={(event) => setOtpCheck(event.target.value)}/>
                        </div>
                    </div>
                    <button  className={'button-send-email'} disabled={isButtonDisabled}  type={'button'} onClick={onSubmit}>
                        {isButtonDisabled ? `Gửi lại ( ${countdown} s)` : "Gửi mã"}
                    </button>
                </div>
                <div style={{textAlign:"center"}}>
                    <button className={password && (otp == otpCheck) ? "active":""}
                            disabled={!(password && (otp == otpCheck))}
                    onClick={savePassword}
                    >Đổi mật khẩu
                    </button>
                </div>

            </div>
        </>
    )
    function createRandomFourDigitNumber() {
        const min = 100000; // Số nguyên dương nhỏ nhất có 4 chữ số
        const max = 999999; // Số nguyên dương lớn nhất có 4 chữ số
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}