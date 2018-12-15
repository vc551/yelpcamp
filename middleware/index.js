var Campground      = require("../models/campgrounds");
var Comment         = require("../models/comments");

var middlewareObj   = {};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged in to do that!");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                req.flash("error","DataBase Error! Campground not found");
                res.redirect("/campgrounds");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You need to be the Original User to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be Logged in to do that!");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                req.flash("error","DataBase Error! Comment not found");
                res.redirect("/campgrounds/"+req.params.id);
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You need to be the Original User to do that!");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be Logged in to do that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;