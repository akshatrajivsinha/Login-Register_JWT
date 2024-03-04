const router = require("express").Router();
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
// const verify = require("../jwkverify")



router.post("/register",async(req,res)=>{
    
    try{
        const size = req.body.username.length;
        for( let i=0 ; i<size ; i++){
            if(req.body.username[i] === " ") {const err = new Error();
                err.status = 400;
                err.message = "No space in Username";next(err);}
            // res.status(400).json("No space in Username");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        const saveuser = new User(
           { ...req.body,
            password:hashPass,}
        );
        const rest = await saveuser.save();
        res.status(201).json(rest);
    }catch(err){
        res.status(500).json(err);
    }
})

let refreshTokens = [];
router.post("/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, process.env.RERESH_KEY, (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = jwt.sign(
        {
            id:user._id,
            username:user.username,
            email:user.email

        },process.env.JWT_KEY,{
            expiresIn:"187s"
        }
        
    );
      const newRefreshToken =jwt.sign(
        {
            id:user._id,
            username:user.username,
            email:user.email

        },
        process.env.RERESH_KEY
    );
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    //if everything is ok, create new access token, refresh token and send to user
  });


router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return(res.status(400).json("user not  found"))
        const isCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return(res.status(400).json("password is wrong"))
        const token = jwt.sign(
            {
                id:user._id,
                username:user.username,
                email:user.email

               
            }, process.env.JWT_KEY,{
                expiresIn:"1h"
            }
        );
        const refreshtoken = jwt.sign(
            {
                id:user._id,
                username:user.username,
                email:user.email

            },
            process.env.RERESH_KEY
        );
        res.json({
            id:user._id,
            username:user.username,
            email:user.email,
            token,
            refreshtoken,

        })
    }catch(err){
        res.status(500).json("error")
    }
})

router.post("/logout", async (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });


module.exports = router 