import { Rating } from '@mui/material';
import React from 'react';

function FilterData({
    filteredProducts, 
    filterData, 
    minPrice, 
    maxPrice, 
    updateMinPrice, 
    updateMaxPrice, 
    updateBrands,
    updateWarrenty,
    updateRatings,
    updatePrice
}) {

    return (
        <>
            {
                filteredProducts && filteredProducts[0]?.brand ? <>
                    <h6>Brands</h6>
                    <hr />
                    <div className='mb-4'>
                        {filterData.reduce((uniqueBrands, product) => {
                            if (!uniqueBrands.includes(product.brand)) {
                                uniqueBrands.push(product.brand);
                            }
                            return uniqueBrands;
                        }, []).map((brand, id) => (
                            <div key={id}>
                                <input
                                    type="checkbox"
                                    onChange={() => updateBrands(brand)}
                                    style={{ marginBottom: "0.4rem" }}
                                    id={brand}
                                    value={brand}
                                />
                                <label htmlFor={id} style={{ fontSize: ".85rem" }} className='ms-2'>{brand}</label>
                            </div>
                        ))}
                    </div>
                </>
                    :
                    <></>
            }

            <h6>Warrenty period</h6>
            <hr />
            <div className='mb-4'>
                {filterData.reduce((uniqueBrands, product) => {
                    if (!uniqueBrands.includes(product.warrantyInformation)) {
                        uniqueBrands.push(product.warrantyInformation);
                    }
                    return uniqueBrands;
                }, []).map((warrantyInformation, id) => (
                    <div key={id}>
                        <input
                            type="checkbox"
                            onChange={() => updateWarrenty(warrantyInformation)}
                            id={warrantyInformation}
                            value={warrantyInformation}
                        />
                        <label htmlFor={id} style={{ fontSize: ".85rem" }} className='ms-2'>{warrantyInformation}</label>
                    </div>
                ))}
            </div>

            <h6>Rating</h6>
            <hr />
            <div className='ratings'>
                {
                    filterData.reduce((updateRating, product) => {
                        if (!updateRating.includes(Math.round(product.rating))) updateRating.push(Math.round(product.rating));
                        return updateRating
                    }, [])
                        .map((rating, id) => {
                            return (
                                <div key={id} className='d-flex align-items-center '>
                                    <input
                                        type="checkbox"
                                        style={{ marginBottom: "0.4rem" }}
                                        onChange={() => updateRatings(rating)}
                                        id={rating}
                                        value={rating}
                                    />
                                    <label htmlFor={id} className='ms-2 d-flex align-items-center'>
                                        <h6 className='me-2' style={{ fontSize: ".85rem" }}>{Math.floor(rating)} Stars</h6>
                                        <Rating name="read-only" style={{ fontSize: ".9rem", marginTop: "-.5rem", display: "flex" }} value={rating} readOnly />
                                    </label>
                                </div>
                            )
                        })
                }
            </div>

            <h6 className='mt-4'>Price</h6>
            <hr />
            <div className='price-range d-flex align-items-center'>
                <input type="number" className='form-control me-2' value={minPrice} onChange={(e) => updateMinPrice(e.target.value)} style={{ borderRadius: "0%" }} placeholder='Min' />
                <span className='me-2 text-secondary' style={{ fontSize: ".9rem" }}>To</span>
                <input type="number" className='form-control me-2' value={maxPrice} onChange={(e) => updateMaxPrice(e.target.value)} style={{ borderRadius: "0%" }} placeholder='Max' />
                <button className='btn btn-main' onClick={() => updatePrice(minPrice, maxPrice)} >Apply</button>
            </div>
        </>
    )
}

export default FilterData
