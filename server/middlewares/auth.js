import jwt from "jsonwebtoken";

const authUser = async(req, res, next) => {
  
    const {token} = req.headers
    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    try {
      const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
   
      if (token_decoded.id) {
      req.body.userId = token_decoded.id;
      
    }else{
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};



export default authUser;