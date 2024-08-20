import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchingProductsData } from '../../../jsonData/apiProducts';
import ProductCard from './ProductCard';
import '../product.css'; 
import { Loader } from '../../index';

function Products({
    className,
    ...props
}) {
    const [getProducts, setGetProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const { products } = await fetchingProductsData(page);
        setGetProducts((prevProd) => {
            const newProducts = products.filter((product) => {
                return !prevProd.some((p) => p.id === product.id)
            })
            return [...prevProd, ...newProducts]
        });
        setLoading(false);
        setHasMore(products.length > 0);
    }, [page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // More Items Are Added
    const loadMoreItems = useCallback(() => {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
    }, []);

    // Calculate Discount 
    const calculateDiscountedPrice = (originalPrice, discount) => {
        const discountedPrice = originalPrice - (originalPrice * (discount / 100));
        return discountedPrice;
    };



    return (
        <div className={`${className}`} {...props}>
            <div className="row">
                <h4 className='heading'>Just For You</h4>
                {getProducts && getProducts.map((product, index) => (
                    <div key={index} className="product-list col-xl-2 col-md-3 col-sm-4 col-6">
                        <ProductCard product={product} discountPrice={calculateDiscountedPrice} />
                    </div>
                ))}
            </div>

            {loading && <div className='py-3 text-center'>
                <Loader className="m-auto" />
            </div>}

            <div className='text-center'>
                {getProducts && hasMore ?
                    <button className='btn btn-main mt-4' onClick={loadMoreItems}>Load More Products</button>
                    :
                    <p className='mt-3'>No more products are remaining</p>
                }
            </div>

        </div>
    );
}

export default Products;