import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
    AddCustomer,
    AddProduct,
    EditCustomer,
    EditProduct,
    Header,
    Main,
    AdminFooter,
    Orders,
    Sidebar,
    ViewCategory,
    ViewCustomer,
    ViewProduct,
    ProductDetail
} from "../../index"
import "./css/dashboard.css"

function Dashboard() {

    const [isAsideOpen, setIsAsideOpen] = useState(true);

    return (
        <div className='d-flex'>
            <Sidebar setAsideOpen={setIsAsideOpen} isAsideOpen={isAsideOpen} width={`${isAsideOpen ? "300px" : "0px"}`} transform={`${isAsideOpen ? "0" : "-500px"}`} transition={"all .5s ease"} />
            <div className="dashboard-content main w-100">
                <Header margin="0%" setAsideOpen={setIsAsideOpen} asideOpen={isAsideOpen} />
                <div className="routes" style={{ padding: "0 0", marginBottom: "7rem" }}>
                    <Routes>
                        <Route path='/' element={<Main></Main>} />
                        {/* Category Routes */}
                        <Route path='/viewCategory' element={<ViewCategory></ViewCategory>} />
                        {/* Products Routes */}
                        <Route path='/addProduct' element={<AddProduct></AddProduct>} />
                        <Route path='/viewProduct' element={<ViewProduct></ViewProduct>}></Route>
                        <Route path='/editProduct/:id' element={<EditProduct></EditProduct>} />
                        <Route path='/productDetails/:id' element={<ProductDetail></ProductDetail>} />
                        {/* Customer Routes */}
                        <Route path='/addCustomer' element={<AddCustomer></AddCustomer>} />
                        <Route path='/viewCustomer' element={<ViewCustomer></ViewCustomer>}></Route>
                        <Route path='/editCustomer/:id' element={<EditCustomer></EditCustomer>} />
                        {/* Order Routes */}
                        <Route path="/orders" element={<Orders></Orders>}></Route>
                    </Routes>
                </div>
                <AdminFooter />
            </div>
        </div>
    )
}

export default Dashboard
