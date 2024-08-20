import { Layout, ProductDetail } from '../features/index'
import React from 'react';
import "./css/pages.css";

function ProductDetailPage() {
    return (
        <section style={{ backgroundColor: "#eff0f5" }}>
            <Layout className='product-detail-page-padding'>
                <ProductDetail />
            </Layout>
        </section>
    )
}

export default ProductDetailPage
