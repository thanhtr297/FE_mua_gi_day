import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from "react-router-dom";
import './index.scss';

function DashBoard() {
    const dataOrder = "Thanh"
    return (

    <div className="dashboard">
        <nav className="nav">
            {/* ... navigation links ... */}
            <ul className="nav__list">
                <li className="nav__item">
                    <Link to="/shop-management/order-management" state ={{dataOrder}}>Quản lý đơn hàng</Link>
                </li>
                <li className="nav__item">
                    <Link to="/shop-management/list-product">Danh sách Sản phẩm</Link>
                </li>
                <li className="nav__item">
                    <Link to="/shop-management/report">Báo cáo doanh thu</Link>
                </li>
                <li className="nav__item">
                    <Link to="/shop-management/profile">Thông tin</Link>
                </li>
            </ul>
        </nav>
        <main className="main-content">
            {/* Outlet will render the nested route as the main content */}
            <Outlet />
        </main>
    </div>
    );
}

export default DashBoard;
