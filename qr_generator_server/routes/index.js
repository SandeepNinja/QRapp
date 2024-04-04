const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login_controller");
const dynamicQRCOntroller = require("../controllers/dynamicQRCOntroller")
const count_controller = require("../controllers/count_controller")

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "data sent successfully",
  });
});
// router.post("/signup", loginController);
router.post("/signup", loginController.signup);
router.post("/login", loginController.login);
router.post("/forget", loginController.forget);
router.post("/userData", loginController.userData);
router.post("/dynamicqr/:id/createnew",dynamicQRCOntroller.createNewDirectory)
router.post("/dynamicqr/:id/directory/:directoryId",dynamicQRCOntroller.addLink)
router.get("/dynamicqr/directoryDetails/:directoryId",dynamicQRCOntroller.directoryData)
router.get("/dynamicqr/linkdelete/:linkId",dynamicQRCOntroller.deleteLink)
router.get("/dynamicqr/directorydelete/:directoryId",dynamicQRCOntroller.deleteDirectory)
router.post("/dynamicqr/linkupdate/:linkId",dynamicQRCOntroller.linkUpdate)
router.post("/dynamicqr/directoryupdate/:directoryId",dynamicQRCOntroller.directoryUpdate)
router.post("/dynamicqr/updateprofile/:profileId",dynamicQRCOntroller.updateProfile)
router.post("/reset/:profileId",dynamicQRCOntroller.resetPassword)
// count gets to increament by 1
router.get("/pagecount",count_controller.pageOpenCount);
router.get("/staticdownloadcount",count_controller.staticDownloadCount);
router.post("/generateOTP",loginController.generateOTP);
// router.get("/", (req, res) => {
//   return res.end("!gotckhkha");
// });

module.exports = router;
