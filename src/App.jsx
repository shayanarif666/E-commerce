import { useState } from 'react'
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
  Link,
} from "react-router-dom";
import { Authentication, Categories, Layout, Login, PageNotFound, Register, UnAuthorizedUser } from './features/index';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import OrderTrackingPage from "./pages/OrderTrackingPage"
import ProfilePage from './pages/ProfilePage';
import { Dashboard } from './admin panal/index';
import FilterProductsPage from './pages/FilterProductsPage';
import AccountPage from "./pages/AccountPage"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {/* Routes For UI */}
          <Route path='/' element={<Home></Home>} />
          <Route path='/products/:category' element={<FilterProductsPage></FilterProductsPage>} />
          <Route path='/mobileCategories' element={<Categories></Categories>}></Route>
          <Route path='/product-detail/:id' element={<ProductDetailPage></ProductDetailPage>}></Route>
          <Route element={<Authentication />}>
            <Route path='/cart' element={<CartPage></CartPage>}></Route>
          </Route>
          <Route path='/checkout' element={<CheckoutPage></CheckoutPage>}></Route>
          <Route path='/order-details/:id' element={<OrderHistoryPage></OrderHistoryPage>}></Route>
          <Route path='/order-tracking/:id' element={<OrderTrackingPage></OrderTrackingPage>}></Route>
          <Route path='/wishlist' element={<WishlistPage></WishlistPage>}></Route>
          <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
          <Route path='/account' element={<AccountPage></AccountPage>}></Route>

          <Route path='/*' element={<PageNotFound></PageNotFound>}></Route>

          {/* Auth Routes */}
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>

          {/* Routes For Admin */}
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path='/dashboard/*' element={<Dashboard></Dashboard>}></Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export const ProtectedRoute = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {
        user?.email === "shayanarif666@gmail.com" ?
          <Outlet></Outlet>
          :
          <UnAuthorizedUser></UnAuthorizedUser>
      }
    </>
  )
}

export default App;
