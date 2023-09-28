const jwt = require("jsonwebtoken");
const refreshTokenDecode =async (token)=>{

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decode.id)
    return decode.id;
};
module.exports={refreshTokenDecode}