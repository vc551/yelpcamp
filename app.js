var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    Campground          = require("./models/campgrounds"),
    Comment             = require("./models/comments"),
    User                = require("./models/user"),
    seedDB              = require("./seeds");

var indexRoutes         = require("./routes/index"),
    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    authRoutes          = require("./routes/auth");

var port = 3000;

var dbaddr;

if(process.env.DATABASEURL && process.env.DATABASEURL.length>0){
    dbaddr=process.env.DATABASEURL;         //Cloud Hosted Database
}else{
    dbaddr="mongodb://localhost/yelp_camp"; //Local Database
}

mongoose.connect(dbaddr);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(require("express-session")({
    secret:"Bullet is Amazing",
    resave:false,
    saveUninitialized:false
}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//seedDB();

app.use((req,res,next)=>{
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT||port,process.env.IP,()=>{
    console.log("Server started on port "+port);
});