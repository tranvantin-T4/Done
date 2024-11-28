import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    // phone: { type: Number },
    // address: {type: String},
    // avatar: {type:String},
    cartData:{type:Object,default:{}},
    
    firstName: { type: String, required: false }, 
    lastName: { type: String, required: false },  
    phone: { type: String, required: false },     
    address: { type: String, required: false }



},{minimize:false})
const userModel=mongoose.models.user || mongoose.model('user',userSchema);//Nếu mô hình user đã được định nghĩa và tạo trước đó, mongoose.models.user sẽ trả về mô hình này.
export default userModel;