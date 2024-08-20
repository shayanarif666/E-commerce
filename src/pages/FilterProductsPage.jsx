import React from 'react'
import { FilterProducts, Layout } from '../features/index';
import "./css/pages.css";

function FilterProductsPage() {
    return (
        <section style={{ backgroundColor: "#eff0f5" }}>
            <Layout className="page-padding">
                <FilterProducts />
            </Layout>
        </section>
    )
}

export default FilterProductsPage
