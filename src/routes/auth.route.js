const express = require("express");
const {registerController,loginController,profileController} = require("../controller/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get("/profile",authMiddleware,profileController);


module.exports = router;