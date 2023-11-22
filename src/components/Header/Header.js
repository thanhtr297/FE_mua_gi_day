import React, {useContext, useEffect, useState} from 'react';
import "./Header.scss";
import {Link, useNavigate} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import {AppContext} from "../../Context/AppContext";
import {findAccountById} from "../../service/UserService";
import {findUserByAccount} from "../../pages/UserManagement/Service/UserService";
import {toast} from "react-toastify";
import {notificationShop, notificationUser} from "../../service/NotificationService";

const Header = (props) => {
    const navigate = useNavigate();
    const {checkLogin} = useContext(AppContext);
    const {logout} = useContext(AppContext);
    const {isFlag} = useContext(AppContext);
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [notiShop, setNotiShop] = useState([]);
    const [notiUser, setNotiUser] = useState([]);
    let acc = localStorage.getItem('account');
    useEffect(() => {
        if (acc !== null) {
            findAccountById(acc).then((res) => {
                setUsername(res.data.username);
            }).catch(() => {
                navigate('/login')
            })
            findUserByAccount(acc).then((res) => {
                setAvatar(res.avatar)
            }).catch(() => {
                navigate('/login')
            })
            notificationShop(acc).then((res) => {
                setNotiShop(res.data)
            }).catch(() => {
            })
            notificationUser(acc).then((res) => {
                setNotiUser(res.data)
            }).catch(() => {
            })
        }
    }, [isFlag, checkLogin]);
    const listNoti = [...notiShop, ...notiUser];

    listNoti.sort((a, b) => b.id - a.id);
    ;

    return (
        <header className='header1 text-white'>
            <div className='containerr'>
                <div className='header1-cnt'>
                    <div className='header1-cnt-top fs-13 py-2 flex align-center justify-between'>
                        <div className='header1-cnt-top-l'>
                            <ul className='flex top-links align-center' style={{marginTop: '3%', marginBottom: '-1%'}}>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/seller" style={{}}>Kênh người bán</Link>
                                </li>
                                <li style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    margin: '-5px 7px 0 7px'
                                }}> |
                                </li>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/download">Tải xuống</Link>
                                </li>
                                <li style={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    margin: '-5px 7px 0 7px'
                                }}> |
                                </li>

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
                                    <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                       style={{marginLeft: '-130%', marginBottom: '-53%', display: "flex"}}>
                                        <div style={{
                                            fontSize: '15px', color: 'white',
                                            fontFamily: 'Font Awesome 6 Free', marginRight: '2%'
                                        }}>Thông báo
                                        </div>

                                        <div style={{marginRight: '2%'}}><i className="fa-regular fa-bell"
                                                                            style={{color: '#e7ebf4'}}></i></div>
                                        <div style={{marginTop: '-1%'}}><span style={{
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '0px 7px 100px 7px'
                                        }}>|</span></div>

                                    </a>
                                    {listNoti.length > 0 ?

                                        <div className="dropdown-menu m-0 noti ">
                                            {listNoti.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    {item.title === 'Thông báo shop' ? (
                                                        <>
                                                            <Link to={'/user-management'} className="dropdown-item"  style={item.status === null ? {backgroundColor : "#f5f5f8" ,height : '100px'} : {backgroundColor : "white" ,height : '100px'}}>
                                                                 <div style={{fontWeight :'bold' ,paddingTop : '1%'}}>Shop của bạn {item.id}</div>
                                                                {item.content === 'Đơn hàng đã được đặt' ? (
                                                                <div  className="dropdown" style={{display :'flex' ,paddingTop : '1%'}}>
                                                                    <div>
                                                                        {item?.avatar !== null ?
                                                                        <img src={item?.avatar} style={{width : '40px' ,height : '40px' ,borderRadius : '50%'}} alt=""/>
                                                                        : <i className="fa-regular fa-bell"
                                                                             style={{color: '#e7ebf4'}}/>
                                                                        }
                                                                    </div>
                                                                    <div style={{ marginLeft : '3%', width: '250px', color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                        <span style={{ display: 'block', width: '100%', whiteSpace: 'normal' }}>
                                                                            {item?.account?.username} đã mua hàng, vui lòng xác nhận đơn
                                                                        </span>
                                                                    </div>


                                                                </div>
                                                            ) : item.content === 'Đơn hàng bị hủy' ? (
                                                                    <div  className="dropdown" style={{display :'flex' ,paddingTop : '1%'}}>
                                                                        <div>
                                                                            {item?.avatar !== null ?
                                                                                <img src={item?.avatar} style={{width : '40px' ,height : '40px' ,borderRadius : '50%'}} alt=""/>
                                                                                : <i className="fa-regular fa-bell"
                                                                                     style={{color: '#e7ebf4'}}/>
                                                                            }
                                                                        </div>
                                                                        <div style={{ marginLeft : '3%', width: '250px', color: 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                        <span style={{ display: 'block', width: '100%', whiteSpace: 'normal' }}>
                                                                            {item?.account?.username} đã hủy đơn
                                                                        </span>
                                                                        </div>
                                                                    </div>
                                                            ) : item.content === 'Đơn hàng đã được giao' ? (
                                                                <Link to={'/user-management'}>
                                                                    <div><img src={item?.avatar} style={{width : '20px' ,height : '20px'}} alt=""/></div>
                                                                    <div>{item?.account?.username} đã mua hàng, vui lòng xác nhận đơn</div>

                                                                </Link>
                                                            ) : (
                                                                <Link to={'/user-management'}>
                                                                    <div><img src={item?.avatar} style={{width : '20px' ,height : '20px'}} alt=""/></div>
                                                                    <div>{item?.account?.username} đã mua hàng, vui lòng xác nhận đơn</div>
                                                                    <Dropdown.Divider/>
                                                                </Link>
                                                            )}

                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <div className="dropdown-item">Thông báo </div>
                                                    )}
                                                </React.Fragment>
                                            ))}


                                        </div> :
                                        <div className="dropdown-menu m-0">
                                            <Link to={'/login'} className="dropdown-item" onClick={() => {
                                                logout()
                                            }}>Đăng nhập</Link>
                                        </div>
                                    }
                                    <div style={{
                                        display: 'flex',
                                        marginTop: '-15px',
                                        marginBottom: '-20px',
                                        marginRight: '-25px'
                                    }}>
                                        {username !== null ? <div style={{
                                            marginTop: '20px',
                                            fontSize: '15px',
                                            fontFamily: 'Font Awesome 6 Free'
                                        }}>{username}</div> : ''}

                                        <div className="nav-item dropdown" style={{
                                            borderBottom: 'none',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            marginLeft: '5px'
                                        }}>
                                            <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                                {avatar === null ?
                                                    <i className="fa-regular fa-user" style={{
                                                        color: '#bcc5d7',
                                                        fontSize: '19px',
                                                        marginLeft: '7px',
                                                        marginTop: '5px'
                                                    }}></i>
                                                    : <img src={avatar} alt="" style={{
                                                        borderRadius: '50%',
                                                        width: '30px',
                                                        height: '30px'
                                                    }}/>
                                                }
                                            </a>
                                            {acc !== null ?
                                                <div className="dropdown-menu m-0">
                                                    <Link to={'/user-management'} className="dropdown-item">Hồ
                                                        sơ</Link>
                                                    <Link to={'/shop-management'} className="dropdown-item">Shop của
                                                        tôi</Link>
                                                    <Dropdown.Divider/>
                                                    <Link to="/login" className="dropdown-item" onClick={() => {
                                                        logout()
                                                        toast.success("bạn đã đăng xuất ", {autoClose: 700});
                                                        localStorage.clear()
                                                    }}>Đăng xuất</Link>
                                                </div> :
                                                <div className="dropdown-menu m-0">
                                                    <Link to={'/login'} className="dropdown-item" onClick={() => {
                                                        logout()
                                                    }}>Đăng nhập</Link>
                                                    <Link to={'/register'} className="dropdown-item" onClick={() => {
                                                        logout()
                                                    }}>Đăng ký</Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </li>
                                <li style={{marginBottom: '-14%'}}>
                                    <Link to="/register">
                                        <span style={!checkLogin ? {display: 'none'} : {
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '-5px 7px 0 7px'
                                        }}></span>
                                        <span className='top-link-itm-txt'
                                              style={!checkLogin ? {display: 'none'} : {}}>Đăng ký</span>
                                    </Link>
                                </li>
                                <li style={{marginBottom: '-14%'}}>
                                    <Link to="/login">
                                        <span style={!checkLogin ? {display: 'none'} : {
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            margin: '-5px 7px 0 7px'
                                        }}>|</span>
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