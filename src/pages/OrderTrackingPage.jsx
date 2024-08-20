import React from 'react'
import { Layout, OrderTracking } from '../features/index'
import "./css/pages.css";

function OrderTrackingPage() {
    return (
        <section style={{ backgroundColor: "#eff0f5" }}>
            <Layout className="order-tracking-page-padding">
                <OrderTracking />
            </Layout>
        </section>
    )
}

export default OrderTrackingPage
