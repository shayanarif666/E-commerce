import React from 'react'
import { Layout, Wishlist } from '../features/index';
import "./css/pages.css";

function WishlistPage() {
  return (
    <section style={{ backgroundColor: "#eff0f5"}}>
      <Layout className="wishlist-page-padding">
        <Wishlist />
      </Layout>
    </section>
  )
}

export default WishlistPage
