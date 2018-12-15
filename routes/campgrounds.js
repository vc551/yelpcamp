var express     = require("express");
var router      = new express.Router();
var Campground  = require("../models/campgrounds");
var middleware  = require("../middleware"); //Automatically Acquires Index.js

router.get("/",(req,res)=>{
    //res.render("campgrounds",{campgrounds:campgrounds});
    Campground.find({},(err,campgrounds)=>{
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index",{campgrounds:campgrounds});    //Here the Source is the campground that has been fetched from the database
        }
    })
});

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    res.render("campgrounds/new");
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    req.body.campground.author = {
        id:req.user._id,
        username:req.user.username
    }
    //campgrounds.push({name:name, image:image});
    Campground.create(req.body.campground,(err,campground)=>{
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
        }
        else
        {
            req.flash("success","Campground Added Successfully!");
            console.log("Added a new Campsite ");
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
});

router.get("/:id",(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//update

router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    })
});

router.put("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body.updated,(err,campground)=>{
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            req.flash("success","Campground Updated Successfully!");
            res.redirect("/campgrounds/"+campground._id);
        }
    });
});

//destroy

router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground Deleted Successfully!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;