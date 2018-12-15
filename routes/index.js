var express = require("express");
var router  = new express.Router();

router.get("/",(req,res)=>{
    res.render("landing");
});

router.get("/sitemap",(req,res)=>{
    res.render("sitemap");
});

module.exports = router;