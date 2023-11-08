import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateProduct from './CreateProduct'; // Giả sử CreateProduct và ListProduct cùng folder

function ListProduct() {

    return (
        <>
            <CreateProduct/>
        </>
    );
}

export default ListProduct;
