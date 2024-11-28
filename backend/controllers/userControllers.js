import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"


//login
const loginUser= async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email})

    if(!user){
       return res.json({success:false,message:"user Doesn't exsist"})
    }
    const isMatch=await bcrypt.compare(password,user.password); //ss mk
    if(!isMatch){
        return res.json({success:false,message:"Invaild credentials"})
    }

    const token =createToken(user._id);
    res.json({success:true,token})

  } catch (error) {
    console.log(token);
    res.json({success:false,message:"Error"})
    
  }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const addUser= async(req,res)=>{
  let image_filename=`${req.file.avatar}`
  const user=new foodModel({
    name:req.body.name,
    email:req.body.description,
    phone:req.body.price,
    address:req.body.category,
    avatar:image_filename
  })
  try {
    await user.save();
    res.json({success:true,message:'User Added'})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'Error'})
    
  }
}
const registerUser= async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,messgae:"User already exists"})
        }
       // validing email format & strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,messgae:"Please enter a valid email"})
        }
      //hashing user password
      const salt=await bcrypt.genSalt(10)//tạo ra một chuỗi salt với độ phức tạp (số lần lặp) là 10.
      const hashedPassword =await bcrypt.hash(password,salt); //bamw mk

      const newUser =new userModel({// tao tk
        name:name,
        email:email,
        password:hashedPassword
      })
      const user=await newUser.save()
      const token= createToken(user._id)
      res.json({success:true,token});

    } catch (error) {
       console.log(error);
       res.json({success:fasle,message:"error"})
       
        
    }
}
const listUser=async(req,res)=>{
  try {
    const users=await userModel.find({})
    res.json({success:true,data:users})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:'error'})
  }
}
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, address } = req.body;

  try {
    // Tìm và cập nhật thông tin người dùng theo ID
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { firstName, lastName, phone, address },
      { new: true }  // Trả về tài liệu đã được cập nhật
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const removeUser=async (req,res)=>{
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:'User Removed'})
  } catch (error) {
    console.log('error')
    res.json({success:false,message:'error'})
  }
 };
 const getUserInfo = async (req, res) => {
  const { id } = req.params; // Lấy ID người dùng từ params

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await userModel.findById(id).select('-password'); // Không trả về mật khẩu
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving user data" });
  }
};
export  {loginUser,registerUser,listUser,removeUser,addUser,updateUser,getUserInfo}