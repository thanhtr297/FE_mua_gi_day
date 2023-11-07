import React from 'react';
import "./Header.scss";
import {Link} from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';


const Header = (props) => {
  return (
    <header className='header1 text-white' >
      <div className='containerr' >
        <div className='header1-cnt' >
          <div className='header1-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header1-cnt-top-l'>
              <ul className='flex top-links align-center'>
                <li>
                  {/* dummy links */}
                  <Link to = "/seller">Seller Center</Link>
                </li>
                <li className='vert1-line'></li>
                <li>
                  {/* dummy links */}
                  <Link to = "/download">Download</Link>
                </li>
                <li className='vert1-line'></li>
                <li className='flex align-center'>
                  <span className='fs-13'>Follow us on</span>
                  <ul className='social-links flex align-center'>
                    <li className='mx-2'>
                      <a href = "www.facebook.com" className='fs-15'>
                        <i className='fab fa-facebook'></i>
                      </a>
                    </li>
                    <li className='mx-2'>
                      <a href = "www.instagram.com" className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='header1-cnt-top-r' >
              <ul className='top-links flex align-center' >
                <li>
                  <div className="nav-item dropdown" >
                                      <a href="#" className=" nav-link dropdown-toggle" data-bs-toggle="dropdown"><small className="fa fa-user text-body"></small></a>
                    <div className="dropdown-menu m-0">
                                    <Link to={'/profile'} className="dropdown-item">Hồ sơ</Link>
                                  <a href="l" className="dropdown-item" >Shop của tôi</a>
                          <Dropdown.Divider />
                      <a href="" className="dropdown-item">Đăng xuất</a>
                            </div>
                      </div>
                </li>
                <li className='vert1-line'></li>
                <li>
                  <Link to = "/">
                    <span className='top-link-itm-txt'>Register</span>
                  </Link>
                </li>
                <li className='vert1-line'></li>
                <li>
                  <Link to = "/login">
                    <span className='top-link-itm-txt' onClick={props.a}>Log in</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='header1-cnt-bottom'>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header