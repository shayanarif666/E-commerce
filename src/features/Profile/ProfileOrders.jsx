import React from 'react'
import OrderHistory from '../Order/OrderHistory';
import "./profile.css";

function ProfileOrders() {

  const orders = JSON.parse(localStorage.getItem("Order"));

  return (
    <div>
      {
        orders ? <OrderHistory className="m-0" /> : <p className='text-secondary text-center'>There is no orders places before.</p>
      }

    </div>
  )
}

export default ProfileOrders
