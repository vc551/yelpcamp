var mongoose = require('mongoose');
var Campgrounds = require("./models/campgrounds");
var Comments = require("./models/comments");

var data = [
    {   name:       "Clouds Rest",
        image:      "https://farm1.staticflickr.com/67/196829137_ec96d451f8.jpg",
        description:"Clouds Rest Here, Apparently. Though, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat tellus et purus condimentum dignissim. Nulla facilisi. Nullam et egestas urna. Sed convallis diam vitae purus porta, vel interdum odio fringilla. Suspendisse ut scelerisque erat, id porttitor sem. Praesent interdum pharetra dolor quis rhoncus. Maecenas at urna nisi. Nullam id mauris vitae mi hendrerit vehicula et in leo. Curabitur at rutrum risus, ac feugiat velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque convallis sed ex id tincidunt. Nullam rutrum consequat lacus, ultrices fermentum nunc sagittis ut."
    },
    {   name:       "Desert Mesa",
        image:      "https://farm6.staticflickr.com/5306/5658855679_8eea201e17.jpg",
        description:"Tempe, definitely. Go Devils!"
    },
    {   name:       "Canyon Floor",
        image:      "https://farm8.staticflickr.com/7428/13979856128_e5a52baa04.jpg",
        description:"Hello from the floor!"
    },
    {   name:       "Serene Jungle",
        image:      "https://farm5.staticflickr.com/4267/34956136156_4becd57e16.jpg",
        description:"Serene Jungles, Nothing Else, not even Cellular Reception"
    },
    {   name:       "Amazing Campsite",
        image:      "https://farm1.staticflickr.com/78/196851615_42e7d38f8b.jpg",
        description:"Simply Amazing!"
    }
]

function seedDB(){
    Campgrounds.remove({},(err)=>{
        if(err){
            console.log("Error");
        } else {
            console.log("All data cleared from Database");
            // data.forEach((seed)=>{
            //     Campgrounds.create(seed, (err,campground)=>{
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("Campground Added to Database");
            //             Comments.create(
            //                 {
            //                     text:"This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, (err,comment)=>{
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("created new comment");
            //                     }
            //             });
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;