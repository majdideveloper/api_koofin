const router = require('express').Router();
const Farmer = require('../models/Farmer');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//Register

router.post('/register',async (req, res)=>{
    try{
        const { email, password } = req.body;

        const userExists = await Farmer.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newFarmer = new Farmer({
            email,
            password : hashPassword
        });

        const farmer = await newFarmer.save();
        res.status(200).json({ message: 'User registered successfully' });

    } catch(err) {
        res.status(500).json({ message: 'Error registering user' });
        console.log(err)
    }
}) ;


// Login 

router.post('/login', async (req, res)=>{
    try {
        const { email, password } = req.body;

        // check if the user exists
        const farmer = await Farmer.findOne({ email });
        if(!farmer) {
            return res.status(401).json( { message: 'Invalid email or password'} );
        }

        const isPassValid = await bcrypt.compare(password, farmer.password);
        if (!isPassValid) {
            return res.status(401).json({ message: 'Invalid email or password'});
        }
        const token = jwt.sign({farmer: farmer,farmerId: farmer._id }, secretKey);//farmerId: farmer._id
        console.log(farmer);
        res.status(200).json({ token });
    } catch(err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});





// udate info Farmer
// router.put("/farmer:id", async (req, res) => {
//     try {
//       const farmer = await Farmer.findById(req.params.id);
//       if (farmer.name === req.body.name) {
//         try {
//           const updatedFarmer = await Farmer.findByIdAndUpdate(
//             req.params.id,
//             {
//               $set: req.body,
//             },
//             { new: true }
//           );
//           res.status(200).json(updatedPost);
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(401).json("You can update only your Account");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });







module.exports = router