import React, { useEffect, useState } from 'react'
import { Layout, Slider, CategoryListing, Products, Categories } from "../features/index"
import "./css/pages.css"
import { fetchingCategoriesData } from '../jsonData/apiProducts';

function Home() {

    const [categories, setCategories] = useState([]);

    // Get All Categories
    const getAllCategories = async () => {
        const getCategories = await fetchingCategoriesData();
        setCategories(getCategories)
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <section style={{ backgroundColor: "#eff0f5" }}>
            <Layout className="page-padding">
                <div className="custom-container" style={{ height: "100%", paddingTop: "2rem" }}>
                    <div style={{ display: "flex" }}>
                        <CategoryListing categories={categories} className="d-lg-block d-none" />
                        <Slider />
                    </div>
                    <Categories className='mt-5' categories={categories} />
                    <Products className='mt-5' />
                </div>
            </Layout>
        </section>
    )
}

export default Home
