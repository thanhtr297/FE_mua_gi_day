import React from 'react';
import "./Header.scss";
import {Link} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';


const Header = (props) => {
    const acc = localStorage.getItem('account');
    return (
        <header className='header1 text-white'>
            <div className='containerr'>
                <div className='header1-cnt'>
                    <div className='header1-cnt-top fs-13 py-2 flex align-center justify-between'>
                        <div className='header1-cnt-top-l'>
                            <ul className='flex top-links align-center'>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/seller">Seller Center</Link>
                                </li>
                                <li className='vert1-line'></li>
                                <li>
                                    {/* dummy links */}
                                    <Link to="/download">Download</Link>
                                </li>
                                <li className='vert1-line'></li>
                                <li className='flex align-center'>
                                    <span className='fs-13'>Follow us on</span>
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
                                <li style={!acc ? {display: 'none'} : {}}>
                                    <div className="nav-item dropdown">
                                        <a href="#" className=" nav-link dropdown-toggle"
                                           data-bs-toggle="dropdown"><small
                                            className="fa fa-user text-body"></small></a>
                                        <div className="dropdown-menu m-0">
                                            <Link to={'/user-management'} className="dropdown-item">Hồ sơ</Link>
                                            <Link to={'/shop-management'} className="dropdown-item">Shop của tôi</Link>
                                            <Dropdown.Divider/>
                                            <a href="/" className="dropdown-item" onClick={() => {
                                                alert("Bạn đã đăng xuất!");
                                                localStorage.clear()
                                            }} >Đăng xuất</a>
                                        </div>
                                    </div>
                                </li>
                                <li className='vert1-line' style={acc ? {display: 'none'} : {}}></li>
                                <li>
                                    <Link to="/register">
                                        <span className='top-link-itm-txt'
                                              style={acc ? {display: 'none'} : {}}>Đăng ký</span>
                                    </Link>
                                </li>
                                <li className='vert1-line' style={acc ? {display: 'none'} : {}}></li>
                                <li>
                                    <Link to="/login">
                                        <span className='top-link-itm-txt' onClick={props.a}
                                              style={acc ? {display: 'none'} : {}}>Đăng nhập</span>
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