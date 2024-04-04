const UserData = require("../models/userData");
const listOfDynamicQR = require("../models/listOfDynamicQR");
const LinkList = require("../models/listOfLink");
const bcrypt = require('bcryptjs');

module.exports.createNewDirectory = async(req,res) => {
    console.log("params id:: ",req.params.id,": body ::",req.body);

    try {
    const findUser = await UserData.findById(req.params.id);
    console.log("findUser::", findUser)
    if(!findUser){
        return res.status(500).json({
            message: "error in creating new Directory in server side",
            status: false,
            error: "User Not Found",
          });
    }
    console.log("createDirectory::",req.body)
    const body = {};
    body.name = req.body.name;
    if(req.body.logo){
      body.logo = req.body.logo;
    }
    
    console.log("createDirectory if::",body)
    
    const createDirectory = await listOfDynamicQR.create(body);

    console.log("user created succeffuly :: ", createDirectory._id);

    const updatedUserDirectory = await  UserData.updateOne(
        {_id: req.params.id},
        {$push: {listOfDynamicQRs: createDirectory._id}}
    )
    console.log("updatteUserDirectory : ",updatedUserDirectory)

    return res.status(200).json({
      message: "successfully created new Directory",
      status: true,
      data: createDirectory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error in creating new Directory in server side",
      status: false,
      error: error,
    });
  }
}

//  add new link in directory
module.exports.addLink= async(req, res) => {
  try{
  console.log("params id: ",req.params.id,"; directory id : ",req.params.directoryId);
    console.log("stemp1")
    const findDirectory = await listOfDynamicQR.findById(req.params.directoryId);
    console.log("stemp2")
    if(!findDirectory){
      return res.status(500).json({
        message: "error in creating new link in server side",
        status: false,
        error: "Directory not found Not Found",
      });
    }
    console.log("stemp3",req.body)
    // console.log("findDirectory:",findDirectory)
    const body = {name:req.body.name,link:req.body.link};
    
    if(req.body.linkLogo){
      body.linkLogo = req.body.linkLogo;
    }   
    console.log("req.body::",req.body)
    const createLink = await LinkList.create(body);
    console.log("createLink:: ",createLink)
    console.log("stemp4")
    
    const updatedDirectoryList = await listOfDynamicQR.updateOne(
      {_id: req.params.directoryId},
      {$push: {listOfLinks: createLink._id}}
      )
      console.log("stemp5")
console.log("updatedDirectoryList : ",updatedDirectoryList)

return res.status(200).json({
  message: "successfully added list in directory",
  status: true,
  data: updatedDirectoryList,
});

  }catch(error){
    return res.status(500).json({
      message: "error in adding link in Directory in server side",
      status: false,
      error: error,
    });
  }
}

module.exports.directoryData= async(req,res) =>{
  try{
    const findDirectory = await listOfDynamicQR.findById(req.params.directoryId).populate("listOfLinks");
    if(!findDirectory){
      return res.status(500).json({
        message: "error directory not awailable",
        status: false,
        error: "Directory not found",
      });
    }
    console.log("findDirectory:",findDirectory)
    return res.status(200).json({
        message: "successfully find the directory",
        status: true,
        data: findDirectory,
    })
  }catch(error){
    return res.status(500).json({
      message: "error in finding directory",
      status: false,
      error,
    });
  }
  
}

module.exports.deleteLink = async(req,res) => {
  try {
    console.log("id:", req.params.linkId)
    const link = await listOfDynamicQR.findOneAndUpdate(
      { listOfLinks: req.params.linkId },
      { $pull: { listOfLinks: req.params.linkId } }
    );
      console.log("link:",link);
      const deleted=  await LinkList.findByIdAndDelete(req.params.linkId);
      console.log("deleted:",deleted);

    return res.status(200).json({
      message: "Link successfully deleted",
      status: true,
      data: deleted,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error in deleting Link",
      status: false,
    });
  }
} 

