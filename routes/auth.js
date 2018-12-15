var express = require("express");
var router  = new express.Router();
var passport= require("passport");
var User    = require("../models/user");

router.get("/register",(req,res)=>{
    res.render("auth/register");
});

router.post("/register",(req,res)=>{
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password,(err,user)=>{
        if(err){
            req.flash("error",err.message);
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to YelpCamp! Happy to see you!");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",(req,res)=>{
    res.render("auth/login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), (req,res)=>{
});

router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Successfully Logged you Out!");
    res.redirect("/campgrounds");
});

module.exports = router;