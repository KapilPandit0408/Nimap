const express=require("express");
const router=express.Router();
const product=require("../models/productModel")


router.get("/add",(req,res)=>{
    res.render("addProductDropdown");

})




router.get("/",(req,res)=>{
    res.redirect("/product/1");
})

       
   
 
    

    router.get('/:page', function(req, res, next) {
        var perPage = 10
        var page = req.params.page || 1
    
        product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err,  founddata) {
                product.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('showProduct', {
                        founddata:founddata,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    })
    



router.post("/",(req,res)=>{
    const data={name:req.body.name};
    product.create(data,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/product");
        }
    })
    })
    
    router.get("/:id/edit",(req,res)=>{
        product.findById(req.params.id,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
              res.render("editProduct",{founddata:founddata})
            }
        })
    })
    
    router.put("/:id",(req,res)=>{
        const data={name:req.body.name}
        product.findByIdAndUpdate(req.params.id,data,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/product");
            }
        })
    })
    
    router.delete("/:id",(req,res)=>{
        product.findByIdAndRemove(req.params.id,(err,founddata)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/product")
            }
        })
    })
    

    



module.exports=router;