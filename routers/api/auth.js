const express=require("express");
const router =express.Router();
const bodyparser=require("body-parser");
const cookie =require("cookie-parser");
const cors =require('cors');
const bcrypt = require("bcrypt");
const db = require("../../setup/dbConfig").db;
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

router.get('/auth',(req, res)=> {

    return res.send([
        {username: "vijaykumar"},
        {username : "kumar"}
        ]);
});
router.post("/auth/login",(req,res)=>{
    const email=req.body.email;
    const password =req.body.password;
    
    return db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

              bcrypt.compare(password, user.password, (err, isMatch) => {
                  if (err) {
                      console.log(err);
                      res.json({message : "internal error" })
                  }
                  if (isMatch) {
                    const payload ={
                      email: user.email
                    };
        
                    jsonwt.sign(payload,
                      key,
                      {expiresIn :9000000},
                      (err, token) => {
                          res.cookie("auth_t", token, { maxAge: 90000000 });
                          return res.json({'token ': token , 'success':true})  
                      }
                    )
                  } else {
                      //password is incorrect
                      return res.json({message : "Invalied email or Password" })
                  }
              });
          } else {
            return res.json({message : "Invalied email or Password" })
          }
      }
  )
   
})

router.post("/auth/register",async(req,res)=>{
    console.log(req.body.email)
    const email = req.body.email
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    await NewUser.findUser(req.body.email)
    db.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email]
      // ,(err, result)=>{
      //     if (err) {
      //         return err;
      //     }
      //     console.log(result.rows)
      //     return result;
      // }
      )
        .then( new_user=>{

            console.log(new_user)
            if(new_user.rows.length > 0 ){
                return res.json({
                    message:'Email is Already Registered'});
            }else{
               console.log(req.body.email)
               const userdetails ={
                email: req.body.email,
                };

                NewUser.insertUser(email,hashedPassword)
                .then( 
                  jsonwt.sign(userdetails, key,
                    { expiresIn: 3000 },
                     (err, token) => {
                    res.cookie("auth_t", token, { maxAge: 900000 });
                    if(!err){ 
                        console.log("success:true")
                      return  res.json({token:token ,success : true})
                    }
                      
                   else{
                    return  res.json({error:"error"});
                   }
                     
                  })
                  
                  )
                .catch(err => console.log(err));
 
                }
        })
     .catch(err =>{
        console.log(err)
        res.json({message :'internal error .......'});
        
       
});



})

router.get("/logout", (req, res) => {
    jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
      if (user) {
        res.clearCookie("auth_t").json({'success':true})
        
      } else {
        return res
        .status(404)
        .json({'success':false})
      }
    });
  });


module.exports =router;