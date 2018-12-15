var express = require("express");
var router  = new express.Router({mergeParams:true});
var Campground  = require("../models/campgrounds");
var Comment  = require("../models/comments");
var middleware  = require("../middleware"); //Automatically Acquires Index.js

router.get("/new",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err)
        {
            req.flash("error",err.message);
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("comments/new",{campground:foundCampground});
        }
    });
});

router.post("/",middleware.isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err) {
            req.flash("error",err.message);
            console.log(err);
            redirect("/campgrounds");
        } else {
            //console.log(req.body.comment);
            Comment.create(req.body.comment,(err,comment)=>{
                if(err) {
                    req.flash("error",err.message);
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment Added Successfully!");
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
});

//update

router.get("/:comment_id/edit",middleware.checkCommentOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }else{
            Comment.findById(req.params.comment_id,(err,comment)=>{
                if(err){
                    req.flash("error",err.message);
                    console.log(err);
                    res.redirect("back");
                }else{
                    res.render("comments/edit",{campground:campground,comment:comment});
                }
            });
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success","Comment Updated Successfully!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy

router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            req.flash("error",err.message);
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success","Comment Deleted Successfully!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

module.exports = router;