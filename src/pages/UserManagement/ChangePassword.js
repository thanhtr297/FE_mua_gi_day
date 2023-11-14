import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {findUser} from "../../service/UserService";

export default function ChangePassword() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const id = localStorage.getItem("account")
    const [user, setUser] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    const [passwordError,setPasswordError] = useState("")
    const [passwordConfirm,setPasswordConfirm] = useState("")

    useEffect(() => {
        findUser(id).then((res) => {
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
                <div className={'text'}>Mật khẩu mới</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordNew === true ? 'text' : 'password'}
                                                         placeholder={'8-15 ký tự có ít nhất 1 ký tự in hoa'}
                    // value={password}
                                                         onChange={handlePasswordChange}/>
                    <i className={isShowPasswordNew === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordNew(!isShowPasswordNew)}

                    ></i>
                    {/*{passwordError && <div className="error-message">{passwordError.password}</div>}*/}
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.password}</div>}</div>
                <div className={'text'}>Nhập lại mật khẩu</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordConfirm === true ? 'text' : 'password'}
                           placeholder={'Xác nhận lại mật khẩu'}
                        // value={password}
                           onChange={handlePasswordConfirmChange}/>
                    <i className={isShowPasswordConfirm === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.cfpass}</div>}</div>
                <div style={{textAlign:"center"}}>
                    <button className={password ? "active":""}
                            disabled={!password}

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