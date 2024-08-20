import React from 'react'
import { Navbar, Footer } from "../index"

function Layout({ children, className }) {
    return (
        <>
            <Navbar />

            <div className={className}>
                {children}
            </div>

            <Footer />
        </>
    )
}

export default Layout
