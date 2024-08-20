import React from 'react'
import { Layout, Checkout } from '../features/index'
import "./css/pages.css";

function CheckoutPage() {
    return (
        <>
            <section style={{ backgroundColor: "#eff0f5" }}>
                <Layout className="page-padding">
                    <Checkout />
                </Layout>
            </section>
        </>
    )
}

export default CheckoutPage
