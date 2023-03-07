const User = require("../models/User.model")
const brcrypt = require("bcrypt")

// HANDLE LOGIN USER API
exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user){
            const err = new Error("Email Invalid - Please try again")
            err.statusCode = 400
            return next(err)
        }
        if(brcrypt.compareSync(req.body.password, user.password)){
            res.status(200).json(user)
        }else{
            const err = new Error("Password Invalid - Please try again")
            err.statusCode = 400
            return next(err)
        }
    }catch(err){
        res.json(err)
    }
}
// HANDLE REGISTER USER API
exports.register = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const err = new Error("Email already exist");
        err.statusCode = 400;
        return next(err);
      } else {
        const user = await User.create(req.body);
        res.status(200).json(user);
      }
    } catch (error) {
      res.json(error);
    }
};

// HANDLE UPDATE USER API
exports.updateUser  = async (req, res, next) => {
    try{
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, {...req.body})
        res.status(200).json(user)
    }catch(err){
        res.json(err)
    }
}

// HANDLE GET ONE USER API
exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
};