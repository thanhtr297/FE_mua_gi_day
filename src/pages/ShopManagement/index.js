import React, {useContext, useEffect, useState} from 'react';
import { Link, Outlet} from "react-router-dom";
import './index.scss';
import {findAccountById} from "../../service/UserService";
import {findUserByAccount} from "../UserManagement/Service/UserService";
import {findShop} from "./service/ProfileService";
import {red} from "@mui/material/colors";
import {AppContext} from "../../Context/AppContext";
import {toast} from "react-toastify";

function DashBoard() {
    const dataOrder = "Thanh"
    let acc = localStorage.getItem('account');
    const [idShop ,setIdShop] = useState(null) ;
    const {isFlag} = useContext(AppContext);
    useEffect(() => {
        console.log(acc)
        if (acc !== null) {
            findShop(acc).then((res) => {
                setIdShop(res.account.id) ;

            }).catch( () =>{
                toast.warning("Bạn chưa có shop vui lòng cập nhật  thông tin shop để tiếp tục")
            })
            }
    }, [isFlag]);
    return (

    <div className="dashboard">
        <nav className="nav">
            {/* ... navigation links ... */}

                {idShop === null ?
                    <ul className="nav__list">
                    <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/profile">Thông tin</Link>
                </li>   </ul>:
                        <ul className="nav__list">

                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/order-management" state ={{dataOrder}}>Quản lý đơn hàng</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/list-product">Danh sách Sản phẩm</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/report">Báo cáo doanh thu</Link>
                </li>
                <li className="nav__item">
                    <Link  className={'cekkon'} to="/shop-management/profile">Thông tin</Link>
                </li>  </ul> }

        </nav>
        <main className="main-content">
            {/* Outlet will render the nested route as the main content */}
            <Outlet />
        </main>
    </div>
    );
}

export default DashBoard;
