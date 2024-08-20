import React from 'react'
import { Layout, OrderHistory } from "../features/index"
import { Link } from 'react-router-dom';
import "./css/pages.css";

function OrderHistoryPage() {

    const orders = JSON.parse(localStorage.getItem("Order"));

    return (
        <>
            <section style={{ backgroundColor: "#eff0f5" }}>
                <Layout className="order-history-page-padding">
                    {
                        orders ?
                            <OrderHistory />
                            :
                            <div className='d-flex align-items-center justify-content-center text-center' style={{ height: "600px" }}>
                                <div>
                                    <p>There is no orders in your orders right now.</p>
                                    <Link to={`/`} className='btn btn-secondary shadow'>Go Back To Shopping</Link>
                                </div>
                            </div>
                    }
                </Layout>
            </section>
        </>
    )
}

export default OrderHistoryPage
