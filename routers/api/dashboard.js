const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const cookie =require("cookie-parser");
const cors =require('cors');
const bcrypt = require("bcrypt");

const jsonwt =require("jsonwebtoken");
const key =require("../../setup/connect").sceret;
router.use(bodyparser.urlencoded({extended:false}));
router.use(bodyparser.json());
router.use(cookie());

router.use(cors())
const NewUser= require("../../models/newuser");

// @type    POST
//@route    /login/auth
// @desc    starting router
// @access  PUBLIC

router.get("/",(req,res)=> {
    var details;
    //console.log(req.cookie.auth_t);
    jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
        if(err){
        return res.json({'success':false})
        }
        else{
            user
        }
     //console.log(req.cookies.auth_t +user); 
    // var obj ={
    //      email:user.email,        
    //  }
    //  });
    //  console.log(obj.email);
     res
     .status(400)
     .json({

         'email':user.email,
         "success":true
     })
});
})
 module.exports = router;