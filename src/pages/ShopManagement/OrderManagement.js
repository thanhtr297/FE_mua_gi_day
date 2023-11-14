import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import "./Order.scss"
function OrderManagement() {
    // const idAcc = localStorage.getItem("account")
    // const [listPending , setListPending] = useState([]) ;
    // const [listReject , setListReject] = useState([]) ;
    // const [listCancel , setListCancel] = useState([]) ;
    // const [listSuccess , setListSuccess] = useState([]) ;
    //
    // const orders = [
    //     {
    //         orderId: 'OD1234',
    //         productName: 'Product 1',
    //         amount: '$150',
    //         quantity: '2',
    //         buyer: 'John Doe',
    //         address: '123 Main St, Anytown',
    //         phone: '123-456-7890'
    //     },
    //     // ... more orders
    // ];
    // useEffect(() => {
    //     listOrder({
    //         confirm : '1'  ,
    //         account :  {
    //             id : idAcc
    //         }
    //     }).then(res => {
    //         setListPending(res.data)
    //     })
    //     listOrder({
    //         confirm : '3'  ,
    //         account :  {
    //             id : idAcc
    //         }
    //     }).then(res => {
    //         setListReject(res.data)
    //     })
    //     listOrder({
    //         confirm : '4'  ,
    //         account :  {
    //             id : idAcc
    //         }
    //     }).then(res => {
    //         setListSuccess(res.data)
    //     })
    //     listOrder({
    //         confirm : '5'  ,
    //         account :  {
    //             id : idAcc
    //         }
    //     }).then(res => {
    //         setListCancel(res.data)
    //     })
    // }, [listCancel ,listReject ,listPending ,listSuccess]);
    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(null);
    const [initialLink, setInitialLink] = useState(null);
    // const [allButtonClicked, setAllButtonClicked] = useState(false);

    const links = [
        { to: '/shop-management/order-management/allOrder', label: 'Tất cả' },
        { to: '/shop-management/order-management/confirm', label: 'Chờ xác nhận' },
        { to: '/shop-management/order-management/shipping', label: 'Đang giao' },
        { to: '/shop-management/order-management/done', label: 'Đã giao' },
        { to: '/shop-management/order-management/reject', label: 'Đơn hủy' },
        { to: '/shop-management/order-management/cancel', label: 'Giao không thành công' },
    ];

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setSelectedLink(path);
    }, [location.pathname]);
    // useEffect(() => {
    //     setInitialLink(links[0].to.split('/').pop());
    // }, []);

//     useEffect(() => {
//         // Lưu liên kết ban đầu
//         // setInitialLink(links[0].to.split('/').pop());
//         const handleScroll = () => {
//             const nav = document.querySelector('.nav-list');
//
//             if (nav) {
//                 // Nếu vị trí cuộn (scrollTop) lớn hơn 0, đặt nó về 0 để cuộn lên đầu
//                 if (window.scrollY > 0) {
//                     nav.style.position = 'fixed';
//                     nav.style.top = '10px';
//                 } else {
//                     // Ngược lại, đặt lại vị trí thành static để nó đứng yên
//                     nav.style.position = 'static';
//                 }
//             }
//         };
//
//         window.addEventListener('scroll', handleScroll);
//
//         // Xóa sự kiện khi component unmount
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//
//
// }, []);
//     const handleButtonClick = (link) => {
//         setSelectedLink(link);
//         if (link === initialLink) {
//             setAllButtonClicked(true);
//         } else {
//             setAllButtonClicked(false);
//         }
//     };

    return (
        <div style={{}} >
            <nav className={'naV'}>
                <ul className="nav-list" style={{}} >
                    {links.map((link, index) => (
                        <li key={index} className={`nav-item 
                        ${selectedLink === link.to.split('/').pop() ? 'selected' : (initialLink === link.to.split('/').pop() ? 'selected' : '')}`}>
                            <Link to={link.to} className={`nav-link ${selectedLink === link.to.split('/').pop() ? 'selected' : (initialLink === link.to.split('/').pop() ? 'selected' : '')}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


            <main className="main-content">
                {/* Outlet will render the nested route as the main content */}
                <Outlet  />
            </main>
        </div>
    );
}

export default OrderManagement;
