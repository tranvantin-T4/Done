import jwt from 'jsonwebtoken'

const authMiddleware =async(req,res,next)=>{
   const {token}=req.headers;
   if(!token){
    return res.json({succes:false,message:"not authorrized login  again"})
   }
   try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET)
    req.body.userId=token_decode.id;
    next();
   }catch(error){
    console.log(error);
    res.json({succes:false,message:"error"})
    
   }
   
}
export default authMiddleware;
