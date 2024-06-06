const { User, Logs } = require('../models');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
async function handleAsync(fn, req, res, userId) {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.log(error);
    let message = `${req.name || ''} ${error} ${ getCurrentDate()}`;
    await Logs.create({ logs: message, userId });
    throw error;
  }
}

function getCurrentDate() {
  return new Date().toISOString();
}

class UserController {
  

  // Utility method to handle try-catch blocks with logging
  
  async loginUser(req, res) {
    let mobile = req.body.mobile.trim();
    const user = await User.findOne({ mobile: mobile });
    return  handleAsync(async () => {
      let mobile = req.body.mobile.trim();


    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log(req.body.otp)
    if (!user.isVerified) {
        if(req.body.otp===null || req.body.otp==="" ){
            return res.status(200).json({ code: 100, message: "First-time user, please verify OTP." });
        }
        else if (req.body.otp!==null && parseInt(req.body.otp) === user.otp) {
          user.isVerified = true;
       
          const updatedUser = await User.findOneAndUpdate(
            { mobile: mobile},
            { $set: {isVerified: true}},
            { new: true }
          );
        } else {
                return res.status(200).json({ code: 300, message: "Please enter the correct OTP." });
        }
      } 

    if (await bcrypt.compare(req.body.password, user.password)) {
      let { id, name, mobile, role, projectRoleObject } = user;
      let projectsOfUser=[]
      if(projectRoleObject !=null)
      { projectsOfUser = await Project.find(
        { id: { $in: projectRoleObject } }, // Match projects with the specific `id` values from projectRoleObject
        { name: true, id: true }
      );
    }
      console.log(user)
      const token = jwt.sign(
        {  id, name, mobile, role },
        process.env.JWT_AUTH_SECRET
      );
      let message = `User: ${name}, logged in successfully` + " "+  getCurrentDate();

      await Logs.create({
        logs: message,
        userId:req.body.mobile,
      });

      console.log(message);
      console.log(token);
      return res
        .status(200)
        .json({
          message: "User logged in successfully",
          token: token,

          data: { id, name, mobile, role, projectsOfUser },
        });
    } else {
      res.status(400).json({ message: "incorrect password" });
    }
    }, req, res, user?user._id:"No Id");
  }
  async showAllUsers(req, res) {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    return  handleAsync(async () => {
      const allUsersData = await User.find({}, { name: true, email: true, role: true, isVerified: true, id: true, projectsAssigned: true, mobile: true });

      return res.status(200).json({ code: 200, data: allUsersData})
    }, req, res, decode.id);
  }


  // Implement other controller methods similarly
}

module.exports = UserController;
