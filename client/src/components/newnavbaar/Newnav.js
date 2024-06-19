import React from 'react'
import './newnav.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Newnav = () => {
    return (
        <div className="new_nav">
            <div className="nav_data">
                <div className="left_data">
                    <ShoppingCartIcon  id="icon" /> <p>All</p>
                    <p>Mobiles</p>
                    <p>Best Sellers</p>
                    <p>Fashion</p>
                    <p>Customer Service</p>
                    <p>Electronics</p>
                    <p>Prime</p>
                    <p>Today's Deals</p>
                    <p>Amazon Pay</p>
                </div>
                <div className="right_data">
                    <img src="nav.jpg" alt="navdata" />
                </div>
            </div>
        </div>
    )
}

export default Newnav