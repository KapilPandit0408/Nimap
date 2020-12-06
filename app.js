const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
const catogryRoutes=require("./routes/catogeryRoutes")
const productRoutes=require("./routes/productRoutes")
var override=require("method-override");
app.use(override('_method'));
app.set("view engine","ejs");
const url=process.env.MONGO_URL || "mongodb://localhost/nimap"
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
});
app.get("/",(req,res)=>{
    res.redirect("/category");
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/category",catogryRoutes);
app.use("/product",productRoutes);
module.exports=app;