import React, {useEffect, useState} from "react";
import {emailCheck, findAccountByEmail, sendMailForgetPass} from "../../service/UserService";

export function ForgotPass() {
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState("")
    const [listEmail, setListEmail] = useState([]);
    const [check,setCheck] = useState(false);
    const [account, setAccount] = useState({})
    useEffect(() => {
        emailCheck().then((res)=>{
            setListEmail(res.data)
        })
    }, [check,emailError]);
    function validateEmail(e) {
        let flag = false
        const emailCheck = e.target.value
        const errors = {};
        for (let i = 0; i < listEmail.length; i++) {
            if (listEmail[i] === emailCheck.toString().toLowerCase()){
                setCheck(true)
                flag = true
                errors.email = ''
                setEmailError(errors)
                setEmail(emailCheck)
                return
            } else {
                setCheck(false)
            }
        }
        if (!flag) {
            errors.email = 'Email chưa đăng ký tài khoản!'
            setEmailError(errors)
        }

    }
    function submitEmail() {
        let account = {
            name: 'http://localhost:3000/password-new',
            username: '',
            password: '',
            email: email
        }
        sendMailForgetPass(account)
        alert("Vui lòng kiểm tra hộp thư trong email của bạn!")
    }

    return(
        <>
            <div className={'login-container col-12 col-sm-4 '} style={{fontSize:'14px'}}>
                <div className={'title'}>Quên mật khẩu</div>
                <div className={'text'}>Nhập email</div>
                <div className={'input-password'}>
                    <input placeholder={'Nhập email của bạn'}
                    type={"email"}   onChange={validateEmail}/>

                </div>
                <div style={{color:"red"}}> {emailError && <div className="error-message">{emailError.email}</div>}</div>
                <div style={{marginLeft:'25%'}}>
                    <button className={check ? "active":""}
                            disabled={!check}
                            onClick={submitEmail}
                    >Xác thực
                    </button>
                </div>
            </div>
        </>
    )
}