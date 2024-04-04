const homePageCount = require("../models/homePageCount");

module.exports.pageOpenCount = async(req, res) =>{
    try{
        const findCount = await homePageCount.findById("65fa5c0b59452e3994cde333");
        const updateCount = await homePageCount.findByIdAndUpdate(
            {_id:"65fa5c0b59452e3994cde333"},
            {$set:{"homePageOpenCount":findCount.homePageOpenCount+1}}
          );
        console.log("count:",findCount)
        
    }catch(error){
        console.log("count:",error)

    }
    console.log("pagecount of page::");
    return res.json({
        pagecount : "1",
    })
} 
module.exports.staticDownloadCount = async(req, res) =>{
    console.log("satic doownload count of page::");
    try{
        const findCount = await homePageCount.findById("65fa5c0b59452e3994cde333");
        const updateCount = await homePageCount.findByIdAndUpdate(
            {_id:"65fa5c0b59452e3994cde333"},
            {$set:{"StaticQrDownloadCount":findCount.StaticQrDownloadCount+1}}
          );
        console.log("count:",findCount)
        
    }catch(error){
        console.log("count:",error)

    }
    return res.json({
        staticcount : "1",
    })
} 