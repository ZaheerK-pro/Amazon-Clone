import { Divider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './cart.css' 
import {LoginContext} from "../context/ContextProvider"
import CircularProgress from '@mui/material/CircularProgress';

export const Cart = () => {

    const { id } = useParams("");
    // console.logg(id)

    const history = useNavigate("")

    const {account, setAccount} = useContext(LoginContext)

    const [inddata, setInddata] = useState("")
    console.log(inddata)

    const getinddata = async()=> {
        const res = await fetch(`/getproductsone/${id}`, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();
        // console.log(data)

        if(res.status !== 201){
            console.log("Data not available")
        }
        else {
            console.log("getdata")
            setInddata(data)
        }
    }
    useEffect(() => {
        setTimeout(getinddata, 1000);
    },[id])

    // Add cart function 
const addtocart = async(id) => {
    const checkres = await fetch(`/addcart/${id}`,{
        method: "POST",
        headers:{
            Accept : "application/json",
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            inddata
        }),
        credentials:"include"
    })

    const data1 = await checkres.json();
    console.log(data1);

    if(checkres.status === 401 || !data1){
        console.log("Invalid User")
        alert("Invalid User");
    }
    else {
        // alert("Data added into cart")
        history("/buynow")
        setAccount(data1) 
    }
}

    
  return (
    <>
    <div className="cart_section">  
        {inddata && Object.keys(inddata).length &&
        <div className="cart_container">
            <div className="left_cart">
                <img src={inddata.detailUrl} alt="Products" />
                <div className="cart_btn">
                    <button className='cart_btn1' onClick={() =>addtocart(inddata.id)}>Add to cart</button>
                    <button className='cart_btn2'>Buy Now</button>
                </div>
            </div>
            <div className="right_cart">
                <h3>{inddata.title.shortTitle}</h3>
                <h4>{inddata.title.longTitle}</h4>
                <Divider />
                <p>M.R.P.: ₹{inddata.price.mrp}</p>
                <p>Deal of the day : <span style={{color:"#b12704"}}>₹{inddata.price.cost}</span></p>
                <p>You saved : <span style={{color:"#b12704"}}>₹{inddata.price.mrp - inddata.price.cost } ({inddata.price.discount})</span></p>

                <div className="discount_box">
                    <h5>Discount : <span style={{color:"#111"}}>{inddata.discount}</span></h5>
                    <h4>Free Delivery : <span style={{color:"#111", fontWeight:600}}>Oct 8 - 24</span> Details</h4>
                    <p>Fastest Delivery : <span style={{color:"#111"}}>Tommarow 11AM</span></p>
                </div>
                <p className='description'>
                    About the Item : <span style={{color:"#565959", fontSize:14, fontWeight:500, letterSpacing:0.4}}>{inddata.description}</span> 
                </p> 
            </div>
        </div> 
}
            {!inddata ? 
                <div className='circle'>
                <CircularProgress />
                <h2>Loading...</h2>
                </div> : ""
            }
    </div>

    </>
  )
}

export default Cart
