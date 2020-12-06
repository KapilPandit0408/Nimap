const mongoose=require("mongoose");
const product=require("../models/productModel")
const categorySchema=new mongoose.Schema({
    id:String,
    name:{
        type:String,
        required:[true,'please provide category name']
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})
categorySchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const res = await product.deleteMany({ _id: { $in: farm.products } })
        console.log(res);
    }
})

module.exports=mongoose.model("category",categorySchema);