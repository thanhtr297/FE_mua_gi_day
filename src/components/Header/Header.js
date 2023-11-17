import React, {useContext, useEffect, useState} from 'react';
import "./Header.scss";
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import {AppContext} from "../../Context/AppContext";
import {findAccountById} from "../../service/UserService";
import {findUserByAccount} from "../../pages/UserManagement/Service/UserService";


const Header = (props) => {
    const navigate = useNavigate();
    const {checkLogin } = useContext(AppContext);
    const {logout } = useContext(AppContext);
    const{isFlag}  = useContext(AppContext) ;
    const [username , setUsername] = useState(null) ;
    const [avatar , setAvatar] = useState(null) ;
    let acc = localStorage.getItem('account');
    useEffect(() => {
        if (acc !== null) {
        findAccountById(acc).then((res) => {
            setUsername(res.data.username) ;
        }).catch( () =>{
            navigate('/')
        })
        findUserByAccount(acc).then((res) => {
            setAvatar(res.avatar)
        }).catch( () =>{
            navigate('/')
        }) }
    }, [isFlag ,checkLogin]);
    return (
        <header className='header1 text-white'>
            <div className='containerr'>
                <div className='header1-cnt'>
                    <div className='header1-cnt-top fs-13 py-2 flex align-center justify-between'>
                        <div className='header1-cnt-top-l'>
                            <ul className='flex top-links align-center'>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/seller" style={{}}>Kênh người bán</Link>
                                </li>
                                <li className='vert1-line'></li>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/download">Tải xuống</Link>
                                </li>
                                <li className='vert1-line'></li>
                                <li className='flex align-center'>
                                    <span className='fs-13'>Kết nối</span>
                                    <ul className='social-links flex align-center'>
                                        <li className='mx-2'>
                                            <a href="www.facebook.com" className='fs-15'>
                                                <i className='fab fa-facebook'></i>
                                            </a>
                                        </li>
                                        <li className='mx-2'>
                                            <a href="www.instagram.com" className='fs-15'>
                                                <i className='fab fa-instagram'></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className='header1-cnt-top-r'>
                            <ul className='top-links flex align-center'>
                                <li style={checkLogin
                                    ? {display: 'none'} : {}}>
                                    <div style={{display : 'flex' , marginTop : '-15px' , marginBottom : '-20px' ,marginRight : '-25px'}}>
                                        {username !== null ?  <div style={{marginTop : '20px' ,fontSize : '15px' }}>{username}</div> : ''}

                                    <div className="nav-item dropdown" style={{borderBottom : 'none' ,backgroundColor :'white' ,borderRadius : '50%' ,width :'30px' ,height :'30px' , marginLeft :'5px'}}>
                                        <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                            {avatar === null ?
                                                <i className="fa-regular fa-user" style={{color: '#bcc5d7' ,fontSize : '19px', marginLeft : '7px' ,marginTop :'5px'}}></i>
                                                : <img src={avatar} alt="" style={{borderRadius : '50%' ,width :'30px' ,height :'30px'}}  />
                                            }
                                        </a>
                                        {acc !== null ?
                                        <div className="dropdown-menu m-0">
                                            <Link to={'/user-management'} className="dropdown-item">Hồ sơ</Link>
                                            <Link to={'/shop-management'} className="dropdown-item">Shop của tôi</Link>
                                            <Dropdown.Divider/>
                                            <Link to="/" className="dropdown-item" onClick={() => {
                                                logout()
                                                alert("Bạn đã đăng xuất!");
                                                localStorage.clear()
                                            }} >Đăng xuất</Link>
                                        </div> :
                                            <div className="dropdown-menu m-0">
                                                <Link to={'/login'} className="dropdown-item" onClick={() => {
                                                    logout()
                                                }}>Đăng nhập</Link>
                                            </div>
                                        }
                                    </div>
                                    </div>
                                </li>
                                <li className='vert1-line' style={!checkLogin ? {display: 'none'} : {}}></li>
                                <li>
                                    <Link to="/register">
                                        <span className='top-link-itm-txt'
                                              style={!checkLogin ? {display: 'none'} : {}}>Đăng ký</span>
                                    </Link>
                                </li>
                                <li className='vert1-line' style={!checkLogin ? {display: 'none'} : {}}></li>
                                <li>
                                    <Link to="/login">
                                        <span className='top-link-itm-txt' onClick={props.a}
                                              style={!checkLogin ? {display: 'none'} : {}}>Đăng nhập</span>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className='header1-cnt-bottom'>
                        <Navbar/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header