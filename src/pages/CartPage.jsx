import React from 'react'
import { Cart, Layout } from "../features/index";
import "./css/pages.css";

function CartPage() {
  return (
    <>
      <section style={{ backgroundColor: "#eff0f5" }}>
        <Layout className="page-padding">
          <Cart />
        </Layout>
      </section>
    </>
  )
}

export default CartPage
