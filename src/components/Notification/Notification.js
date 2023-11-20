import React from 'react';
import { useSnackbar } from 'notistack';

const AddToCartButton = ({ product }) => {
    const { enqueueSnackbar } = useSnackbar();

    const addToCartHandler = (product) => {
        enqueueSnackbar('Sản phẩm đã được thêm vào giỏ hàng', { variant: 'success' });
    };

    return (
        <button
            type="button"
            className="add-to-cart-btn btn"
            // disabled={idShop === product?.shop?.id}
            onClick={() => addToCartHandler(product)}
        >
            <i className="fas fa-shopping-cart"></i>
            <span className="btn-text mx-2">Thêm vào giỏ hàng</span>
        </button>
    );
};

export default AddToCartButton;