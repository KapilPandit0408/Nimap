const express=require("express");
const router=express.Router();
const category=require("../models/categoryModel");
const product=require("../models/productModel")
const { route } = require("./productRoutes");

//category/:id/product/add

router.get("/",(req,res)=>{
    category.find({},(err,founddata)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{founddata:founddata});
        }
    })   
router.get("/:id",(req,res)=>{
    category.findById(req.params.id,(err,founddata)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("categorySingle",{founddata:founddata})
        }
    }).populate('products');
})
router.get("/:id/product/add",(req,res)=>{
const data=req.params.id;
console.log(data);
    res.render("addProduct",{data});
})

})
router.get("/add",(req,res)=>{
    res.render("addCategory");

})
router.post("/:id/product",(req,res)=>{
    var id=req.params.id
    category.findById(id,(err,foundcategory)=>{
        if(err){
            console.log(err);
        }
        else{
           console.log(foundcategory)
           var catid=foundcategory._id;
           var catname=foundcategory.name;
            const data={name:req.body.name,catid:catid,catname:catname}
           

     product.create(data,(err,foundproduct)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(foundproduct);
            
    foundcategory.products.push(foundproduct);
    foundproduct.foundcategory=foundcategory;
   
    foundcategory.save();
        res.redirect("/category/"+id)
   
        }
     })
  
  
        }
    })

})
router.post("/",(req,res)=>{
const data={name:req.body.name};
category.create(data,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/category");
    }
})
})

router.get("/:id/edit",(req,res)=>{
    category.findById(req.params.id,(err,founddata)=>{
        if(err){
            console.log(err);
        }
        else{
          res.render("editCategory",{founddata:founddata})
        }
    })
})

router.put("/:id",(req,res)=>{
    data={name:req.body.name};
    catdata={catname:req.body.name}

  
    category.findByIdAndUpdate(req.params.id,data,(err,founddata)=>{
        if(err){
            console.log(err);
        }
        else{
         
            res.redirect("/category");
       
        }
    })

   

})

router.delete("/:id",(req,res)=>{
    category.findByIdAndDelete(req.params.id,(err,founddata)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/category")
        }
    })
})




module.exports=router;
