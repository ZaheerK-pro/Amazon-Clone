const express = require('express');
const router = new express.Router();
const Products = require('../models/productsScema')
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate")

// get productsdata api  
router.get("/getproducts", async(req, res) => {
    try {
        const productsdata = await Products.find()   // find the data
        // console.log(productsdata);
        res.status(201).json(productsdata)
    } catch (error) {
        console.log("Error" + error.message);
    }
})

// get individual data
router.get("/getproductsone/:id", async(req,res) => {
    try {
        const {id} = req.params;

        const individualdata = await Products.findOne({id:id})

        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("Error" + error.message);
    }
})

// Register data

router.post("/register", async(req, res) => {
     
    const {fname, email, mobile, password, cpassword} = req.body;

    if(!fname || !email || !mobile || !password || !cpassword){
        res.status(422).json({error: "Fill all data first"});
        console.log("Data not available")
    };

    try {
        const preuser = await USER.findOne({email:email});

        if(preuser) {
            res.status(422).json({error: "This user is already present"})
        }
        else if(password !== cpassword){
            res.status(422).json({error: "Password not match"})
        }
        else {
            const finalUser = new USER ({
                fname, email, mobile, password, cpassword
            });

            const storedata = await finalUser.save(); 
            console.log(storedata)

            res.status(201).json(storedata) 
        }

    } catch (error) {
        
    }
})

// User Login
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({error: "Fill all data"})
    };

    try {
        const userlogin = await USER.findOne({email:email})

        if(userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password)
            // console.log(isMatch)

            // Token Generate
            const token = await userlogin.generateAuthtoken()
            // console.log(token)

            res.cookie("Amazonweb", token,{
                expires : new Date(Date.now() + 9000000),
                httpOnly : true
            })

            if(!isMatch) {
                res.status(400).json({error: "Invalid Details!"})
            }
            else {
                res.status(201).json({userlogin})
            }
        }
        else {
            res.status(400).json({error: "Invalid Details!"})
        }
    } catch (error) {
        res.status(400).json({error: "Invalid Details!"})
    }
})

// Adding data into cart

router.post("/addcart/:id",authenticate,async(req, res) => {
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id}); 
        console.log(cart)

        const UserContact = await USER.findOne({_id:req.userID});
        console.log(UserContact);

        if(UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData)
            res.status(201).json(UserContact)
        }
        else {
            res.status(401).json({error : "Invalid User"})
        }
    }
    catch (error){
        res.status(401).json({error : "Invalid User"})
    }
});


// get cart details
router.get("/cartdetails", authenticate,async(req, res) => {
    try {
        const buyuser = await USER.findOne({_id:req.userID}) 
        res.status(201).json(buyuser)
    }
    catch(error){
        console.log("Error" + error);
    }
}) 


// get Valid user
router.get("/validuser", authenticate,async(req, res) => {
    try {
        const validuserone = await USER.findOne({_id:req.userID}) 
        res.status(201).json(validuserone)
    }
    catch(error){
        console.log("Error" + error);
    }
}) 

// remove item from cart
router.delete("/remove/:id", authenticate, async(req, res)=> {
    try {
        const {id} = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curvalue)=> {
            return curvalue.id != id;
        })
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("Item Removed")
    } catch (error) {
        console.log("Error" + error)
        res.status(400).json(req.rootUser);
    }
})

// For user logout
router.get("/logout", authenticate,(req, res)=> {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("Amazonweb", {path:"/"})

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User logout")
    } catch (error) {
        res.status(400).json(req.rootUser.tokens);
        console.log("Error for user logout")
    }
})

module.exports = router;