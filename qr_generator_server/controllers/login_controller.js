const UserData = require("../models/userData");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {decrypt} = require("n-krypta");
const nodemailer = require('nodemailer');
const OTP = require("../models/OTP");
const { mailSender, mailBody } = require("./mailSender");



module.exports.login = async (req, res) => {
  try {
    console.log("req.body.password",req.body.password)
    const password = decrypt(req.body.password, process.env.KRYPTA_KEY);
    
    const findUser = await UserData.findOne({ email: req.body.email }).populate("listOfDynamicQRs");
    console.log("findUser",findUser)
    console.log("chech password",await bcrypt.compare(password, findUser.password))
    if (findUser) {
      if (!await bcrypt.compare(password, findUser.password)) {
        return res.status(401).json({
          message: "Incorrect userid or password",
          status: false,
        });
      }

      const token = jwt.sign({ data: findUser.id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60,
      });
      console.log("token:: ", token);
      const data = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        avatar: findUser.avatar,
        listOfDynamicQRs: findUser.listOfDynamicQRs,
      };
      return res.status(200).json({
        message: " Login successfully",
        status: true,
        data,
        token,
      });
    } else {
      return res.status(401).json({
        message: "User not found",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Incorrect userid or password",
      status: false,
      error: error,
    });
  }
};

module.exports.signup = async function (req, res) {
  try {
    const findUser = await UserData.findOne({ email: req.body.email });
    if (findUser) {
      return res.json({
        message: "user already created with the same email id",
        status: false,
        data: findUser,
      });
    }
    const matchOtpForUser = await OTP.findOne({email: req.body.email});
    if(!matchOtpForUser){
      return res.json({
        message: "otp not mached",
        status: false,
      });
    }else if(matchOtpForUser.otp != req.body.otp){
      return res.json({
        message: "otp not mached",
        status: false,
      });
    }
    
    console.log("signup::",req.body)
    const password = decrypt(req.body.password, process.env.KRYPTA_KEY);
    const createdUser = await UserData.create({ name: req.body.name, email: req.body.email, password: password });
    console.log("user created succeffuly :: ", createdUser);

    return res.status(200).json({
      message: "successfully created new user",
      status: true,
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in creating new user in server side",
      status: false,
      error: error,
    });
  }
};

module.exports.userData = async (req, res) => {
  try {
    console.log(req.body);
    const user = await UserData.findById(req.body.id).select("-password").populate("listOfDynamicQRs");
    console.log("HomePage: ", user);
    return res.json({
      message: "User data fetch succefully",
      status: true,
      data: user,
    });
  } catch (error) {
    return res.json({
      status: false,
      error,
    });
  }
};

module.exports.forget= async (req, res) => {
  console.log("forget email:",req.body)
  try{  
    // -----generate random 6 digit number -----------
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    // console.log("random number: ", randomCode)

    // -----------Bcrypt Password---start-----
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(randomCode.toString(), saltRound);
    // -----------Bcrypt Password---start-----

    const finduser = await UserData.findOneAndUpdate(
      {email:req.body.email},
      {password:hash_password}
      );
    
    // console.log("bjhbh:",finduser)
    if(finduser){
      // ---- send new password in email start ---------
      const userEmail = req.body.email;
      const title = "Reset password";
      const content = "Password reset successfully. Remember below OTP is your password. Kindly change password after login"
      // const mailBody =  `<p>Your QRCODE Generator id's new password is</p>
      // <h1>${randomCode}</h1>` ;

      console.log("mailsent start")
      const mailSent = await mailSender(userEmail, title, mailBody(content,randomCode), randomCode);
      // console.log("mail response ::::", mailSent)
// ----------send new password email end ---------------------------
        if(mailSent.status){
          return res.json({
            status:true,
            message:"Password reset successfully, check mail for new password",
            data:mailSent.info
          })
        }else{
          return res.json({
            status:false,
            message: mailSent.error
          })
        }
    }else{
      return res.json({
        status:false,
        message:"Reset password failed",
      })
    }
     
  }catch(error){
    return res.json({
      status:false,
      message: error
    })
  }

}

// -----Signup generate otp -----------

module.exports.generateOTP= async (req, res) => {
  console.log("generate otp")
  try{
    const findUser = await UserData.findOne({email:req.body.email});
    if(findUser){
      return res.json({
        status: false,
        message: "User already Exists"
      })
    }

    //------------- generate random number start-----------
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    //------------- generate random number end-----------
    const matchInPreviousOtpGenerated = await OTP.findOneAndUpdate(
      {email:req.body.email},
      {$set:{otp: randomCode}},
      { new: true } // To return the updated document
    );
      // console.log("matchInPreviousOtpGenerated:::", matchInPreviousOtpGenerated)
    if(!matchInPreviousOtpGenerated){
      const OtpStore = await OTP.create({email: req.body.email, otp: randomCode });
          if(!OtpStore){
          return res.status(200).json({
            status:false,
            message:"Error in generating OTP",
          })
    }
    }

    // ----------create OTP and save it to database for 10 minutes start ------

    const title = "Generate OTP";
      const content = "Thank you for subscribing to our QRCODE generator. We're excited to have you on board!"
      // const mailBody =  `<p>Your QRCODE Generator id's new password is</p>
      // <h1>${randomCode}</h1>` ;

      console.log("mailsent start")
      const mailSent = await mailSender(req.body.email, title, mailBody(content,randomCode), randomCode);
      if(mailSent.status){
        return res.json({
          status:true,
          message:"OTP sent to email id",
          data:mailSent.info
        })
      }else{
        return res.json({
          status:false,
          message: mailSent.error
        })
      }
    // ----------create OTP and save it to database for 10 minutes end ------

  }catch(error){
    return res.json({
      status: false,
      message:error
    })
  }
}