const UserModel = require('../Models/user');

exports.register = async (req, res) => {
    try{
      const {name,email, photoUrl} = req.body;
      const userExists = await UserModel.findOne({ email: email });
        if(!userExists){
           let newUser = new UserModel({name, email, photoUrl});
              await newUser.save();
             return   res.status(201).json({
                     message: "User registered successfully",
                      user: newUser
                     })

        }

        return  res.status(200).json({ message: "welcome back", user: userExists });


    }catch(err){
        console.log( err);
        res.status(500).json({ error: "Server Error",message: err.message  });
    }
}



// 2:36 min