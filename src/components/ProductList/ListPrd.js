import React, {useContext, useEffect, useState} from 'react';
import "./ProductList.scss";
import Product from "../Product/Product";
import ReactPaginate from "react-paginate";
import {AppContext} from "../../Context/AppContext";

const ListPrd = ({products}) => {
    const [page, setPage] = useState(0);
    const [perPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [product, setProducts] = useState(products);
    const {isFlag ,toggleFlag } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            const startIndex = page * perPage;
            const endIndex = startIndex + perPage;
            const paginatedProducts = product.slice(startIndex, endIndex);
            setProducts(paginatedProducts);
            setTotalPages(Math.ceil(product.length / perPage));
        };
        fetchData();
    }, [page, perPage , isFlag]);
    const handlePageClick = (selectedPage) => {
        setPage(selectedPage.selected);
        toggleFlag();
    };
    return (
        <>
            <div className='product-lists grid bg-whitesmoke my-3'>
                {
                    product.map(product => {
                        let discountedPrice = (product.price) - (product.price * (product.promotion / 100));

                        return (
                            <div>
                                <Product key={product.id} product={{...product, discountedPrice}}/>

                            </div>

                        )
                    })
                }

            </div>
            <div><ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={'pagination-container'}
                activeClassName={'active'}
            /></div>
        </>

    )
}

export default ListPrd