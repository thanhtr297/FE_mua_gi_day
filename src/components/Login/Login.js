import './/Login.scss';
import {useState} from "react";
import {toast} from "react-toastify";
import {loginApi} from "../../service/UserService";
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const handleLogin = () => {
        if (!email || !password) {
            toast.error("tài khoản mật khẩu không hợp lệ");
            return;
        }
        loginApi({
            username: email,
            password: password,

        }).then((res) => {
                if (res.status === 200) {
                    alert("đăng nhập thành công")
                    console.log(res)
                }
            }
        ).catch(() =>
            alert("thông tin đăng nhập không chính xác")
        )
    }

    return (
        <>
            <div className={'login-container col-12 col-sm-4 '}>
                <div className={'title'}>Đăng nhập</div>
                <div className={'text'}>Tên đăng nhập</div>
                <input type={'text'}
                       placeholder={'Email or username'}
                       value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <div className={'text'}>Mật khẩu</div>

                <div className={'input-password'}>
                    <input type={isShowPassword === true ? 'text' : 'password'}
                           placeholder={'Password'}
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPassword(!isShowPassword)}

                    ></i>
                </div>
                <button className={email && password ? "active" : ""}
                        disabled={!(email && password)}
                        onClick={() => handleLogin()}
                >Đăng nhập
                </button>
                <div className={'back'}>


                </div>
            </div>
        </>
    )
}
