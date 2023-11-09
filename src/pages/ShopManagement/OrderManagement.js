import React from 'react';
import "./index.scss"
function OrderManagement() {
    // Dummy data for the table
    const orders = [
        {
            orderId: 'OD1234',
            productName: 'Product 1',
            amount: '$150',
            quantity: '2',
            buyer: 'John Doe',
            address: '123 Main St, Anytown',
            phone: '123-456-7890'
        },
        // ... more orders
    ];

    return (

        <div className="orderManagement mt-5">
            <h2>Order Management</h2>
            <table className="table table-hover'">
                <thead>
                <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số tiền</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Người mua</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <th scope="row">{order.orderId}</th>
                        <td scope="row">{order.productName}</td>
                        <td scope="row">{order.amount}</td>
                        <td scope="row">{order.quantity}</td>
                        <td scope="row">{order.buyer}</td>
                        <td scope="row">{order.address}</td>
                        <td scope="row">{order.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;