module.exports.deleteDirectory = async(req, res) => {
  try {
    if (!req.params.directoryId) {
      console.log("params not found:",req.params.directoryId)
      return res.status(404).json({
        message: "Error Params not found",
        status: false,
      });
    }

    
    // find question in database
    const findDirectory = await listOfDynamicQR.findById({ _id: req.params.directoryId });
    console.log("findDirectory: ",findDirectory)
    if (!findDirectory) {
      return res.status(404).json({
        message: "Error in deleting directory because directory not found",
        status: false,
      });
    }
    const userDataUpdate = await UserData.findOneAndUpdate(
      {listOfDynamicQRs: req.params.directoryId},
      {$pull: {listOfDynamicQRs: req.params.directoryId} }
    )
    console.log("userDataUpdate: ",userDataUpdate)
    // delete options of that question from database
    findDirectory.listOfLinks.forEach(async (optID) => {
      await LinkList.findByIdAndDelete(optID);
    });
    console.log("link deleted from the directory")
    // delete question from database
    const deletedDirectory = await listOfDynamicQR.findByIdAndDelete(req.params.directoryId);
    console.log("deletedDirectory:",deletedDirectory)
    // send success report
    return res.status(200).json({
      message: "Directory successfully deleted",
      status: true,
      data: deletedDirectory,
    });
  } catch (error) {
    // send failure report
    return res.status(404).json({
      message: "Error in deleting Directory",
      status: false,
      error: error,
    });
  }
}

module.exports.linkUpdate = async(req, res) => {
  // console.log("linkupdate:: ",req.params.linkId,req.body)
  try{
    const findLink = await LinkList.findByIdAndUpdate(
      {_id:req.params.linkId},
      {$set:req.body}
    );
    console.log("findLink:",findLink);
    return res.status(200).json({
      message: "link updated successfully",
      status: true,
      data:findLink,
    });


  }catch(error){
    return res.status(400).json({
      message:"error in updating link",
      status:false,
      error:error,
    })
  }
 
}

module.exports.directoryUpdate= async(req, res) => {
  try{
    const findDirectory = await listOfDynamicQR.findByIdAndUpdate(
      {_id:req.params.directoryId},
      {$set:req.body}
    )
    if(!findDirectory){
      return res.status(400).json({
        message:"error in updating directory",
        status:false,
      })
    }
    return res.status(200).json({
      message:"succefully updated the directory",
      status: true,
    })
  }catch(error){
    return res.status(400).json({
      message:"error in updating directory",
      status:false,
      error: error,
    })
  }
}

module.exports.updateProfile= async (req,res) =>{
  // return res.status(200).json({
  //   message:"profile updated successfully",
  //   status:true,
  //   data:req.body,
  //   params:req.params.profileId,
  // })
  try{
    const findDirectory = await UserData.findByIdAndUpdate(
      {_id:req.params.profileId},
      {$set:req.body}
    )
    if(!findDirectory){
      return res.status(400).json({
        message:"error in updating profile",
        status:false,
      })
    }
    return res.status(200).json({
      message:"profile updated successfully",
      status: true,
    })
  }catch(error){
    return res.status(400).json({
      message:"error in updating profile",
      status:false,
      error: error,
    })
  }
}

module.exports.resetPassword= async(req,res) => {
  try{
    const findUser = await UserData.findById(req.params.profileId);
    if(!findUser){
      return res.status(500).json({
        message: "error in finding user",
        status: false,
        error: "User Not Found",
      });
    }
    // console.log("Reset Password of user", findUser)
    const match = bcrypt.compareSync(req.body.oldPassword, findUser.password);
    console.log("hash password match::",match)
    if(!match){
      console.log("password match",findUser.password," = ",req.body.oldPassword)
    
      return res.status(500).json({
        message: "Password Incorrect",
        status: false,
        error: "Password Incorrect",
      });
    }
    // -----------Bcrypt Password---start-----
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.newPassword, saltRound);
       
// ------------Bcrypt Password--- END ----
        const newPasswordSetted = await UserData.findByIdAndUpdate(
          {_id:req.params.profileId},
          {password:hash_password}
        )
        return res.status(200).json({
          message: "Password Changed",
          status: true,
          data: newPasswordSetted,
        })
  }catch(error){
    return res.status(500).json({
      message: "error",
      status: false,
      error: "Password Incorrect",
    }); 
  }
}