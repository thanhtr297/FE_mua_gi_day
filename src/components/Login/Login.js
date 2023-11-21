import './/Login.scss';
import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {loginApi} from "../../service/UserService";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../Context/AppContext";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const {login } = useContext(AppContext);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!email || !password) {
            toast.error("tài khoản mật khẩu không hợp lệ" ,{autoClose : 800});
            return;
        }
        loginApi({
            username: email,
            password: password,

        }).then((res) => {
                if (res.status === 200) {
                    login()
                    toast.success('Đăng nhập thành công' ,{ autoClose: 800 });
                    if (res.data.authorities[0].authority === 'ROLE_ADMIN') {
                        navigate('/admin')
                    } else {
                        localStorage.setItem("account", JSON.stringify(res.data.id));
                        navigate('/')
                    }
                }
            }
        ).catch(() =>
            toast.error('Thông tin không chính xác')
        )
    }

    return (
        <>
            <div className={'login-container col-12 col-sm-4 '}>
                <div className={'title'}>Đăng nhập</div>
                <div className={'text'}>Tên đăng nhập</div>
                <input type={'text'}
                       placeholder={'Tên đăng nhập'}
                       value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <div className={'text'}>Mật khẩu</div>

                <div className={'input-password'}>
                    <input type={isShowPassword === true ? 'text' : 'password'}
                           placeholder={'Mật khẩu'}
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPassword(!isShowPassword)}

                    ></i>
                </div>
                <div >
                    <button
                        style={{ border: '2px solid #aba5a5' }}
                        className={email && password ? 'active' : ''}
                        disabled={!(email && password)}
                        onClick={() => handleLogin()}>
                        Đăng nhập
                    </button>

                </div>

                <div className={'back'}>
                    <Link  className={'link'}  to={"/forgotPass"}>Quên mật khẩu</Link>

                    <Link className={'link'} style={{marginLeft:'5%'}}  to={"/"}>Trở về</Link>
                </div>
            </div>
        </>
    )
}
