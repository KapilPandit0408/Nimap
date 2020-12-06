const express=require("express");
const router=express.Router();
const product=require("../models/productModel")


router.get("/add",(req,res)=>{
    res.render("addProductDropdown");

})
router.get("/",(req,res)=>{
    product.find({},(err,founddata)=>{
        if(err){
            console.log(err);
        }
        else{
         
            res.render("showProduct",{founddata:founddata});
        }
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